import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const env = import.meta.env;

export const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || env.VITE_apiKey,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || env.VITE_authDomain,
  projectId: env.VITE_FIREBASE_PROJECT_ID || env.VITE_projectId,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || env.VITE_storageBucket,
  messagingSenderId:
    env.VITE_FIREBASE_MESSAGING_SENDER_ID || env.VITE_messagingSenderId,
  appId: env.VITE_FIREBASE_APP_ID || env.VITE_appId,
};

const missingFirebaseConfig = Object.entries(firebaseConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key);

export const isFirebaseConfigured = missingFirebaseConfig.length === 0;

if (missingFirebaseConfig.length) {
  console.warn(
    `Missing Firebase environment variables for: ${missingFirebaseConfig.join(
      ", "
    )}. Add them in Vercel Project Settings > Environment Variables and redeploy.`
  );
}

const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;
export const auth = app ? getAuth(app) : null;
