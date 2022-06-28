<template>
  <div>
    <h1>Release list (By date)</h1>
    <ul>
      <li v-for="date in dateList">
        <router-link :to="linkForDate(date)">{{ date }}</router-link>
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
import { sprintf } from 'sprintf-js';

export default {
  data() {
    return {
      dateList: [],
      linkToIndex: '/release/',
    };
  },

  mounted() {
    const container = new PackageContainer(this.$site.pages);

    this.dateList = container.getDateList();
  },

  methods: {
    /**
     * @param {string} date
     * @return {string}
     */
    linkForDate(date) {
      return sprintf('/%s/date/%s/', 'release', this.dateForPath(date));
    },

    /**
     * @param {string} date
     * @return {string}
     */
    dateForPath(date) {
      return date.replace(/\//g, '');
    }
  },
};
</script>

<style lang="stylus" scoped>
</style>
