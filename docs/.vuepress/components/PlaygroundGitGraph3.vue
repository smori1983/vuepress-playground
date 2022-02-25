<template>
  <div>
    <div ref="graph-container"></div>
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

import sampleInput from './sample-input';
import { Format1GitLogger } from 'gitgraph-minigram';

export default {
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

    const graph = createGitgraph(container, {
      template: customTemplate,
      branchLabelOnEveryCommit: true,

      responsive: false,
    });

    const logger = new Format1GitLogger();

    try {
      logger.create(graph, sampleInput);
    } catch (e) {
      console.log(e.message);
    }
  },
};
</script>
