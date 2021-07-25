const assert = require('assert').strict;
const {TextLines} = require('../index.js');
const PUSH_BUFFER_SIZE = 3;

const createTextLines = function(lines) {
  const tl = new TextLines({pushBufferSize: PUSH_BUFFER_SIZE});
  if (lines) {
    const text = lines.join('\n');
    tl.setText(text);
  }
  return tl;
};


const testLines = function(lines) {
  const count = lines.length;
  const tl = createTextLines(lines);
  const text = tl.getText();
  for (let i = 0; i < count; ++i) {
    const eol = i < count - 1 ? '\n' : '';
    assert.equal(tl.getLineText(i), lines[i] + eol);
    assert.equal(tl.getLineText(i, true), lines[i]);
  }
  assert.equal(tl.getSubText(0, lines.length), text);
  assert.equal(tl.getSubText(0, lines.length + 1), text);
  assert.equal(tl.getSubText(0, lines.length + 10), text);
  assert.equal(tl.getSubText(0, lines.length, true), text);
  assert.equal(tl.getSubText(0, lines.length + 1, true), text);
  assert.equal(tl.getSubText(0, lines.length + 10, true), text);
  for (let i = 0; i < count; ++i) {
    for (let j = i; j < count + 2; ++j) {
      const subText = tl.getSubText(i, j, true);
      const tls = tl.slice(i, j);
      assert.equal(subText, tls.getSubText(0, count + 10));
    }
  }
};

module.exports = {
  createTextLines,
  testLines
};
