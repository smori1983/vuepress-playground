<template>
  <div>
    <div class="box container-editor">
      <div class="container-title">Input</div>
      <textarea
        v-model="input"
        @keyup="render()"
      ></textarea>
      <div
        class="error-message"
        v-if="errorMessage"
      >{{ errorMessage }}</div>
    </div>
    <div class="box container-result">
      <div class="container-graph">
        <div class="container-title">Graph (SVG)</div>
        <div ref="graph"></div>
      </div>
      <div class="container-ast">
        <div class="container-title">AST</div>
        <pre class="ast">{{ ast }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import { sprintf } from 'sprintf-js';
import {
  GitLogger,
  Format2Parser,
} from 'gitgraph-minigram';

import graphDefaultMixin from 'vuepress-plugin-gitgraph-minigram/src/components/mixin/graphDefault';

export default {
  mixins: [
    graphDefaultMixin,
  ],

  data() {
    return {
      parser: null,
      logger: null,
      input:
        '[option]\n' +
        'defaultBranch: master\n' +
        '[log]\n' +
        'git commit -m \'initial commit\'\n' +
        'git commit -m \'1\'\n' +
        'git checkout -b feature/1\n' +
        'git commit -m \'2\'\n' +
        'git commit -m \'3\'\n' +
        'git checkout master\n' +
        'git merge feature/1\n' +
        'git tag v1.0.0\n',
      errorMessage: '',
      ast: '',
      graph: null,
    };
  },

  mounted() {
    this.parser = new Format2Parser();
    this.logger = new GitLogger();

    const container = this.$refs['graph'];
    this.graph = this.createGraph(container);

    this.render();
  },

  methods: {
    render() {
      this.errorMessage = '';
      this.ast = '';
      this.graph.clear();

      const parseResult = this.parser.parse(this.input);

      if (!parseResult.parsed()) {
        const parseError = parseResult.getError();

        this.errorMessage = sprintf(
          '%s (line: %d)',
          parseError.message,
          parseError.location.start.line,
        );

        return;
      }

      this.ast = JSON.stringify(parseResult.getParseData().dump(), null, 2);

      try {
        this.logger.create(this.graph, parseResult.getParseData());
      } catch (e) {
        this.errorMessage = e.message;
        this.ast = '';
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
$gitgraphFontSize = 15px

.box {
  margin-bottom 2rem
}

.container-title {
  font-weight bold
  margin-bottom 1rem
}

.container-editor {
  textarea {
    display block
    margin 0
    min-width 100%
    min-height 150px
    font-size $gitgraphFontSize
  }
  .error-message {
    color: red;
  }
}
.container-result {
  display flex

  .container-graph {
    width 60%
  }
  .container-ast {
    width 40%

    .ast {
      margin 0
      padding 0.5rem
      border 1px solid gray
      background-color white
      color black
      font-size $gitgraphFontSize
    }
  }
}
</style>
