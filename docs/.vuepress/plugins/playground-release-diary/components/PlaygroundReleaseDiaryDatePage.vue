<template>
  <div>
    <h1>{{ title(date) }}</h1>
    <ul>
      <li v-for="item in itemList">
        <router-link :to="item.path">{{ item.name }} ({{ item.version }})</router-link>
      </li>
    </ul>
    <hr>
    <ul>
      <li>Back to <router-link :to="config.dateIndex.path">{{ config.dateIndex.title }}</router-link></li>
    </ul>
  </div>
</template>

<script>
import PackageContainer from '../package-container';

import pluginConfig from '@dynamic/playground-release-diary/config';

export default {
  props: {
    date: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      config: pluginConfig,
      itemList: [],
    };
  },

  mounted() {
    const container = new PackageContainer(this.$site.pages);

    this.itemList = container.getByDate(this.date);
  },

  methods: {
    /**
     * @param {string} date
     * @return {string}
     */
    title(date) {
      return this.config.datePage.title.replace(':date', date);
    }
  }
};
</script>

<style lang="stylus" scoped>
</style>
