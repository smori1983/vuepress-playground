<template>
  <div>
    <h1>Release list</h1>
    <tabs
      :cache-lifetime="-1"
      :options="tabsOptions"
    >
      <tab id="tab-by-date" name="By date">
        <ul>
          <li v-for="date in dateList">
            <router-link :to="linkForDate(date)">{{ date }}</router-link>
          </li>
        </ul>
      </tab>
      <tab id="tab-by-name" name="By name">
        <ul>
          <li v-for="name in nameList">
            <router-link :to="linkForName(name)">{{ name }}</router-link>
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
    const container = new PackageContainer(this.$site.pages);

    this.dateList = container.getDateList();
    this.nameList = container.getNameList();
  },

  methods: {
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
