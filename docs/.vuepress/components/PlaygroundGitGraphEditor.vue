<template>
  <div>
    <div class="box container-editor">
      <div class="container-title">Input</div>
      <textarea
        v-model="input"
        @keyup="render()"
      ></textarea>
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
import {
  templateExtend,
  MergeStyle,
  TemplateName,
} from '@gitgraph/core';

import {
  createGitgraph,
} from '@gitgraph/js';

import {
  GitLogger,
  Format1Parser,
} from 'gitgraph-minigram';

export default {
  data() {
    return {
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
      graph: null,
      ast: '',
    };
  },

  mounted() {
    const container = this.$refs['graph'];

    const customTemplate = templateExtend(TemplateName.Metro, {
      branch: {
        lineWidth: 2,
        mergeStyle: MergeStyle.Bezier,
        spacing: 20,
      },
      commit: {
        message: {
          displayAuthor: false,
          displayHash: false,
        },
        dot: {
          size: 4,
        },
        spacing: 40,
      },
    });

    this.graph = createGitgraph(container, {
      template: customTemplate,
      branchLabelOnEveryCommit: true,
      responsive: false,
    });

    this.render();
  },

  methods: {
    render() {
      const parser = new Format1Parser();
      const logger = new GitLogger();

      const parseResult = parser.parse(this.input);

      if (parseResult.parsed()) {
        this.graph.clear();
        this.ast = JSON.stringify(parseResult.getParseData(), null, 2);

        logger.create(this.graph, parseResult.getParseData());
      } else {
        console.log(parseResult.getError().message);
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
