<template>
  <form action="" class="flex align-center gap10">
    <h2>Filter</h2>
    <input @input="onFilter" type="text" v-model="filterBy.txt" />
  </form>
</template>

<script>
export default {
  data() {
    return {
      filterBy: { txt: "" },
    };
  },
  methods: {
    onFilter() {
      this.$emit("filter", this.filterBy);
    },
  },
};
</script>

<style>
form {
  padding-block: 20px;
}
</style>