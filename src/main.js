import { createApp } from 'vue'
import MasterPage from './components/main/masterPage.vue'
import router from './router'
import store from './store'
import 'jquery/src/jquery.js'
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue-icons"

import axios from 'axios'
import VueAxios from 'vue-axios'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDColARAihPdWZjMcd0nNgpwKzcm6Uw64o",
  authDomain: "animurift.firebaseapp.com",
  projectId: "animurift",
  storageBucket: "animurift.appspot.com",
  messagingSenderId: "168918385522",
  appId: "1:168918385522:web:456f0eafc7314d798113eb"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore();

export {firebaseApp, db}
createApp(MasterPage).use(store).use(router).use(VueAxios, axios).mount('#app')
