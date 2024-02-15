<script >
import AppHeader from "./cmps/AppHeader.vue";
import UserMsg from "./cmps/UserMsg.vue";

export default {
  components: {
    AppHeader,
    UserMsg
  },
};
</script>

<template>
  <UserMsg/>
  <AppHeader />
  <main class="main-container">
    <RouterView />
  </main>
</template>

<style lang="scss">
@import "./assets/styles/setup/_variables.scss";
main {
  padding-block: 10px;
}
</style>
