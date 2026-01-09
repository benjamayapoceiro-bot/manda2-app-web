import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// --- IMPORTANTE: CONFIGURACIÓN DE SEGURIDAD ---
// 1. Ve a console.firebase.google.com
// 2. Entra a tu proyecto -> Configuración del proyecto.
// 3. Baja hasta "Tus apps" -> SDK setup y configuración -> Configuración (npm).
// 4. Copia los valores y reemplázalos abajo (borra las comillas de ejemplo si es necesario).

const firebaseConfig = {
  // Ejemplo: apiKey: "AIzaSyD...",
  apiKey: "PEGA_TU_API_KEY_AQUI",
  authDomain: "PEGA_TU_AUTH_DOMAIN_AQUI",
  projectId: "PEGA_TU_PROJECT_ID_AQUI",
  storageBucket: "PEGA_TU_STORAGE_BUCKET_AQUI",
  messagingSenderId: "PEGA_TU_SENDER_ID_AQUI",
  appId: "PEGA_TU_APP_ID_AQUI"
};

// Esta lógica permite que la app funcione en "Modo Demo" si no has puesto las claves aún.
// Cuando pongas las claves reales, se conectará automáticamente a tu base de datos.
export const shouldUseFirebase = firebaseConfig.apiKey !== "PEGA_TU_API_KEY_AQUI" && !firebaseConfig.apiKey.includes("TU_API_KEY");

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);