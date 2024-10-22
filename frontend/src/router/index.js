import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/Home.vue';
import DataPage from '../components/Data.vue';
import AboutPage from '../components/About.vue';
import LoginPage from '../components/Login.vue';
import MapViewPage from '../components/MapView.vue';
import RegisterPage from '../components/Register.vue';
import PostCarPage from '../components/PostCar.vue';



const routes = [
  { path: '/', component: HomePage },
  { path: '/data', component: DataPage },
  { path: '/about', component: AboutPage },
  { path: '/login', component: LoginPage },
  { path: '/map', component: MapViewPage },
  { path: '/register', component: RegisterPage },
  { path: '/createCar', component: PostCarPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === "true";
  // eslint-disable-next-line
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  if ((to.path === '/login' || to.path === '/register') && isAuthenticated) {
    next('/');
  } else if (to.path === '/login' || to.path === '/register') {
    next();
  } else if (!isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
