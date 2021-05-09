<template>
  <div id="app">
    <Login/>
    <particles-bg type="random" :canvas="{backgroundColor:'#888'}" :bg="true"> </particles-bg>
  </div>
</template>

<script>
import { ParticlesBg } from "particles-bg-vue";
import Login from "@/components/Login";

export default {
  name: "App",
  components: {
    ParticlesBg,
    Login
  },
};
</script>
