<template>
  <div class="col-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ card.ime }}</h5>
        <p class="card-text">{{ card.opis }}</p>
        <vue-tags-input
          v-model="tag"
          :tags="tags"
          @tags-changed="(newTags) => (tags = newTags)"
        />
        <a :id="card.id" href="#" class="btn btn-primary">Kupljeno</a>
        <b-button :id="card.id" @click="showModal">Uredi</b-button>
      </div>
      <b-modal ref="my-modal" hide-footer title="Using Component Methods">
        <form>
          <div class="form-group">
            <input
              v-model="card.ime"
              type="ime"
              class="form-control"
              id="ime"
              placeholder="Naziv proizvoda"
            />
          </div>
          <div class="form-group">
            <input
              v-model="card.opis"
              type="opis"
              class="form-control"
              id="opis"
              placeholder="Nesto važno u vezi proizvoda?"
            />
          </div>
          <b-card-body>
            <vue-tags-input
              v-model="tag"
              :tags="tags"
              @tags-changed="(newTags) => (tags = newTags)"
            />
          </b-card-body>
        </form>
        <b-button
          class="mt-3"
          variant="outline-danger"
          block
          v-on:click="saveChange(card.id)"
          >Save</b-button
        >
        <b-button class="mt-3" variant="outline-danger" block @click="hideModal"
          >Close Me</b-button
        >
      </b-modal>
    </div>
  </div>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";
import { db } from "@/firebase";

export default {
  name: "ItemCard",
  props: ["card"],
  components: {
    VueTagsInput,
  },
  data() {
    return {
      tag: "",
      tags: [],
      ime: "",
      opis: "",
      id: "",
    };
  },
  methods: {
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    saveChange(message) {
      console.log(message);
      db.collection("items")
        .doc(message)
        .set({
          ime: this.card.ime,
          opis: this.card.opis,
          status: 1,
        })
        .then(() => {
          console.log(this.card.opis);
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    },
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