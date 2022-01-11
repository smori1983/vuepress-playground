<template>
  <div
    class="playground-git-log-git-info"
    v-if="git"
  >
    <div class="title">Git info of this page</div>
    <git-info v-bind:git="git"></git-info>
  </div>
</template>

<script>
import GitInfo from './GitInfo';

export default {
  components: {
    GitInfo,
  },

  data() {
    return {
      git: null,
    };
  },

  mounted() {
    this.git = this.prepareGit();
  },

  methods: {
    prepareGit() {
      if (!this.$page.git) {
        return null;
      }

      return this.$page.git.author ? this.$page.git : null;
    },
  },
};
</script>

<style lang="stylus" scoped>
.playground-git-log-git-info {
  .title {
    font-weight: bold
  }
}
</style>
