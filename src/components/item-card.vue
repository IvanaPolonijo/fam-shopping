<template>
  <div class="col-4">
    <div class="card">
      <!-- Sadržaj kartice -->
      <div class="card-body">
        <h5 class="card-title">{{ card.ime }}</h5>
        <p class="card-text">{{ card.opis }}</p>
        <template>
          <div class="tag-input__disabled">
            <div
              v-for="(tag) in card.itemTags"
              :key="tag"
              class="tag-input__tag"
            >
              {{ tag }}
            </div>
          </div>
        </template>

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
          <template>
            <div class="tag-input">
              <div
                v-for="(tag, index) in card.itemTags"
                :key="tag"
                class="tag-input__tag"
              >
                <span @click="removeTag(index)">x</span>
                {{ tag }} {{index}}
              </div>
              <input
                type="text"
                placeholder="Enter a Tag"
                class="tag-input__text"
                @keydown.enter="addTag"
                @keydown.188="addTag"
              />
            </div>
          </template>
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
//import VueTagsInput from "@johmun/vue-tags-input";
import { db } from "@/firebase";

export default {
  name: "ItemCard",
  props: ["card"],
  components: {
    //VueTagsInput,
    //TagInput,
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
    addTag(event) {
      event.preventDefault();
      var val = event.target.value.trim();
      if (val.length > 0) {
        this.card.itemTags.push(val);
        event.target.value = "";
      }
    },
    removeTag(index) {
      console.log("tagovi tog artikla", this.card.itemsTags)
      this.card.itemsTags.splice(index, 1);
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
      this.disabled = true;
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
.tag-input {
  width: 100%;
  border: 1px solid #eee;
  font-size: 0.9em;
  height: 50px;
  box-sizing: border-box;
  padding: 0 10px;
}

.tag-input__disabled {
  width: 100%;
  font-size: 0.9em;
  height: 50px;
  box-sizing: border-box;
  padding: 0 10px;
}

.tag-input__tag {
  height: 30px;
  float: left;
  margin-right: 10px;
  background-color: #eee;
  margin-top: 10px;
  line-height: 30px;
  padding: 0 5px;
  border-radius: 5px;
}

.tag-input__tag > span {
  cursor: pointer;
  opacity: 0.75;
}

.tag-input__text {
  border: none;
  outline: none;
  font-size: 0.9em;
  line-height: 50px;
  background: none;
}
</style>