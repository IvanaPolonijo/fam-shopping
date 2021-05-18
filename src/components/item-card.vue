<template>
  <div class="item-card">
    <b-card header="Info">
      <b-card-text
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text
      >
      <b-card-body>
        <tags-pill /><tags-pill /><tags-pill />
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import TagsPill from "../components/tags-pill";

export default {
  name: "ItemCard",
  components: {
    TagsPill,
  },
};
</script>

<style>
.item-card {
  padding: 20px 0;
  text-align: left;
}
</style>