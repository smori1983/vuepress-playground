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

    const master = graph.branch('master');
    master.commit('initial commit');

    const feature1 = master.branch('feature/1');
    const feature2 = master.branch('feature/2');

    feature1.commit('1');
    feature2.commit('2');
    feature1.commit('3');
    feature2.commit('4');

    master.merge(feature1);
    master.tag('v1.0.0');

    const hotfix1 = master.branch('hotfix/1');

    hotfix1.commit('5');

    master.merge(hotfix1);
    master.tag('v1.0.1');
  },
};
</script>
