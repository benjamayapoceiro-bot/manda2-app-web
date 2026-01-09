import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, auth, shouldUseFirebase } from '../firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp,
  Timestamp,
  where
} from 'firebase/firestore';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  User
} from 'firebase/auth';

// --- TIPOS DE DATOS ---
export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'on_way' | 'delivered';
export type VehicleType = 'bici' | 'moto' | 'auto';

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

interface AppContextType {
  user: User | null;
  loadingAuth: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  
  products: Product[];
  orders: Order[];
  activeOrder: Order | null;
  riderVehicle: VehicleType;
  chats: Chat[];
  transactions: Transaction[];
  
  addProduct: (product: Omit<Product, 'id'>) => void;
  deleteProduct: (id: string) => void;
  toggleProductStatus: (id: string) => void;
  placeOrder: (cartItems: Product[], paymentMethod: 'mercadopago' | 'cash') => Promise<void>;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  setRiderVehicle: (vehicle: VehicleType) => void;
  sendMessage: (chatId: string, text: string, sender: ChatMessage['sender']) => void;
  getChat: (chatId: string) => Chat | undefined;
  formatPrice: (amount: number) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// --- MOCK DATA FOR DEMO MODE ---
const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Hamburguesa Doble', price: 4500, description: 'Doble carne, cheddar, bacon y salsa especial.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60', category: 'Comida', active: true },
  { id: 'p2', name: 'Pizza Pepperoni', price: 5200, description: 'Muzzarella abundante y pepperoni de primera.', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=60', category: 'Comida', active: true },
  { id: 'p3', name: 'Papas Fritas', price: 2000, description: 'Porción grande crocante.', image: 'https://images.unsplash.com/photo-1630384060421-a431e4cad29e?auto=format&fit=crop&w=500&q=60', category: 'Comida', active: true },
  { id: 'p4', name: 'Coca Cola 1.5L', price: 1800, description: 'Refrescante.', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=60', category: 'Bebidas', active: true },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [riderVehicle, setRiderVehicle] = useState<VehicleType>('moto');

  // --- AUTHENTICATION ---
  useEffect(() => {
    if (!shouldUseFirebase) {
      setLoadingAuth(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    if (!shouldUseFirebase) {
       console.log("Mock Login Success");
       setUser({ email, uid: 'mock-user-id' } as User);
       return;
    }
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const register = async (email: string, pass: string) => {
    if (!shouldUseFirebase) {
       console.log("Mock Register Success");
       setUser({ email, uid: 'mock-user-id' } as User);
       return;
    }
    await createUserWithEmailAndPassword(auth, email, pass);
  };

  const logout = async () => {
    if (!shouldUseFirebase) {
      setUser(null);
      return;
    }
    await signOut(auth);
  };

  // --- INITIALIZATION ---
  useEffect(() => {
    if (!shouldUseFirebase) {
      setProducts(MOCK_PRODUCTS);
      return;
    }

    try {
      const q = query(collection(db, 'products'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setProducts(productsData);
      }, (err) => console.error("Firestore Products Error:", err));
      return () => unsubscribe();
    } catch (e) { console.error("Firebase init error", e); }
  }, []);

  useEffect(() => {
    if (!shouldUseFirebase) return;
    try {
      const q = query(collection(db, 'orders'), orderBy('timestamp', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const ordersData = snapshot.docs.map(doc => {
          const data = doc.data();
          return { 
            ...data, 
            id: doc.id,
            timestamp: data.timestamp ? (data.timestamp as Timestamp).toDate() : new Date()
          } as Order;
        });
        setOrders(ordersData);
        const myOrder = ordersData.find(o => o.status !== 'delivered');
        setActiveOrder(myOrder || null);
      });
      return () => unsubscribe();
    } catch (e) { console.error("Firebase init error", e); }
  }, [user]);

  useEffect(() => {
    if (!shouldUseFirebase) return;
    try {
      const q = query(collection(db, 'chats'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const chatsData = snapshot.docs.map(doc => {
           const data = doc.data();
           const messages = (data.messages || []).map((m: any) => ({
               ...m,
               timestamp: m.timestamp ? (m.timestamp as Timestamp).toDate() : new Date()
           }));
           return { ...data, id: doc.id, messages } as Chat;
        });
        setChats(chatsData);
      });
      return () => unsubscribe();
    } catch (e) { console.error("Firebase init error", e); }
  }, []);

  useEffect(() => {
    if (!shouldUseFirebase) return;
    try {
        const q = query(collection(db, 'transactions'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const transData = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
                timestamp: doc.data().timestamp ? (doc.data().timestamp as Timestamp).toDate() : new Date()
            } as Transaction));
            setTransactions(transData);
        });
        return () => unsubscribe();
    } catch(e) { console.error("Firebase init error", e); }
  }, []);

  // --- ACTIONS (With Mock Fallbacks) ---

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(amount);
  };

  const addProduct = async (product: Omit<Product, 'id'>) => {
    if (shouldUseFirebase) {
      await addDoc(collection(db, 'products'), product);
    } else {
      const newProduct = { ...product, id: `mock-p-${Date.now()}` };
      setProducts(prev => [...prev, newProduct]);
    }
  };

  const deleteProduct = async (id: string) => {
    if (shouldUseFirebase) {
      const productRef = doc(db, 'products', id);
      await updateDoc(productRef, { active: false });
    } else {
      setProducts(prev => prev.map(p => p.id === id ? { ...p, active: false } : p));
    }
  };

  const toggleProductStatus = async (id: string) => {
    if (shouldUseFirebase) {
      const product = products.find(p => p.id === id);
      if (product) {
        const productRef = doc(db, 'products', id);
        await updateDoc(productRef, { active: !product.active });
      }
    } else {
      setProducts(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
    }
  };

  const placeOrder = async (cartItems: Product[], paymentMethod: 'mercadopago' | 'cash') => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    const deliveryFee = 3500; 
    const total = subtotal + deliveryFee;

    // --- LÓGICA DE SPLIT DE PAGOS ---
    // Aquí definimos cuánto gana cada parte. 
    // En una integración real de MP Marketplace, esto se configura en el 'backend' al crear la preferencia.
    const riderShare = 2000; // Tarifa fija o variable para el rider
    const platformShare = 1500; // Tarifa de servicio Manda2
    const merchantShare = subtotal; // El comercio recibe el valor de los productos

    const timestamp = shouldUseFirebase ? serverTimestamp() : new Date();
    const mockChatId = `chat-${Date.now()}`;
    const mockOrderId = `order-${Date.now()}`;
    const customerName = user?.email?.split('@')[0] || 'Usuario Demo';

    if (shouldUseFirebase) {
      // 1. Crear Chat
      const chatRef = await addDoc(collection(db, 'chats'), {
          orderId: 'Procesando...', 
          type: 'rider_client',
          messages: [{
              id: 'system_init',
              sender: 'system',
              text: 'Chat iniciado.',
              timestamp: serverTimestamp()
          }]
      });

      // 2. Crear Orden con los datos del Split calculados
      const newOrderPayload = {
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
        timestamp: serverTimestamp(),
        chatIdRider: chatRef.id
      };

      const orderRef = await addDoc(collection(db, 'orders'), newOrderPayload);
      await updateDoc(chatRef, { orderId: orderRef.id });
    } else {
      // LOCAL MOCK
      const newChat: Chat = {
        id: mockChatId,
        orderId: mockOrderId,
        type: 'rider_client',
        messages: [{ id: 'sys', sender: 'system', text: 'Chat Demo', timestamp: new Date() }]
      };
      setChats(prev => [...prev, newChat]);

      const newOrder: Order = {
        id: mockOrderId,
        customer: customerName,
        merchant: 'Mi Negocio Online',
        items: cartItems,
        total: total,
        status: 'pending',
        vehicleType: 'moto',
        riderFee: riderShare,
        platformFee: platformShare,
        merchantEarnings: merchantShare,
        paymentMethod: paymentMethod,
        timestamp: new Date(),
        chatIdRider: mockChatId
      };
      setOrders(prev => [newOrder, ...prev]);
      setActiveOrder(newOrder);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    if (shouldUseFirebase) {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status: newStatus });
    } else {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      setActiveOrder(prev => prev && prev.id === orderId ? { ...prev, status: newStatus } : prev);
    }

    const order = orders.find(o => o.id === orderId);

    // Mensaje automático
    if (newStatus === 'on_way' && order?.chatIdRider) {
       sendMessage(order.chatIdRider, '¡Voy en camino con tu pedido!', 'rider');
    }

    // --- LIBERACIÓN DE FONDOS (SPLIT PAYMENT EJECUTADO) ---
    // Cuando el pedido se entrega, el dinero pasa a estar "disponible" en las billeteras.
    if (newStatus === 'delivered' && order) {
        const ts = shouldUseFirebase ? serverTimestamp() : new Date();
        const txs: any[] = [
            {
                orderId: order.id,
                type: 'credit',
                amount: order.riderFee,
                description: `Comisión entrega #${order.id.slice(-6)}`,
                userRole: 'rider',
                timestamp: ts
            },
            {
                orderId: order.id,
                type: 'credit',
                amount: order.merchantEarnings,
                description: `Venta orden #${order.id.slice(-6)}`,
                userRole: 'merchant',
                timestamp: ts
            },
            {
                orderId: order.id,
                type: 'credit',
                amount: order.platformFee,
                description: `Fee servicio #${order.id.slice(-6)}`,
                userRole: 'platform',
                timestamp: ts
            }
        ];

        if (shouldUseFirebase) {
            await Promise.all(txs.map(t => addDoc(collection(db, 'transactions'), t)));
        } else {
            const localTxs = txs.map((t, i) => ({ ...t, id: `tx-${Date.now()}-${i}`, timestamp: new Date() } as Transaction));
            setTransactions(prev => [...localTxs, ...prev]);
        }
    }
  };

  const sendMessage = async (chatId: string, text: string, sender: ChatMessage['sender']) => {
    const newMessage = {
        id: `msg-${Date.now()}`,
        sender,
        text,
        timestamp: shouldUseFirebase ? Timestamp.now() : new Date()
    };

    if (shouldUseFirebase) {
        const chatRef = doc(db, 'chats', chatId);
        const chat = chats.find(c => c.id === chatId);
        if (chat) {
             const oldMessages = chat.messages.map(m => ({
                 ...m, 
                 timestamp: Timestamp.fromDate(m.timestamp) 
             }));
             await updateDoc(chatRef, {
                messages: [...oldMessages, newMessage]
             });
        }
    } else {
        const localMsg = { ...newMessage, timestamp: new Date() };
        setChats(prev => prev.map(c => c.id === chatId ? { ...c, messages: [...c.messages, localMsg as ChatMessage] } : c));
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
      register,
      logout,
      products,
      orders, 
      activeOrder,
      riderVehicle,
      chats,
      transactions,
      addProduct,
      deleteProduct,
      toggleProductStatus,
      placeOrder, 
      updateOrderStatus, 
      setRiderVehicle,
      sendMessage,
      getChat,
      formatPrice
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