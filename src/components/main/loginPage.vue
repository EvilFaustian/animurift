<template>
<!--     <input v-model="email" type="email" />
    <input v-model="password" type="password">
    <button @click="login">Submit</button> -->
    <!-- <button @click="signInWithGoogle">SignInWithGoogle</button>
    <button @click="testAddDb">TestAddDb2</button> -->
    <div class="container">
        <div class="alert alert-primary mt-5" role="alert">
        <h4 class="alert-heading">You must login to continue!</h4>
        <div class="lgnBtn"><button @click="signInWithGoogle" type="button" class="btn btn-info">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
          </svg>
              Login with Google
            </button>
          </div>
        </div>
    </div>
</template>

<script setup>
import { getAuth, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import {useRouter} from "vue-router";
import { onMounted, ref} from 'vue';
import 'firebase/firestore';
import { addDoc, collection, getDocs, doc, setDoc} from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";
import { getDatabase, onValue } from "firebase/database";

const router = useRouter();
const isLoggedIn = ref(false);
const db = getFirestore(); // get databse
const db2 = getDatabase();
const auth2 = getAuth();

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});
const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
    .then((result) => {
      const newDate = new Date();
      const userDoc = setDoc(doc(db, 'users', getAuth().currentUser.uid), {
        displayName: getAuth().currentUser.displayName,
        anime: {
          test: {

          },
        },
        uid: getAuth().currentUser.uid,
        lastLogin: {
          date: newDate.getFullYear()+'-'+(newDate.getMonth()+1)+'-'+newDate.getDate(),
          time: newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds(),
        }
      }, {merge: true});
        /* return collection('users').doc(getAuth().currentUser.uid).set({
        displayName: getAuth().currentUser.displayName, */
        window.location.href = "/";
      });
        
};
/* import {ref} from 'vue';
import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {useRouter} from 'vue-router'
import 'firebase/firestore';
import { addDoc, collection, getDocs, doc, setDoc } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";


const router = useRouter(); */
/* const email = ref("");
const password = ref("");
const errMsg = ref(); */
/* const db = getFirestore(); */ // get databse

/* const login = () => {
    console.log(getAuth().currentUser);
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
        console.log("successfully signed in!");
        router.push('/search')
    })
    .catch((error) => {
        console.log(error.code);
        switch (error.code) {
            case "auth/invalid-email":
                errMsg.value = "Invalid email";
                break;
            case "auth/user-not-found":
                errMsg.value = "No account with that email was found";
                break;
            case "auth/wrong-password":
                errMsg.value = "Incorrect password";
                break;
            default:
                errMsg.value = "Email or password was incorrect";
                break;
        }
    });
}; */

/* const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
    .then((result) => {
        console.log(result.user);
        router.push("/search");
    })
    .catch((error) => {

    })
};
const testAddDb = async () => { // add to database
try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
};
 */


</script>

<style scoped>
input {
    background-color: #25292d;
    color: white;
}

.form-group {
    color: white;
}

.btn {
    background-color: #25292d;
    border: 1px solid white;
    margin: 5px;
    margin-left: 0px;
}
</style>