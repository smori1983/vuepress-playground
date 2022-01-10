<template>
  <div
    class="playground-git-log-git-info"
    v-if="git"
  >
    <div class="title">Git info of this page</div>
    <ul>
      <li>created: {{ created }}</li>
      <li v-if="isUpdated">last updated: {{ updated }}</li>
      <li>authors: {{ authors }}</li>
    </ul>
  </div>
</template>

<script>
import { sprintf } from 'sprintf-js';

export default {
  data() {
    return {
      git: null,
      created: null,
      updated: null,
      authors: null,
    };
  },

  mounted() {
    this.git = this.$page.git || null;
  },

  watch: {
    $page() {
      this.git = this.$page.git || null;
    },

    git() {
      this.created = this.getDate(this.getCreated(this.git));
      this.updated = this.getDate(this.getUpdated(this.git));
      this.authors = this.getAuthors(this.git.author, this.git.contributors);
    },
  },

  computed: {
    isUpdated() {
      return this.created !== this.updated;
    },
  },

  methods: {
    /**
     * Note: vuepress-plugin-git-log has bug in extendPageData().
     */
    getCreated(git) {
      if (Array.isArray(git.commits)) {
        return git.commits[git.commits.length - 1].authorTime;
      } else {
        return git.created;
      }
    },

    /**
     * Note: vuepress-plugin-git-log has bug in extendPageData().
     */
    getUpdated(git) {
      if (Array.isArray(git.commits)) {
        return git.commits[0].commitTime;
      } else {
        return git.updated;
      }
    },

    getDate(timestamp) {
      const date = new Date(timestamp * 1000);

      return sprintf(
        '%d/%02d/%02d %02d:%02d',
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes()
      );
    },

    getAuthors(author, contributors) {
      if (Array.isArray(contributors)) {
        return contributors.join(', ');
      }

      return author;
    }
  }
};
</script>

<style lang="stylus" scoped>
.playground-git-log-git-info {
  max-width: $contentWidth
  padding-left: $sidebarWidth
  margin: 0 auto

  .title {
    font-weight: bold
  }
}
</style>
