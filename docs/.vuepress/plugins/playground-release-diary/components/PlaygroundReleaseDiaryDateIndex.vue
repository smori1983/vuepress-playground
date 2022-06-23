<template>
  <div>
    <h1>Release list ({{ date }})</h1>
    <ul>
      <li v-for="item in itemList">
        <router-link :to="item.path">{{ item.name }} ({{ item.version }})</router-link>
      </li>
    </ul>
    <hr>
    <ul>
      <li>Back to <router-link :to="linkToIndex">Release list</router-link></li>
    </ul>
  </div>
</template>

<script>
import PackageContainer from '../package-container';

export default {
  props: {
    date: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      linkToIndex: '/release/',
      itemList: [],
    };
  },

  mounted() {
    const container = new PackageContainer(this.$site.pages);

    this.itemList = container.getByDate(this.date);
  },
};
</script>

<style lang="stylus" scoped>
</style>
