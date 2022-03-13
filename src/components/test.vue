<template>
  <div v-for="item in logo">
    <p>{{item.children}}</p>
  </div>
</template>

<script>
export default {
  name: "test",
  props: ['logo']
}
</script>

<style scoped>

</style>
