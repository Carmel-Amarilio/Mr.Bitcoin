<template>
  <section class="contact-list card-grid">
    <article
      v-for="contact in contacts"
      :key="contact._id"
      class="contact-prev flex column gap10"
    >
      <button class="remove-btn" @click="onRemove(contact._id)">X</button>
      <ContactPreview :contact="contact" />
      <RouterLink :to="`/contact/${contact._id}`"><button>Details</button></RouterLink>
    </article>
  </section>
</template>

<script>
import ContactPreview from "./ContactPreview.vue";

export default {
  props: {
    contacts: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onRemove(id) {
      this.$emit("remove", id);
    },
  },
  components: {
    ContactPreview,
  },
};
</script>

<style lang="scss">
@import "../../assets/styles/setup/_variables.scss";
.contact-list {
  .contact-prev {
    padding: 20px;
    border-radius: 10px;
    background-color: $mainClr;

    .remove-btn {
      align-self: end;
      background-color: rgb(228, 74, 74);
      padding: 5px 8px;
    }
  }
}
</style>