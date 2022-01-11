module.exports = (md) => {
  md.core.ruler.push('plugin_playground_git_log', ((state) => {
    const token1 = new state.Token('hr', 'hr', 0);
    token1.markup = '-----';
    token1.block = true;

    const token2 = new state.Token('html_block', '', 0);
    token2.content = '<PluginPlaygroundGitLogPageBlock/>';
    token2.block = true;

    state.tokens.push(token1);
    state.tokens.push(token2);
  }));
};
