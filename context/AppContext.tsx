import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  setDoc,
  Timestamp,
  where,
  QuerySnapshot,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore';

// --- TIPOS DE DATOS ---
export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'on_way' | 'delivered';
export type VehicleType = 'bici' | 'moto' | 'auto';

// Local definition of User to replace firebase/auth User
export interface User {
  uid: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  active: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'rider' | 'merchant' | 'system';
  text: string;
  timestamp: Date;
}

export interface Chat {
  id: string;
  orderId: string;
  type: 'rider_client' | 'merchant_client';
  messages: ChatMessage[];
}

export interface Transaction {
  id: string;
  orderId: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  userRole: 'rider' | 'merchant' | 'platform';
  targetAlias?: string;
  timestamp: Date;
}

export interface Order {
  id: string;
  customer: string;
  merchant: string;
  items: Product[];
  total: number;
  status: OrderStatus;
  vehicleType: VehicleType;
  riderFee: number;
  platformFee: number;
  merchantEarnings: number;
  timestamp: Date;
  chatIdRider?: string;
  paymentMethod?: 'mercadopago' | 'cash';
}

export interface Merchant {
  id: string;
  name: string;
  description: string;
  image: string;
  rating?: number;
  deliveryTime?: string;
  deliveryFee?: number;
  category: string;
  address?: string;
}

export interface PaymentAliases {
  platform: string;
  rider: string;
  merchant: string;
}

