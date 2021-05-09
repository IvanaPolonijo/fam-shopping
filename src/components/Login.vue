<template>
  <div class="centered-container">
    <content>
      <div class="title">
        <div>
          A Vue.js particles animation background component
        </div>
      </div>

      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="email"
          description="We'll never share your email with anyone else."
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
        id="password" 
        label="Passwor" 
        label-for="password">

          <b-form-input
            id="password"
            v-model="password"
            placeholder="Enter password"
            required
          ></b-form-input>

        </b-form-group>
      </b-form>
    </content>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      login: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    auth() {
      // your code to login user
      // this is only for example of loading
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 5000);
    },
  },
};
</script>

<style lang="scss">
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
  .title {
    text-align: center;
    margin-bottom: 30px;
  }
  .content {
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    background: rgb(255, 255, 255); 
    position: relative;
  }
}
</style>
