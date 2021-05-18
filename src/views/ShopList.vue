<template>
  <div class="container">
    <div class="row">
      <div class="col-8">
        <item-card />
        <item-card />
      </div>
      <div class="col-3">
        <div class="search">
          <b-form-input
            v-model="text"
            placeholder="Find by tag"
          ></b-form-input>
          <div class="mt-2">Value za provjeru: {{ text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCard from "../components/item-card.vue";

export default {
  name: "ShopList",
  components: {
    ItemCard,
  },
  data() {
      return {
        text: ''
      }
    }
};
</script>

<style scoped>
.search {
  padding-top: 15px;
 

}
</style>