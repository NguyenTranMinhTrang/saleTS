import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: 'AIzaSyDAXOtxqLxb9NG3szAYgtwOVeBeHtjQybE',
    authDomain: 'sale-98a51.firebaseapp.com',
    projectId: 'sale-98a51',
    storageBucket: 'sale-98a51.appspot.com',
    messagingSenderId: '821514409034',
    appId: '1:821514409034:web:447ac5271f6d25747ac2b3',
    measurementId: 'G-MD73VZ7XHZ',
};


const app = initializeApp(firebaseConfig);
initializeFirestore(app, {
    experimentalForceLongPolling: true,
});
const db = getFirestore(app);

export default db;

