<template>
  <div class="playground-view-source">
    <pre class="source">{{ source }}</pre>
  </div>
</template>

<script>
import { Base64} from 'js-base64';

export default {
  data() {
    return {
      source: '',
    };
  },
  mounted() {
    this.source = Base64.decode(this.$slots.default[0].text);
  }
};
</script>

<style lang="stylus" scoped>
.playground-view-source {
  .source {
    background-color #2d2d2d
    color: white
  }
}
</style>
