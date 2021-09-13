<template>
  <div class="col-4">
    <div class="card">
      <!-- Sadržaj kartice -->
      <div class="card-body">
        <h5 class="card-title">{{ card.ime }}</h5>
        <p class="card-text">{{ card.opis }}</p>
        <vue-tags-input :tags="card.itemTags" :cardID="card.id" />
        <b-button :id="card.id" v-on:click="saveBuy(card.id)"
          >Kupljeno</b-button
        >
        <b-button :id="card.id" @click="showModal">Uredi</b-button>
      </div>
      <!-- Modal za uređivanje kartice/artikla -->
      <b-modal ref="my-modal" hide-footer title="Uredi sadržaj">
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
          <vue-tags-input
            v-model="tag"
            :tags="card.itemTags"
            :cardID="card.id"
            @tags-changed="storeTagLocal"
          />
        </form>
        <b-button
          class="mt-3"
          variant="outline-danger"
          block
          v-on:click="saveChange(card.id)"
          >Save</b-button
        >
        <b-button
          class="mt-3"
          variant="outline-danger"
          block
          v-on:click="hideModal()"
          >Close Me</b-button
        >
      </b-modal>
    </div>
  </div>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";
import { db } from "@/firebase";
//import store from "@/store";

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
      itemTags: [],
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
          itemsTags: this.itemsTags,
        })
        .then(() => {
          console.log(this.card);
          console.log("Document successfully written!");
          this.hideModal();
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    },
    saveBuy(message) {
      this.disabled=true;
      console.log(message);
      db.collection("items")
        .doc(message)
        .set({
          ime: this.card.ime,
          opis: this.card.opis,
          status: 0,
          itemTags: this.card.itemTags,
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    },
    storeTagLocal(newTags) {
      console.log("duzina arraya tagova: ", newTags.length);
      console.log(
        "stanje tagova: ",
        newTags,
        " a dodan je tag: ",
        newTags[newTags.length - 1].text,
        " a za card ID ",
        this.card.id
      );
      db.collection("tag")
        .doc()
        .set({
          tagName: newTags[newTags.length - 1].text,
          tagAssigned: this.card.id,
        })
        .then(() => {
          this.itemTags.push(newTags[newTags.length - 1].text);
          console.log("trenutni array za dodati itemu je ", this.itemTags);
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