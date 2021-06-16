<template>
  <div class="container">
    <div class="row">
      <div class="col-1"></div>
      <div class="col-8">
        <template>
          <b-button @click="$bvModal.show('modal')"
            >Stvori novu pretplatu</b-button
          >

          <b-modal id="modal">
            <template #modal-header="{}">
              <!-- Emulate built in modal header close button action -->
              <h5>Unesite podatke!</h5>
            </template>

            <template #default="{}">
              <form>
                <div class="form-group">
                  <input
                    v-model="ime"
                    type="ime"
                    class="form-control"
                    id="ime"
                    placeholder="Naziv proizvoda"
                  />
                </div>
                <div class="form-group">
                  <input
                    v-model="opis"
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
            </template>

            <template #modal-footer="{ cancel }">
              <!-- Emulate built in modal footer ok and cancel button actions -->
              <b-row>
                <b-button class="mr-1" variant="success" @click="postNewItem">
                  SAVE
                </b-button>
                <b-button variant="danger" @click="cancel()"> Cancel </b-button>
              </b-row>
            </template>
          </b-modal>
        </template>
        <item-card 
          v-for='item in items'
          :key='item.ime'
          :card='item'
          :ime='items.ime'
          :opis='items.opis'
        />
      </div>
      <div class="col-3">
        <div class="search">
          <b-form-input v-model="text" placeholder="Find by tag"></b-form-input>
          <div class="mt-2">Value za provjeru: {{ text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCard from "../components/item-card.vue";
import VueTagsInput from "@johmun/vue-tags-input";
import { db } from "@/firebase";

export default {
  name: "ShopList",
  components: {
    ItemCard,
    VueTagsInput,
  },
  data() {
    return {
      text: "",
      tag: "",
      tags: [],
      ime: "",
      opis: "",
      items: [],
    };
  },
  mounted() {
    this.getCards();
  },
  methods: {
    postNewItem() {
      if (this.ime === "") {
        this.$alert("Ime proizvoda mora biti navedeno!");
      } else {
        db.collection("items")
          .add({
            ime: this.ime,
            opis: this.opis,
            //moram riješiti tagove posebno
          })
          .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
          })
          .then(() => {
            this.$bvModal.hide("modal");
            location.reload();
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      }
    },
    getCards(){
      console.log("Vučem artikle");
      db.collection('items')
      .get()
      .then((query)=>{
        this.items = []
        query.forEach((doc) => {
          const data = doc.data();
          this.items.push({
            ime: data.ime,
            opis: data.opis
          })
        });
      }
      )
      .then(()=>{
        console.log(this.items)
        
      })
      .catch((e)=>{
        console.log(e);
      })
    }
  },
};
</script>

<style scoped>
.search {
  padding-top: 15px;
}
</style>