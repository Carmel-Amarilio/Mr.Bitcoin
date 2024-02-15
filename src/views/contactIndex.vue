<template>
  <section class="contact-index">
    <ContactFilter @filter="filter" />
    <RouterLink to="/contact/edit"
      ><button class="add-contact-btn">Add contact</button></RouterLink
    >
    <ContactList v-if="contacts" @remove="removeContact" :contacts="contacts" />
    <img v-else src="../assets/img/puff.svg" alt="" />
  </section>
</template>

<script>
import ContactList from "@/cmps/contact/ContactList.vue";
import ContactFilter from "@/cmps/contact/ContactFilter.vue";

export default {
  data() {
    return {
      filterBy: { txt: "" },
    };
  },
  methods: {
    async getContacts() {
      try {
        await this.$store.dispatch({
          type: "loadContact",
          filter: this.filterBy,
        });
      } catch (err) {
        console.log("Problem getting contact", err);
      }
    },

    async removeContact(contactId) {
      try {
        await this.$store.dispatch({ type: "removeContact", contactId });
      } catch (err) {
        alert("Had a problem. try again.");
      }
    },

    async filter(filterBy) {
      this.filterBy = filterBy;
      this.getContacts();
    },
  },
  computed: {
    contacts() {
      return this.$store.getters.contacts;
    },
  },
  async created() {
    this.getContacts();
  },
  components: {
    ContactList,
    ContactFilter,
  },
};
</script>

<style lang="scss">
@import "../assets/styles/setup/_variables.scss";
.contact-index {
  .headline {
    margin-block-end: 20px;
  }
  img {
    display: block;
    width: 200px;
    margin: 100px auto;
  }

  .add-contact-btn {
    margin-block-end: 20px;
    background-color: $mainClr;
    font-size: 1.5em;
  }
}
</style>