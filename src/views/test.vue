<template>
  <div class="container">
    <div class="row">
      <div class="col"></div>
      <div class="col-6">
        <HelloWorld />
        <vue-tags-input
      v-model="tag"
      :tags="tags"
      @tags-changed="newTags => tags = newTags"
    />
      </div>
      <div class="col">
      </div>
    </div>
  </div>
</template>


<script>
import HelloWorld from "@/components/hello-world";
import VueTagsInput from '@johmun/vue-tags-input';


export default {
  name: "Test",
  components: {
    HelloWorld,
    VueTagsInput

  },
  data() {
      return {
      tag: '',
      tags: [],
    };
    }
};
</script>

<style>
</style>