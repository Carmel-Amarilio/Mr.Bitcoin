<template>
  <h3>{{ contact.name }}</h3>
  <h5>{{ contact.email }}</h5>
  <h5>{{ contact.phone }}</h5>
</template>

<script>
export default {
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>