<template>
  <div class="container">
    <div class="row">
      <div class="col"></div>
      <div class="col-8">
        <HelloWorld />
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
import HelloWorld from "@/components/hello-world";

export default {
  name: "App",
  components: {
    ParticlesBg,
    HelloWorld,
  },
};
</script>
