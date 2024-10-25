<template>
  <v-app>
    <v-navigation-drawer app>
      <v-list>
        <v-list-item to="/">
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item to="/data">
          <v-list-item-title>Catalog</v-list-item-title>
        </v-list-item>
        <v-list-item to="/map">
          <v-list-item-title>Map</v-list-item-title>
        </v-list-item>
        <v-list-item to="/about">
          <v-list-item-title>About Us</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <!-- <v-toolbar-title v-if="isAdmin">Admin Mode</v-toolbar-title> -->
      <v-toolbar-title>Car Manager</v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- Dropdown Menu Icon -->
      <v-menu offset-y>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" v-on="props">
            <v-icon>mdi-dots-vertical</v-icon> <!-- Dropdown icon -->
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import router from './router';
import { /*ref, onMounted,*/ computed } from 'vue';

export default {
  name: 'App',
  // setup() {
  setup() {
    // const isAuthenticated = ref(false);
    // const isAdmin = ref(false);

    // onMounted(() => {
    let isAuthenticated = computed(() => localStorage.getItem('isAuthenticated') === 'true');
    // isAuthenticated.value = (localStorage.getItem('isAuthenticated') === 'true');
    // let isAdmin = computed(() => localStorage.getItem('isAdmin') === 'true');
    // isAdmin.value = localStorage.getItem('isAdmin') === 'true'
    // })

    const logout = () => {
      localStorage.removeItem('isAuthenticated');
      // localStorage.removeItem('isAdmin');
      localStorage.removeItem('JWTtoken');
      localStorage.removeItem('userId');
      isAuthenticated.value = false;
      // isAdmin.value = false;
      router.push('/login');
    };

    return { isAuthenticated, logout };
  }
};
</script>

<style>
/* Add global styles here if needed */
</style>
