[<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <template>
          <!--Modal za dodavanje itema RADI -->
          <div class="p-2">
            <b-button @click="$bvModal.show('modal')">Dodaj na listu</b-button>
          </div>
          <b-modal id="modal">
            <template #modal-header="{}">
              <h5>Unesite podatke!</h5>
            </template>
            <template #default="{}">
              <form>
                <div class="form-group p-2">
                  <input
                    v-model="ime"
                    type="ime"
                    class="form-control"
                    id="ime"
                    placeholder="Naziv proizvoda"
                  />
                </div>
                <div class="form-group p-2">
                  <input
                    v-model="opis"
                    type="opis"
                    class="form-control"
                    id="opis"
                    placeholder="Nesto važno u vezi proizvoda?"
                  />
                </div>
                <b-card-body>
                  <template>
                    <div class="tag-input">
                      <div
                        v-for="(tag, index) in tags"
                        :key="tag"
                        class="tag-input__tag"
                      >
                        <span @click="removeTag(index)">x</span>
                        {{ tag }}
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
                </b-card-body>
              </form>
            </template>

            <template #modal-footer="{ cancel }">
              <!-- Emulate built in modal footer ok and cancel button actions -->
              <b-row>
                <div class="col">
                  <b-button variant="success" @click="postNewItem">
                    SAVE
                  </b-button>
                </div>
                <div class="col">
                  <b-button variant="danger" @click="cancel()">
                    Cancel
                  </b-button>
                </div>
              </b-row>
            </template>
          </b-modal>
        </template>

        <!-- ovisno o stanju pokazujem one koje treba kupiti ili koji su već kupljeni -->
        <div>
          <b-card no-body>
            <b-tabs card>
              <b-tab title="Za kupiti" active>
                <div class="p-2">
                  <b-button
                    @click="printPDF"
                    type="button"
                    class="btn btn-warning"
                    >Ispiši PDF</b-button
                  >
                </div>
                <div class="row">
                  <item-card
                    v-for="item in showItems"
                    :key="item.id"
                    :card="item"
                    :ime="item.ime"
                    :opis="item.opis"
                    :id="item.id"
                  />
                </div>
              </b-tab>
              <b-tab title="Kupljeno">
                <div class="row">
                  <item-card
                    v-for="item in boughtItems"
                    :key="item.id"
                    :card="item"
                    :ime="items.ime"
                    :opis="items.opis"
                    :id="item.id"
                  />
                </div>
              </b-tab>
              <b-tab title="Pretraži">
                <div class="row p-2">
                  <b-col sm="3">
                    <b-form-input
                      id="textT"
                      v-model="textTag"
                      placeholder="Find by tag"
                    ></b-form-input>
                  </b-col>
                  <b-col sm="3">
                    <div>
                      <b-button
                        @click="printPDFsearch"
                        type="button"
                        class="btn btn-warning"
                        >Ispiši PDF</b-button
                      >
                    </div>
                  </b-col>
                </div>
                <div class="row">
                  <item-card
                    v-for="item in searchItems"
                    :key="item.id"
                    :card="item"
                    :ime="items.ime"
                    :opis="items.opis"
                    :id="item.id"
                  />
                </div>
              </b-tab>
            </b-tabs>
          </b-card>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import ItemCard from "../components/item-card.vue";
//import VueTagsInput from "@johmun/vue-tags-input";
import { db } from "@/firebase";
import firebase from "firebase";
import store from "@/store";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default {
  name: "ShopList",
  components: {
    ItemCard,
    //VueTagsInput,
  },
  data() {
    return {
      textTag: "", //za search
      tag: "",
      tags: [],
      itemTags: [],
      ime: "",
      opis: "",
      id: "",
      items: [],
    };
  },
  computed: {
    showItems() {
      //prikazati samo aktivne items
      let activeItems = [];
      for (let item of this.items) {
        if (item.status) activeItems.push(item);
      }
      return activeItems;
    },
    boughtItems() {
      //prikazati samo neaktivne items
      let bItems = [];
      for (let item of this.items) {
        if (!item.status) bItems.push(item);
      }
      return bItems;
    },
    searchItems() {
      //items traženi po tagu
      let itemsFound = [];
      for (let item of this.items) {
        if (item.itemTags.find((el) => el == this.textTag))
          itemsFound.push(item);
      }
      return itemsFound;
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
            itemTags: this.tags,
          })
          .then((docRef) => {
            console.log("Document written", docRef.id);
            this.storeTag(docRef.id);
          })
          .then(() => {
            this.ime = "";
            this.opis = "";
            this.tags = [];
          })
          .then(() => {
            this.$bvModal.hide("modal");
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      }
    },
    printPDF() {
      const doc = new jsPDF();
      var row = [];
      var col = ["ime", "opis", "status", "tagovi"];
      this.showItems.forEach((el) => {
        var temp = [el.ime, el.opis, el.status, el.itemTags];
        row.push(temp);
      });
      doc.autoTable(col, row, { startY: 10 });
      doc.save("popis.pdf");
    },
    printPDFsearch() {
      const doc = new jsPDF();
      var row = [];
      var col = ["ime", "opis", "status", "tagovi"];
      this.searchItems.forEach((el) => {
        var temp = [el.ime, el.opis, el.status, el.itemTags];
        row.push(temp);
      });
      doc.autoTable(col, row, { startY: 10 });
      doc.save("popis.pdf");
    },
    storeTag(itemID) {
      const newTags = this.tags;
      console.log("novi tagovi su", newTags);
      console.log("za item s IDem", itemID);
      newTags.forEach((el) => {
        if (store.allTags.find((o) => o.tagName === el)) {
          let index = store.allTags.findIndex((o) => o.tagName === el);
          db.collection("tag")
            .doc(store.allTags[index].id)
            .update({
              itemID: firebase.firestore.FieldValue.arrayUnion(itemID),
            })
            .catch((error) => {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });
        } else {
          db.collection("tag")
            .add({
              tagName: el,
              itemID: itemID,
            })
            .catch((error) => {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });
        }
      });
    },
    addTag(event) {
      event.preventDefault();
      var val = event.target.value.trim();
      if (val.length > 0) {
        this.tags.push(val);
        event.target.value = "";
      }
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
  },
  mounted() {
    db.collection("items").onSnapshot((res) => {
      const changes = res.docChanges();
      console.log("Vučem artikle u snapshot");
      changes.forEach((change) => {
        if (change.type === "added") {
          this.items.push({
            ...change.doc.data(),
            id: change.doc.id,
          });
        }
        if (change.type === "modified") {
          change.doc.data();
          const proba = change.doc.id;
          console.log("promjena je ", proba);
          const index = this.items.findIndex((item) => item.id === proba);
          this.items.splice(index, 1);
          this.items.push(change.doc.data());
        }
      });
      console.log("što je povučeno od itema: ", this.items);
    });

    db.collection("tag").onSnapshot((res) => {
      const changesTag = res.docChanges();
      console.log("Vučem u snapshot tagova");
      changesTag.forEach((change) => {
        if (change.type === "added") {
          store.allTags.push({
            ...change.doc.data(),
            id: change.doc.id,
          });
        }
        if (change.type === "modified") {
          change.doc.data();
          console.log("promjena: ", change.doc.data());
        }
      });
      let localTags = store.allTags;
      console.log("localni tagovi : ", localTags); //meni za testiranje
    });
  },
};
</script>

<style scoped>
.search {
  padding-top: 15px;
}
.tag-input {
  width: 100%;
  border: 1px solid #eee;
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
</style>]