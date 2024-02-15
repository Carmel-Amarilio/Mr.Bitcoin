<template>
  <header class="main-container full">
    <section class="flex align-center space-between">
      <h1>Mr. BitCoin</h1>
      <nav class="flex gap10">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
        <RouterLink to="/chart">Chart</RouterLink>
      </nav>
    </section>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "../assets/styles/setup/_variables.scss"; 
header {
  height: 100px;
  background-color: $mainClr;
  a{
    font-size: 1.5em;
  }
}
</style>