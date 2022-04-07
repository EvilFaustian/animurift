import { createRouter, createWebHistory } from 'vue-router'
import Search from '../components/main/searchPage.vue'
import Login from '../components/main/loginPage.vue'
import Register from '../components/main/registerPage.vue'
import Home from '../components/main/searchPage.vue'
import App from '../App.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth"

const routes = [
  {
    path: '/',
    name: 'App',
    component: App,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/search',
    name: 'searchPage',
    component: Search,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/login',
    name: 'loginPage',
    component: Login,
    meta: {
    }
  },
]

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router
