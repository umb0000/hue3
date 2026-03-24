import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Firebase 콘솔에서 프로젝트 생성 후 여기에 설정값 입력
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "hue3.firebaseapp.com",
  projectId: "hue3",
  storageBucket: "hue3.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
