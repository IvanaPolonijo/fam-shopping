<template>
  <div id="app">
    <div id="nav">
      <div class="container">
        <b-row>
          <b-col cols="1"></b-col>
          <b-col>
            <b-navbar-brand tag="h1"> FamPoloShopping </b-navbar-brand>
          </b-col>
          <b-col>
            <b-nav align="right">
              <b-button
                class="button"
                v-if="!store.userVerified"
                @click="$router.push('/')"
                >Login</b-button
              >
              <b-button class="button" v-else @click="exit()">Logout</b-button>
              <b-button class="button" v-if="store.userVerified" @click="$router.push('/shoplist')"
                >ShopList</b-button
              >
              <b-button v-if="!store.userVerified" @click="$router.push('about')">About</b-button>
            </b-nav>
          </b-col>
        </b-row>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import router from '@/router';
import store from "@/store";
import { firebase } from "@/firebase";

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    store.userVerified = true;
    console.log("Da vidimo listener", store.userVerified);
    router.replace({ name: "ShopList" });
  } else {
    store.userVerified = false;
    console.log("*** No user");
  }
});

export default {
  name: "app",
  data() {
    return {
      store,
    };
  },
  methods: {
    exit() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // store.userVerified = false;
          console.log('korisnik je verificiran', store.userVerified);
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          console.log('Desila se greska ', error)
        });
    },
  },
};
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
