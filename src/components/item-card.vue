<template>
  <div class="item-card">
    <b-card header="Info">
      <b-card-text
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text
      >
      <b-card-body>
        <vue-tags-input
      v-model="tag"
      :tags="tags"
      @tags-changed="newTags => tags = newTags"
    />
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';

export default {
  name: "ItemCard",
  components: {
    VueTagsInput,
  },
  data() {
    return {
      tag: '',
      tags: [],
    };
  },
};
</script>

<style>
.item-card {
  padding: 20px 0;
  text-align: left;
}
</style>