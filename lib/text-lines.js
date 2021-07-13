const DEFAULT_PUSH_BUFFER_SIZE = 256;

module.exports = class TextLines {
  constructor(options = {}) {
    this._lines = [[0, 0]];
    this._text = '';
    this._pushBufferSize = options.pushBufferSize || DEFAULT_PUSH_BUFFER_SIZE;
  }

  slice(start, end) {
    const result = new TextLines();
    result._pushBufferSize = this._pushBufferSize;
    result._text = this._text;
    result._lines = this._lines.slice(start, end);
    if (result._lines.length === 0) {
      result._lines = [[0, 0]];
    }
    return result;
  }

  getText() {
    return this._text;
  }

  getLines() {
    return this._lines;
  }

  getLineText(lineIndex, clean = false) {
    return this.getSubText(lineIndex, lineIndex + 1, clean);
  }

  getSubText(lineStart, lineEnd, clean = false) {
    let startOffset = this._lines[lineStart][0];
    let endOffset = startOffset;
    if (lineEnd > lineStart) {
      if (lineEnd < this._lines.length) {
        endOffset = this._lines[lineEnd][0] - 1 * (clean ? 1 : 0);
      } else {
        const lastLine = this._lines[this._lines.length - 1];
        endOffset = lastLine[0] + lastLine[1];
      }
    }
    return this._text.slice(startOffset, endOffset);
  }

  setText(text) {
    const lines = [[0, 0]];
    let index = -1;
    const buff = new Array(this._pushBufferSize);
    let buffLen = 0;
    while ((index = text.indexOf('\n', index + 1)) >= 0) {
      buff[buffLen++] = [index + 1, 0];
      if (buffLen === this._pushBufferSize) {
        lines.push(...buff);
        buffLen = 0;
      }
    }
    if (buffLen > 0) {
      lines.push(...buff.slice(0, buffLen));
    }
    for (let i = 1; i < lines.length; ++i) {
      lines[i - 1][1] = lines[i][0] - lines[i - 1][0] - 1;
    }
    if (lines.length == 1) {
      lines[0][1] = text.length;
    } else {
      const last = lines[lines.length - 1];
      const offset = last[0] + last[1];
      if (offset < text.length) {
        last[1] += text.length - offset;
      }
    }
    this._lines = lines;
    this._text = text;
  }
};
