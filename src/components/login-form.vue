<template>
  <div class="centered-container">
    <b-card border-variant="light" header=" " class="text-center">
      <content>
        <h1>Hej Polonijevi!!! Uletite...</h1>

        <b-form>
          <b-form-group
            class="login"
            id="input-group-1"
            label="Email address:"
            label-for="email"
          >
            <b-form-input
              id="email"
              v-model="email"
              type="email"
              placeholder="Enter email"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            class="login"
            id="password"
            label="Password"
            label-for="password"
          >
            <b-form-input
              id="password"
              v-model="password"
              placeholder="Enter password"
              required
            ></b-form-input>
          </b-form-group>
          <div>
            <b-button @click="enter()">Login</b-button>
          </div>
          <hr class="solid" />

        </b-form>
      </content>
    </b-card>
  </div>
</template>

<script>
import { firebase } from "@/firebase";
// import store from "@/store";

export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    enter() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((result) => {
          console.log("uspjesna prijava", result);
        })
        // .then(()=> {
        //   console.log('korisnik je verificiran', store.userVerified)
        //   })
        // .then(() => {
        //   this.$router.replace({ name: "ShopList" });
        // })
        .catch(function (e) {
          console.error("greska", e);
        });
    },
    enterWithGoogle(){
      console.log("Login with google");
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          console.log("uspjesna prijava", result);
        })
        .catch(function (e) {
          console.error("greska", e);
        });
    
    },
  },
};
</script>

<style scoped>
.centered-container {
  background-color: white;
  align-self: center;
  margin: 120px 0;
}
.login {
  margin: 20px 0;
}
/* .login-button{
  background-color: #318f64;
  display: block; 
  align-self: center;
  padding: 10px, 30px;
} */
.responsive {
  width: 50%;
  height: auto;
  margin: 10px 0;
}
</style>
