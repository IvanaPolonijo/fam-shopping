<template>
  <div class="container">
    <div class="row">
      <!-- <div class="col">first</div> -->
      <div class="col-8">
        <item-card />
        <item-card />
        <item-card />
        <item-card />
        <tags-pill/>
      </div>
      <div class="col-3">Search will come here</div>
    </div>
  </div>
</template>

<script>
import ItemCard from "../components/item-card.vue";
import TagsPill from '../components/tags-pill';

export default {
  name: "ShopList",
  components: {
    ItemCard,
    TagsPill
  },
};
</script>