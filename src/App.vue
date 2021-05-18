<template>
  <div id="app">
    <div id="nav">
      <b-row>
        <b-col>
          <b-navbar-brand align="left" tag="h1" class="mb-0">
            FamPoloShopping
          </b-navbar-brand>
        </b-col>
        <b-col>
          <b-nav align="right">
            <b-button class="button" @click="$router.push('/')">Login</b-button>
            <b-button class="button" @click="$router.push('about')">About</b-button>
          </b-nav>
        </b-col>
      </b-row>
    </div>
    <router-view />
  </div>
</template>

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

.button {
  margin-right: 20px;

}

</style>
