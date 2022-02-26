<template>
  <div>
    <div class="container-editor">
      <textarea
        v-model="input"
        @keyup="render()"
      ></textarea>
    </div>
    <div class="container-graph">
      <div ref="graph"></div>
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
  Format1GitLogger,
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
      const logger = new Format1GitLogger();

      try {
        parser.parse(this.input);

        this.graph.clear();

        logger.create(this.graph, this.input);
      } catch (e) {
        console.log(e.message);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.container-editor {
  margin-bottom 2rem

  textarea {
    display block
    margin 0
    min-width 100%
    min-height 150px
  }
}
.container-graph {
}
</style>
