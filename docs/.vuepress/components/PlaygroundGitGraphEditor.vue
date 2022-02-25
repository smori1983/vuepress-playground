<template>
  <div>
    <div
      class="graph-container"
      ref="graph-container"
    ></div>
    <textarea
      class="graph-editor"
      rows="20"
      cols="50"
      v-model="input"
      @keyup="render()"
    ></textarea>
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
      input: '[option]\ndefaultBranch: master\n[log]\ngit commit -m \'initial commit\'\n',
      graph: null,
    };
  },

  mounted() {
    const container = this.$refs['graph-container'];

    const customTemplate = templateExtend(TemplateName.Metro, {
      branch: {
        lineWidth: 5,
        mergeStyle: MergeStyle.Bezier,
        spacing: 40,
      },
      commit: {
        message: {
          displayAuthor: false,
          displayHash: false,
        },
        dot: {
          size: 10,
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
.graph-container {
  width 55%
  float left
}
.graph-editor {
  width 40%
  display block
}
</style>
