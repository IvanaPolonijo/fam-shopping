<template>
  <div id="app">
    <Login/>
    <particles-bg type="cobweb" :canvas="{backgroundColor:'#888'}" :bg="true"> </particles-bg>
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
