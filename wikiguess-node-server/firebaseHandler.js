const { apiKey, appId } = require('./protectedData');
// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, onValue } = require('firebase/database');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Wikiguess's Firebase configuration
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
const gameObjectsRef = ref(db, '/gameObjects');

const getAllGameObjects = () => {
    return new Promise((resolve, reject) => {
        onValue(gameObjectsRef, (snapshot) => {
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
};

module.exports = {
    getAllGameObjects,
};
