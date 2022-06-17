<template>
  <div>
    <h1>Release list ({{ date }})</h1>
    <div>
      <p>Back to <router-link :to="linkToIndex">Release list</router-link></p>
    </div>
    <ul>
      <li v-for="item in itemList">
        <router-link :to="item.path">{{ item.name }} ({{ item.version }})</router-link>
      </li>
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
    const container = this.prepareContainer(this.$site.pages);

    this.itemList = container.getByDate(this.date);
  },

  methods: {
    /**
     * @param {Page[]} pages
     * @return {PackageContainer}
     */
    prepareContainer(pages) {
      const container = new PackageContainer();

      pages.filter(this.isTargetPage).forEach((page) => {
        const {date, name, version} = page.frontmatter.package_release;
        const path = page.regularPath;
        container.add(date, name, version, path);
      });

      return container;
    },

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
  },
};
</script>

<style lang="stylus" scoped>
</style>
