<template>
  <div class="col-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{card.ime}}</h5>
        <p class="card-text">{{card.opis}}</p>
        <vue-tags-input
      v-model="tag"
      :tags="tags"
      @tags-changed="newTags => tags = newTags"
    />
        <a href="#" class="btn btn-primary">Kupljeno</a>
        <a href="#" class="btn btn-primary">Uredi</a>
      </div>
    </div>
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
  margin-block: 3;
}
</style>