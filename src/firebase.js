import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, push, get, onValue } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSCiGKpzkNYVe47l0hX6tahGIREP-jPQw",
  authDomain: "expense-app-ad3dd.firebaseapp.com",
  projectId: "expense-app-ad3dd",
  storageBucket: "expense-app-ad3dd.appspot.com",
  messagingSenderId: "208766296336",
  appId: "1:208766296336:web:25aef80522e586931c8595",
  databaseURL:
    "https://expense-app-ad3dd-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const writeNewExpense = (title, amount) => {
  push(ref(database, `expenses`), {
    newExpense: title,
    value: amount,
  });
};

export { app, database, writeNewExpense };
