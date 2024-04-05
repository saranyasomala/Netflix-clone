import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8kwtYuopP-UVEkW5CemaoKq-MOfiQ-aw",
  authDomain: "netflix-clone-a19b3.firebaseapp.com",
  databaseURL: "https://netflix-clone-a19b3-default-rtdb.firebaseio.com",
  projectId: "netflix-clone-a19b3",
  storageBucket: "netflix-clone-a19b3.appspot.com",
  messagingSenderId: "800502313029",
  appId: "1:800502313029:web:9cbce2298241e85162b32c",
  measurementId: "G-4TVQ4QP642"
  
 };

 const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;


