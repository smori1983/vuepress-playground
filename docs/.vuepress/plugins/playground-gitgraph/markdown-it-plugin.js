module.exports = (md) => {
  const fence = md.renderer.rules.fence;

  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args;
    const { content, info } = tokens[idx];

    if (info.trim() === 'gitgraph') {
      return `<PluginPlaygroundGitgraph>${content}</PluginPlaygroundGitgraph>`;
    }

    return fence(...args);
  };
};
