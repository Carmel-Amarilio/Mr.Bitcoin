<template>
  <section class="contact-details">
    <RouterLink :to="`/contact`"><button class="back">Back</button></RouterLink>

    <article v-if="contact" class="contact flex column gap20">
      <img :src="`https://robohash.org/${contact.name}.png`" />
      <h2>{{ contact.name }}</h2>
      <h3>{{ contact.email }}</h3>
      <h3>{{ contact.phone }}</h3>
      <RouterLink class="edit-brn" :to="`/contact/edit/${contact._id}`"
        ><button>Edit</button></RouterLink
      >
      <button @click="onTransfer">Transfer</button>
    </article>

    <form
      v-if="isTransfer"
      class="transfer flex align-center gap20"
      @submit.prevent="onSend"
    >
      <input
        type="number"
        v-model="transferAmount"
        placeholder="Enter transfer amount"
      />
      <button>send</button>
    </form>
  </section>
</template>

<script>
import { contactService } from "@/services/contact.service";
import { eventBus } from "@/services/eventBus.service.js"

export default {
  data() {
    return {
      contact: null,
      isTransfer: false,
      transferAmount: null,
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    onTransfer(){
      if(!this.loggedInUser){
        this.$router.push("/")
        return  eventBus.emit("user-msg", { txt: 'first log in' })
      }
      this.isTransfer = !this.isTransfer
    },
    onSend() {
      if(this.loggedInUser.balance<this.transferAmount) return eventBus.emit("user-msg", { txt: 'You do not have enough money' })
      if(this.transferAmount <= 0) return eventBus.emit("user-msg", { txt: 'Choose how much money to transfer' })
      const transaction= {
				toId: this.contact._id,
				to: this.contact.name ,
				at: Date.now(), 
				amount: this.transferAmount
			}
      this.$store.dispatch({ type: "transfer" , transaction});
      this.isTransfer = !this.isTransfer
    },
  },
  async created() {
    const { contactId } = this.$route.params;
    this.contact = await contactService.getById(contactId);
  },
};
</script>

<style lang="scss">
@import "../assets/styles/setup/_variables.scss";
.contact-details {
  .back {
    background-color: rgb(65, 64, 64);
  }
  .contact {
    padding: 20px;
    border-radius: 20px;
    margin-block: 10px;
    background-color: #3b3b3b;
    img {
      width: 200px;
      height: 200px;
    }
    .edit-brn {
      width: 100px;
    }
  }
  .transfer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background-color: $BGC1;

    button {
      background-color: $mainClr;
    }
  }
}
</style>