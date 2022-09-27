const { Base64 } = require('js-base64');

const marker = '[[source]]';

module.exports = (md) => {
  md.block.ruler.before('paragraph', 'playground_view_source', blockRule);
};

const blockRule = (state, startLine, endLine, silent) => {
  const lineText = state.src.slice(state.bMarks[startLine], state.eMarks[startLine]);

  if (lineText !== marker) {
    return false;
  }

  state.line = startLine + 1;

  const encoded = Base64.encode(state.src);

  const token = new state.Token('html_block', '', 0);
  token.map = [startLine, state.line];
  token.content = `<PlaygroundViewSourceDefault>${encoded}</PlaygroundViewSourceDefault>`;
  token.block = true;

  state.tokens.push(token);

  return true;
};
