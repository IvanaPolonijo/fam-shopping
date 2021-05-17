<template>
  <div class="container">
    <div class="row">
      <div class="col"></div>
      <div class="col-6">
        <HelloWorld />
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>


<script>
import HelloWorld from "@/components/hello-world";

export default {
  name: "Test",
  components: {
    HelloWorld,
  },
};
</script>

<style>
</style>