import { apiKey, appId } from './protectedData';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, push } from 'firebase/database';
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
const charactersRef = ref(db, '/characters');
const gameObjectsRef = ref(db, '/gameObjects');

export function getAllCharacters() {
    return new Promise((resolve, reject) => {
        onValue(charactersRef, (snapshot) => {
            const data = snapshot.val();
            if (data && typeof data === 'object') {
                const dataArray = Object.values(data).filter((item) => item !== null && typeof item === 'object');
                //console.log('in FB Handler: ', dataArray);
                // Randomly select 600 characters while maintaining order
                const randomCharacters = [];
                const totalCharacters = dataArray.length;
                const indices = new Set();

                // while (indices.size < 800) {
                //     const randomIndex = Math.floor(Math.random() * totalCharacters);
                //     indices.add(randomIndex);
                // }

                // Array.from(indices).forEach((index) => {
                //     randomCharacters.push(dataArray[index]);
                // });

                // // Sort the selected characters in descending order by the 'articles' property
                // randomCharacters.sort((a, b) => parseInt(b.articles, 10) - parseInt(a.articles, 10));

                resolve(dataArray);
            } else {
                reject(new Error('No data available'));
            }
        });
    });
}

export function postGameObject(gameObject) {
    const gameObjectsRef = ref(db, 'gameObjects');
    push(gameObjectsRef, gameObject);
}
