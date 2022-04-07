<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <router-link class="navbar-brand" to="/">AnimuRift</router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link class="nav-link" to="/">Find Anime</router-link>
      </li>
      <ul v-if="isLoggedIn" class="navbar-nav userdropdown">
        <li class="nav-item dropdown">
        <router-link class="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {{getAuth().currentUser.displayName}}
        </router-link>
        <div data-bs-toggle="dropdown" class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <router-link class="dropdown-item" to="#">Profile</router-link>
          <router-link class="dropdown-item" to="#">Settings</router-link>
          <router-link class="dropdown-item" to="#" @click="handleSignOut">Logout</router-link>
        </div>
      </li>
      </ul>
      <ul v-else class="navbar-nav userdropdown googlelogin">
        <div><button @click="signInWithGoogle" type="button" class="btn btn-info">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
          </svg>
              Login with Google
            </button>
          </div>
      </ul>
    </ul>
  </div>
</nav>
<!-- <button @click="testAddDb">TestAddDb2</button> -->
<!-- end nav -->



    <router-view></router-view>
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
      });
        router.push("/");
};
const testAddDb = async () => { // add to database
try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada2",
    last: "Lovelace2",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
};


const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/")
  });
};
</script>

<style>
.userdropdown {
  position: absolute;
  right: 0;
}
.googlelogin {
  margin-right: 5px;
}
</style>