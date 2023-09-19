importScripts("https://www.gstatic.com/firebasejs/10.3.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.3.1/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyDnuO7xEzTm1jNUaUPEX61XR3ps5Eqe2bQ",
    authDomain: "fir-messaging-e1ae9.firebaseapp.com",
    projectId: "fir-messaging-e1ae9",
    storageBucket: "fir-messaging-e1ae9.appspot.com",
    messagingSenderId: "634546260905",
    appId: "1:634546260905:web:1c49be9151b708556652b8",
    measurementId: "G-8RQJM28ZY3"
});

const messaging = firebase.messaging();