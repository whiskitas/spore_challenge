<!-- <template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style> -->

<template>
  <v-app>
    <!-- <v-navigation-drawer v-if="isAuthenticated" app> -->
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

    <!-- <v-app-bar app>
      <v-toolbar-title>My Vue App</v-toolbar-title>
    </v-app-bar> -->
    <v-app-bar app>
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
          <!-- Add more options here if needed -->
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { computed } from 'vue';
import router from './router';

export default {
  name: 'App',
  setup() {
    // Check authentication status
    const isAuthenticated = computed(() => localStorage.getItem('isAuthenticated') === 'true');

    const logout = () => {
      localStorage.removeItem('isAuthenticated');
      isAuthenticated.value = false;
      // Optionally, redirect to login or home page
      // console.log(this)
      router.push('/login');
      // this.$router.push('/login'); // Redirect to login page
    };

    return { isAuthenticated, logout };
  }
};
</script>

<style>
/* Add global styles here if needed */
</style>
