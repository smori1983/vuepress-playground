<template>
  <div>
    <h1>Release list</h1>
    <ul>
      <li><router-link :to="linkToDateIndex">By date</router-link></li>
      <li><router-link :to="linkToNameIndex">By name</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      linkToDateIndex: '/release/date/',
      linkToNameIndex: '/release/name/',
    };
  },
};
</script>

<style lang="stylus" scoped>
</style>
