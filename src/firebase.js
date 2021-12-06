import app from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

let firebaseConfig = {
    apiKey: 'AIzaSyBoO49etJyRt6H7EyIwWxPyQ_rZn_QCkUE',
    authDomain: 'reactapp-e0538.firebaseapp.com',
    databaseURL: 'https://reactapp-e0538.firebaseio.com',
    projectId: 'reactapp-e0538',
    storageBucket: 'reactapp-e0538.appspot.com',
    messagingSenderId: '819188274860',
    appId: '1:819188274860:web:2df3addf2a3e0fcd',
};

class Firebase {
    constructor() {
        // Initialize Firebase
        app.initializeApp(firebaseConfig);

        this.app = app.database();
        this.storage = app.storage();
    }

    login(email, password) {
        return app.auth().signInWithEmailAndPassword(email, password);
    }

    async register(nome, email, password) {
        await app.auth().createUserWithEmailAndPassword(email, password);

        const uid = app.auth().currentUser.uid;

        return app.database().ref('usuarios').child(uid).set({ nome: nome });
    }

    isInitialized() {
        return new Promise((resolve) => {
            app.auth().onAuthStateChanged(resolve);
        });
    }

    getCurrent() {
        return app.auth().currentUser && app.auth().currentUser.email;
    }

    getCurrentUid() {
        return app.auth().currentUser && app.auth().currentUser.uid;
    }

    logout() {
        return app.auth().signOut();
    }

    async getUserName(callback) {
        if (!app.auth().currentUser) {
            return null;
        }

        const uid = app.auth().currentUser.uid;

        await app
            .database()
            .ref('usuarios')
            .child(uid)
            .once('value')
            .then(callback);
    }
}

export default new Firebase();
