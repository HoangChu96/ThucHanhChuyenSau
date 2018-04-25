import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBx1i6N6pVTS-E6ZV5fmXd92E06MR5z7So",
    authDomain: "shopsportshoes-1520586886516.firebaseapp.com",
    databaseURL: "https://shopsportshoes-1520586886516.firebaseio.com",
    projectId: "shopsportshoes-1520586886516",
    storageBucket: "",
    messagingSenderId: "138193713584"
  };
export const firebaseApp =  firebase.initializeApp(config);
