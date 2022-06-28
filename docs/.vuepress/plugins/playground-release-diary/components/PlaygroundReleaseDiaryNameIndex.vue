<template>
  <div>
    <h1>Release list (By name)</h1>
    <ul>
      <li v-for="name in nameList">
        <router-link :to="linkForName(name)">{{ name }}</router-link>
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
import { sprintf } from "sprintf-js";

export default {
  data() {
    return {
      linkToIndex: '/release/',
      nameList: [],
    };
  },

  mounted() {
    const container = new PackageContainer(this.$site.pages);

    this.nameList = container.getNameList();
  },

  methods: {
    linkForName(name) {
      return sprintf('/%s/name/%s/', 'release', name);
    },
  },
};
</script>

<style lang="stylus" scoped>
</style>
