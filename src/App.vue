<template>
  <div id="app">
    <div id="nav">
      <div class="container">
        <b-row >
        <b-col cols="1"></b-col> 
        <b-col>
          <b-navbar-brand tag="h1" >
            FamPoloShopping
          </b-navbar-brand>
        </b-col>
        <b-col>
          <b-nav align="right">
            <b-button class="button" v-if="this.userName === null" @click="$router.push('/')">Login</b-button>
            <b-button class="button" v-if="this.userName !== null" @click="$router.push('/')">Login</b-button>
            <!-- //ne radi - vidi zašto -->
            <b-button class="button" v-if="this.userName !== null" @click="$router.push('/shoplist')">ShopList</b-button>
            <b-button @click="$router.push('about')">About</b-button>
          </b-nav>
        </b-col>
       </b-row>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import store from '@/store';
import { firebase } from '@/firebase';
import router from '@/router';

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    store.userVerified = user.email;
    console.log('Da vidimo listener', store.userVerified)
  } else {
    router.push({ name: "Home" });
  }
});

export default {
  name: "app",
  data() {
    return {
        userName: store.userVerified,
    };
  },
}
</script>


<style>
#nav {
  padding: 30px;
  background: white;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.container {
  max-width: 80%;
}

.button {
  margin-right: 20px;
}
</style>
