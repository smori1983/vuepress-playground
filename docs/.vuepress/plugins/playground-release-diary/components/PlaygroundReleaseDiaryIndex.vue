<template>
  <div>
    <tabs
      :cache-lifetime="-1"
      :options="tabsOptions"
    >
      <tab id="tab-by-date" name="By date">
        <ul>
          <li v-for="date in dateList">
            <a :href="linkForDate(date)">{{ date }}</a>
          </li>
        </ul>
      </tab>
      <tab id="tab-by-name" name="By name">
        <ul>
          <li v-for="name in nameList">
            <a :href="linkForName(name)">{{ name }}</a>
          </li>
        </ul>
      </tab>
    </tabs>
  </div>
</template>

<script>
/**
 * @typedef {import('vuepress-types').Page} Page
 */

import { sprintf } from 'sprintf-js';
import { Tabs, Tab } from 'vue-tabs-component';
import PackageContainer from '../package-container';

export default {
  components: {
    Tabs,
    Tab,
  },

  data() {
    return {
      tabsOptions: {
        useUrlFragment: false,
        defaultTabHash: 'tab-by-date',
      },
      dateList: [],
      nameList: [],
    };
  },

  mounted() {
    const container = this.prepareContainer(this.$site.pages);

    this.dateList = container.getDateList();
    this.nameList = container.getNameList();
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
.tabs-component {
  margin 0
  width 100%
  >>> .tabs-component-tabs {
    margin 0 0 1rem
    padding 0
    align-items stretch
    display flex
    justify-content flex-start
    .tabs-component-tab {
      margin 0
      padding 0
      color #999
      font-size 1.5rem
      font-weight 600
      list-style none
      .tabs-component-tab-a {
        margin 0
        padding 0 2rem 0 0
        line-height 2.5rem
        align-items center
        color inherit
        display flex
        text-decoration none
      }
    }
    .tabs-component-tab:hover {
      color #666
    }
    .tabs-component-tab.is-active {
      color #000
    }
  }
  >>> .tabs-component-panels {
    margin 0
    padding 0
  }
}
</style>
