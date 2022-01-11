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
import PreparationMixin from './PreparationMixin';
import GitInfo from './GitInfo';

export default {
  mixins: [
    PreparationMixin,
  ],

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
};
</script>

<style lang="stylus" scoped>
.playground-git-log-git-info {
  .title {
    font-weight: bold
  }
}
</style>
