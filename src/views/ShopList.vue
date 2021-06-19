<template>
  <div class="container">
    <div class="row">
      <div class="col-1"></div>
      <div class="col-8">
        <template>
          <b-button @click="$bvModal.show('modal')">Dodaj na listu</b-button>

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

        <!-- ovisno o stanju toggle checkera pokazujem sve ili samo aktive -->
        <div v-if="!checked">
          <div class="row">
            <item-card
              v-for="item in showItems"
              :key="item.id"
              :card="item"
              :ime="items.ime"
              :opis="items.opis"
              :id="item.id"
            />
          </div>
        </div>
        <div v-else>
          <div class="row">
            <item-card
              v-for="item in items"
              :key="item.id"
              :card="item"
              :ime="items.ime"
              :opis="items.opis"
              :id="item.id"
            />
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="search">
          <b-form-input v-model="text" placeholder="Find by tag"></b-form-input>
          <div class="mt-2">Value za provjeru: {{ text }}</div>
        </div>
        <div>
          <div class="form-check form-switch">
            <b-form-checkbox v-model="checked" name="check-button" switch>
              Zašto ne izgleda kao Switch Checkbox???
              <b>(Checked: {{ checked }})</b>
            </b-form-checkbox>
          </div>
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
      text: "", //za search
      checked: false, //za checkbox toggle
      tag: "",
      tags: [],
      ime: "",
      opis: "",
      id: "",
      status: "", //zapravo bool - kako deklarirati ovdje?
      items: [],
    };
  },
/*   mounted() {
    this.getCards();
  }, */
  computed: {
    showItems() {
      //prikazati samo aktivne items
      let activeItems = [];
      for (let item of this.items) {
        if (item.status) activeItems.push(item);
      }
      return activeItems;
    },
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
            status: 1,
            //moram riješiti tagove posebno
          })
          .then(() => {
            console.log("Document written");
          })
          .then(() => {
            this.$bvModal.hide("modal");
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      }
    },
    /* getCards() {
      console.log("Vučem artikle");
      db.collection("items")
        .get()
        .then((query) => {
          this.items = [];
          query.forEach((doc) => {
            const data = doc.data();
            this.items.push({
              ime: data.ime,
              opis: data.opis,
              status: data.status,
              id: doc.id,
            });
          });
        })
        .then(() => {
          console.log(this.items);
        })
        .catch((e) => {
          console.log(e);
        });
    }, */
  },
  created(){
      db.collection('items').onSnapshot(res => {

        const changes = res.docChanges();
        console.log("Vučem artikle u snapshot");
        changes.forEach(change => {
          if (change.type === "added"){
            this.items.push({
              ...change.doc.data(),
              id: change.doc.id
            })
          }
          if (change.type === "modified"){
            change.doc.data();
            console.log("promjena: ", change.doc.data());
            } 
          }
        )
      })
     },
};
</script>

<style scoped>
.search {
  padding-top: 15px;
}
</style>