export default {
  methods: {
    prepareGit() {
      if (this.$page.git) {
        return this.$page.git.author ? this.$page.git : null;
      }

      return null;
    },
  },
};