interface AppContextType {
  user: User | null;
  loadingAuth: boolean;
  login: (email: string, pass: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;

  merchants: Merchant[];
  products: Product[];
  orders: Order[];
  activeOrder: Order | null;
  riderVehicle: VehicleType;
  chats: Chat[];
  transactions: Transaction[];
  paymentAliases: PaymentAliases;

  addProduct: (product: Omit<Product, 'id'>) => void;
  deleteProduct: (id: string) => void;
  toggleProductStatus: (id: string) => void;
  placeOrder: (cartItems: Product[], paymentMethod: 'mercadopago' | 'cash') => Promise<void>;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  setRiderVehicle: (vehicle: VehicleType) => void;
  sendMessage: (chatId: string, text: string, sender: ChatMessage['sender']) => void;
  getChat: (chatId: string) => Chat | undefined;
  formatPrice: (amount: number) => string;
  updatePaymentAlias: (role: keyof PaymentAliases, alias: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [riderVehicle, setRiderVehicle] = useState<VehicleType>('moto');

  const [paymentAliases, setPaymentAliases] = useState<PaymentAliases>({
    platform: 'manda2.admin.mp',
    rider: '',
    merchant: ''
  });

  // --- AUTHENTICATION ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL
        });
      } else {
        setUser(null);
      }
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const register = async (email: string, pass: string) => {
    await createUserWithEmailAndPassword(auth, email, pass);
  };

  const logout = async () => {
    await signOut(auth);
  };

  // --- DATA SYNC (FIRESTORE) ---

  // 1. Products
  useEffect(() => {
    const q = query(collection(db, 'products'));
    const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const productsData = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(productsData);
    });
    return () => unsubscribe();
  }, []);

  // 2. Orders
  useEffect(() => {
    // In a real app, filter by user role/id. For this demo, we sync all orders.
    const q = query(collection(db, 'orders'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const ordersData = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          timestamp: data.timestamp instanceof Timestamp ? data.timestamp.toDate() : new Date(data.timestamp)
        } as Order;
      });
      setOrders(ordersData);

      // Update active order if it exists
      if (activeOrder) {
        const updatedActive = ordersData.find((o: Order) => o.id === activeOrder.id);
        if (updatedActive) setActiveOrder(updatedActive);
      }
    });
    return () => unsubscribe();
  }, [activeOrder?.id]); // Re-run if activeOrder changes to keep it in sync? No, the snapshot handles updates. Dependency array empty or minimal.

  // 3. Chats
  useEffect(() => {
    const q = query(collection(db, 'chats'));
    const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const chatsData = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          messages: (data.messages || []).map((m: any) => ({
            ...m,
            timestamp: m.timestamp instanceof Timestamp ? m.timestamp.toDate() : new Date(m.timestamp)
          }))
        } as Chat;
      });
      setChats(chatsData);
    });
    return () => unsubscribe();
  }, []);

  // 4. Transactions
  useEffect(() => {
    const q = query(collection(db, 'transactions'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const txData = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          timestamp: data.timestamp instanceof Timestamp ? data.timestamp.toDate() : new Date(data.timestamp)
        } as Transaction;
      });
      setTransactions(txData);
    });
    return () => unsubscribe();
  }, []);

  // 5. Merchants
  useEffect(() => {
    const q = query(collection(db, 'merchants')); // Make sure 'merchants' exists in Firestore rules!
    const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const merchantsData = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({ id: doc.id, ...doc.data() } as Merchant));
      setMerchants(merchantsData);
    });
    return () => unsubscribe();
  }, []);


  // --- ACTIONS ---

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(amount);
  };

  const updatePaymentAlias = (role: keyof PaymentAliases, alias: string) => {
    setPaymentAliases(prev => ({ ...prev, [role]: alias }));
    // In a real app, save this to User profile in DB
  };

  const addProduct = async (product: Omit<Product, 'id'>) => {
    await addDoc(collection(db, 'products'), product);
  };

  const deleteProduct = async (id: string) => {
    // Soft delete
    await updateDoc(doc(db, 'products', id), { active: false });
  };

  const toggleProductStatus = async (id: string) => {
    const product = products.find(p => p.id === id);
    if (product) {
      await updateDoc(doc(db, 'products', id), { active: !product.active });
    }
  };

  const placeOrder = async (cartItems: Product[], paymentMethod: 'mercadopago' | 'cash') => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    const deliveryFee = 3500;
    const total = subtotal + deliveryFee;

    const riderShare = 2000;
    const platformShare = 1500;
    const merchantShare = subtotal;

    const customerName = user?.email?.split('@')[0] || 'Usuario';

    // 1. Create Chat first
    const chatRef = doc(collection(db, 'chats'));
    const newChatData = {
      orderId: 'temp-id', // Will update later
      type: 'rider_client',
      messages: [{ id: 'sys', sender: 'system', text: 'Chat iniciado', timestamp: new Date() }]
    };
    await setDoc(chatRef, newChatData);

    // 2. Create Order
    const orderData = {
      customer: customerName,
      merchant: 'Mi Negocio Online',
      items: cartItems,
      total: total,
      status: 'pending' as OrderStatus,
      vehicleType: 'moto' as VehicleType,
      riderFee: riderShare,
      platformFee: platformShare,
      merchantEarnings: merchantShare,
      paymentMethod: paymentMethod,
      timestamp: new Date(),
      chatIdRider: chatRef.id
    };
    const orderRef = await addDoc(collection(db, 'orders'), orderData);

    // Update chat with real orderId
    await updateDoc(chatRef, { orderId: orderRef.id });

    // Set active locally (optional, as snapshot will catch it)
    setActiveOrder({ ...orderData, id: orderRef.id } as Order);

    // --- MERCADO PAGO INTEGRATION ---
    if (paymentMethod === 'mercadopago') {
      try {
        const backendUrl = "https://node-backend--benjamayapoceir.replit.app";
        const comercioId = "default-merchant-id"; // Debe coincidir con el usado en vinculación

        const response = await fetch(`${backendUrl}/api/mp/create-preference`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            comercioId,
            items: cartItems.map(item => ({
              id: item.id,
              title: item.name,
              unit_price: item.price,
              quantity: 1, // Asumiendo cantidad 1 por ahora
              currency_id: "ARS"
            })),
            envio: deliveryFee
          })
        });

        if (!response.ok) throw new Error('Error creando preferencia MP');

        const data = await response.json();
        if (data.init_point) {
          window.location.href = data.init_point;
        }
      } catch (error) {
        console.error("Pago Error:", error);
        alert("Error al iniciar pago. Intenta efectivo.");
      }
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, { status: newStatus });

    const order = orders.find(o => o.id === orderId);

    if (newStatus === 'on_way' && order?.chatIdRider) {
      sendMessage(order.chatIdRider, '¡Voy en camino con tu pedido!', 'rider');
    }

    // --- GENERATE TRANSACTIONS ON DELIVERY ---
    if (newStatus === 'delivered' && order) {
      const ts = new Date();
      const riderTarget = paymentAliases.rider || 'cuenta.rider.mp';
      const merchantTarget = paymentAliases.merchant || 'cuenta.comercio.mp';
      const platformTarget = paymentAliases.platform;

      const txs = [
        {
          orderId: order.id,
          type: 'credit',
          amount: order.riderFee,
          description: `Split MP: Envío a ${riderTarget}`,
          userRole: 'rider',
          targetAlias: riderTarget,
          timestamp: ts
        },
        {
          orderId: order.id,
          type: 'credit',
          amount: order.merchantEarnings,
          description: `Split MP: Venta a ${merchantTarget}`,
          userRole: 'merchant',
          targetAlias: merchantTarget,
          timestamp: ts
        },
        {
          orderId: order.id,
          type: 'credit',
          amount: order.platformFee,
          description: `Split MP: Comisión a ${platformTarget}`,
          userRole: 'platform',
          targetAlias: platformTarget,
          timestamp: ts
        }
      ];

      // Batch write or individual adds
      txs.forEach(async (tx) => {
        await addDoc(collection(db, 'transactions'), tx);
      });
    }
  };

  const sendMessage = async (chatId: string, text: string, sender: ChatMessage['sender']) => {
    const chatRef = doc(db, 'chats', chatId);
    const chat = chats.find(c => c.id === chatId);

    if (chat) {
      const newMessage = {
        id: `msg-${Date.now()}`,
        sender,
        text,
        timestamp: new Date()
      };
      const updatedMessages = [...chat.messages, newMessage];
      await updateDoc(chatRef, { messages: updatedMessages });
    }
  };

  const getChat = (chatId: string) => {
    return chats.find(c => c.id === chatId);
  };

  return (
    <AppContext.Provider value={{
      user,
      loadingAuth,
      login,
      loginWithGoogle,
      register,
      logout,
      merchants,
      products,
      orders,
      activeOrder,
      riderVehicle,
      chats,
      transactions,
      paymentAliases,
      addProduct,
      deleteProduct,
      toggleProductStatus,
      placeOrder,
      updateOrderStatus,
      setRiderVehicle,
      sendMessage,
      getChat,
      formatPrice,
      updatePaymentAlias
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
