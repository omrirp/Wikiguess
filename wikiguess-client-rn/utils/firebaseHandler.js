import { apiKey, appId } from './protectedData';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
//const { initializeApp } = require('firebase/app');
import { getDatabase, ref, onValue } from 'firebase/database';
//const { getDatabase, ref, onValue } = require('firebase/database');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: apiKey,
    authDomain: 'wikiguess-ee6be.firebaseapp.com',
    databaseURL: 'https://wikiguess-ee6be-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'wikiguess-ee6be',
    storageBucket: 'wikiguess-ee6be.appspot.com',
    messagingSenderId: '320670736438',
    appId: appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const charactersRef = ref(db, '/characters');

export default function getAllCharacters() {
    return new Promise((resolve, reject) => {
        onValue(charactersRef, (snapshot) => {
            const data = snapshot.val();
            if (data && typeof data === 'object') {
                const dataArray = Object.values(data).filter((item) => item !== null && typeof item === 'object');
                //console.log('in FB Handler: ', dataArray);
                resolve(dataArray);
            } else {
                reject(new Error('No data available'));
            }
        });
    });
}
