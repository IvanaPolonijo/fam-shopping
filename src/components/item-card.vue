<template>
  <div class="item-card">
    <b-card :header="card.ime">
      <b-card-text
        >{{card.opis}}</b-card-text
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
  props: ['card'],
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
  padding: 15px 0;
  text-align: left;
}
</style>