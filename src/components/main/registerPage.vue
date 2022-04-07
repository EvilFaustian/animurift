/* <template>
    <input v-model="username" type="text" />
    <input v-model="email" type="email" />
    <input v-model="password" type="password">
    <p v-if="userError">{{userError}}</p>
    <button @click="register">Register</button>
    <button @click="signInWithGoogle">SignInWithGoogle</button>
</template>

<script setup>
import {ref} from 'vue';
import {getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {useRouter} from 'vue-router'
const router = useRouter();
const username = ref("");
const email = ref("");
const password = ref("");
const password2 = ref("");
const userError = ref("");
console.log(getAuth().currentUser);
const register = () => {
    if (username.value || email.value || password.value === null) {
        userError.value == "Please fill out all the forms!"
    } else {
        createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            console.log("successfully registered!");
            router.push('/');
            console.log(getAuth().currentUser);
        })
        .catch((error) => {
            console.log(error.code);
            alert(error.message);
            console.log(getAuth().currentUser);
        });
    }
};

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
    .then((result) => {
        console.log(result.user);
        router.push("/search");
    })
    .catch((error) => {

    })
};
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
</style> */