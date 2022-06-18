<template>
  <div>
    <h1>Release list ({{ name }})</h1>
    <div>
      <p>Back to <router-link :to="linkToIndex">Release list</router-link></p>
    </div>
    <ul>
      <li v-for="item in itemList">
        <router-link :to="item.path">{{ item.version }} ({{ item.date }})</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import PackageContainer from '../package-container';

export default {
  props: {
    name: {
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

    this.itemList = container.getByName(this.name);
  },
};
</script>

<style lang="stylus" scoped>
</style>
