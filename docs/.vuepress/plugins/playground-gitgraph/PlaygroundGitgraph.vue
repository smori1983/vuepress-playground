<template>
  <div>
    <div ref="graph"></div>

    <div
      class="error"
      v-if="error"
    >
      <div class="message">
        {{ error }}
      </div>
      <div class="input">
        <pre>{{ input }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import { sprintf } from 'sprintf-js';
import {
  MergeStyle,
  templateExtend,
  TemplateName,
} from "@gitgraph/core";
import { createGitgraph } from "@gitgraph/js";
import { Format1GitLogger } from 'gitgraph-minigram';

export default {
  data() {
    return {
      input: '',
      error: '',
    };
  },

  mounted() {
    if (!this.$slots.default) {
      return;
    }

    const input = this.$slots.default[0].text;

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

    const graph = createGitgraph(container, {
      template: customTemplate,
      branchLabelOnEveryCommit: true,
      responsive: false,
    });

    const logger = new Format1GitLogger();

    try {
      logger.create(graph, input);
    } catch (e) {
      this.error = sprintf(
        '%s (line: %d, offset: %d)',
        e.message,
        e.location.start.line,
        e.location.start.offset
      );
      this.input = input;
      graph.clear();
    }
  },
};
</script>

<style lang="stylus" scoped>
.error {
  .message {
    color #ff5555
  }
  .input pre {
    border 1px solid #ff5555
    background-color white
    color black
    padding 10px
  }
}
</style>
