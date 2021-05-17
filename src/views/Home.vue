<template>
  <div class="container">
    <div class="row">
      <div class="col"></div>
      <div class="col-8">
        <Login />
      </div>
      <div class="col"></div>
    </div>
    <particles-bg
      type="square"
      :canvas="{ backgroundColor: '#888' }"
      :bg="true"
    >
    </particles-bg>
  </div>
</template>

<script>
import { ParticlesBg } from "particles-bg-vue";
import Login from "@/components/Login";

export default {
  name: "Home",
  components: {
    ParticlesBg,
    Login,
  },
};
</script>
