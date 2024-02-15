<template>
  <section class="flex align-center justify-center">
    <form
      class="contact-edit flex align-center justify-center column gap20"
      v-if="newContact"
      @submit.prevent="onSave"
    >
      <div class="flex gap10 align-center">
        <label for="">Name:</label>
        <input type="text" v-model="newContact.name" placeholder="Name" />
      </div>
      <div class="flex gap10 align-center">
        <label for="">Email:</label>
        <input type="email" v-model="newContact.email" placeholder="Email" />
      </div>
      <div class="flex gap10 align-center">
        <label for="">Phone number:</label>
        <input v-model="newContact.phone" placeholder="Phone number" />
      </div>
      <button class="save-btn">Save</button>
    </form>
  </section>
</template>

<script>
import { contactService } from "@/services/contact.service";
export default {
  data() {
    return {
      newContact: null,
    };
  },

  methods: {
    async onSave() {
      if (
        this.newContact.email &&
        this.newContact.name &&
        this.newContact.phone
      ) {
        await this.$store.dispatch({
          type: "saveContact",
          newContact: this.newContact,
        });
        this.$router.push("/contact");
      }
    },
  },

  async created() {
    const { contactId } = this.$route.params;
    this.newContact = contactId
      ? await contactService.getById(contactId)
      : contactService.getEmptyContact();
  },
};
</script>

<style lang="scss">
@import "../assets/styles/setup/_variables.scss";
.contact-edit {
  max-width: 400px;
  label {
    width: 120px;
  }
  .save-btn {
    background-color: $mainClr;
    width: 80%;
  }
}
</style>