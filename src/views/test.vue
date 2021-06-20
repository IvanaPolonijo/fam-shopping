<template>
  <div class="container">
    <div class="row">
      <div class="col"></div>
        <div>
    <label for="tags-pills">Enter tags</label>
    <b-form-tags
      input-id="tags-pills"
      v-model="value"
      tag-variant="primary"
      tag-pills
      size="lg"
      separator=" "
      placeholder="Enter new tags separated by space"
    ></b-form-tags>
    <p class="mt-2">Value: {{ value }}</p>
  </div>
      <div class="col"></div>
    </div>
  </div>
</template>


<script>


export default {
  name: "Test",
  components: {
  },
  data() {
    return {
       value: ['apple', 'orange', 'grape']
    };
  },
};
</script>

<style>

</style>