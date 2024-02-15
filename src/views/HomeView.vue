<template>
  <section class="home flex column gap20">
    <article v-if="loggedInUser" class="user-area flex column gap20">
      <h2>Welcome {{ loggedInUser.name }}</h2>
      <h2>Your balance is {{ loggedInUser.balance }}</h2>
      <h3 v-if="rate">Bitcoin to USD rate is {{ rate }}</h3>
      <button @click="onLogOut">Log out</button>
    </article>

    <article v-if="loggedInUser" class="transactions">
      <h2>transactions:</h2>
      <table>
        <tbody>
          <tr
            v-for="transaction in loggedInUser.transactions"
            :key="transaction.id"
          >
            <td>{{ transaction.to }}</td>
            <td>{{ transaction.amount }}</td>
            <td>{{ formTime(transaction.at) }}</td>
          </tr>
        </tbody>
      </table>
    </article>

    <form
      v-if="!loggedInUser"
      class="log-in flex align-center justify-center gap20"
      @submit.prevent="onLogIn"
    >
      <input type="text" v-model="name" placeholder="Enter your user name" />
      <button>Log In</button>
    </form>
  </section>
</template>

<script>
import { bitcoinService } from "@/services/bitcoin.service.js";

export default {
  data() {
    return {
      rate: null,
      name: "",
    };
  },

  methods: {
    async onLogIn() {
      if (!this.name) return;
      try {
        await this.$store.dispatch({ type: "logIn", name: this.name });
      } catch (err) {
        console.log("Problem log in", err);
      }
      this.name = "";
    },

    async onLogOut() {
      this.$store.dispatch({ type: "logOut" });
    },

    formTime(timestamp) {
      const date = new Date(timestamp);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear()).slice(-2);
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    },
  },

  computed: {
    loggedInUser() {
      console.log(this.$store.getters.loggedInUser);
      return this.$store.getters.loggedInUser;
    },
  },

  async created() {
    this.rate = await bitcoinService.getRate();
    try {
      await this.$store.dispatch({ type: "loadUsers" });
    } catch (err) {
      console.log("Problem getting users", err);
    }
  },
};
</script>

<style lang="scss">
@import "../assets/styles/setup/_variables.scss";
.home {
  .user-area {
    padding: 30px;
    background-color: #3b3b3b;
    border-radius: 20px;
  }

  .transactions {
    table {
      width: 100%;
      padding-block: 20px;

      td {
        padding: 10px;
        &:not(:first-child) {
          text-align: center;
        }
      }
    }
  }

  .log-in {
    button {
      background-color: $mainClr;
    }
  }
}
</style>
