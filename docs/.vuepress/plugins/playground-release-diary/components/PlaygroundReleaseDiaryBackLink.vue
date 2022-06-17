<template>
  <div v-if="shouldShow">
    <hr>
    <ul>
      <li>Back to <router-link :to="linkToDate">Release list ({{ date }})</router-link></li>
      <li>Back to <router-link :to="linkToName">Release list ({{ name }})</router-link></li>
    </ul>
  </div>
</template>

<script>
/**
 * @typedef {import('vuepress-types').Page} Page
 */

import { sprintf } from 'sprintf-js';

export default {
  data() {
    return {
      shouldShow: false,
      date: '',
      name: '',
      linkToDate: '',
      linkToName: '',
    };
  },

  mounted() {
    if (this.isTargetPage(this.$page)) {
      this.shouldShow = true;
      this.date = this.$page.frontmatter.package_release.date;
      this.name = this.$page.frontmatter.package_release.name;
      this.linkToDate = this.linkForDate(this.$page.frontmatter.package_release.date);
      this.linkToName = this.linkForName(this.$page.frontmatter.package_release.name);
    }
  },

  methods: {
    /**
     * @param {Page} page
     * @return {bool}
     */
    isTargetPage(page) {
      return (
        page.frontmatter.package_release &&
        page.frontmatter.package_release.date &&
        /^\d{4}\/\d{2}\/\d{2}$/.test(page.frontmatter.package_release.date) &&
        page.frontmatter.package_release.name &&
        page.frontmatter.package_release.version
      );
    },

    /**
     * @param {string} date
     * @return {string}
     */
    linkForDate(date) {
      return sprintf('/%s/%s/', 'release', this.dateForPath(date));
    },

    linkForName(name) {
      return sprintf('/%s/%s/', 'release', name);
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
