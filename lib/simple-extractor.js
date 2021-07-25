const DEFAULT_REGEX_FLAGS = 'm';

module.exports = class SimpleExtractor {
  constructor(options = {}) {
    this._options = options;
    this._reArray = this._getReArray();
  }

  extract(textLines) {
    const result = [];
    const lineCount = textLines.getLines().length;
    for (let i = 0; i < lineCount; ++i) {
      const lineText = textLines.getLineText(i, true);
      for (const reElement of this._reArray) {
        const match = lineText.match(reElement.re);
        if (match) {
          result.push({
            ...reElement.vars,
            ...match.groups
          });
        }
      }
    }
    return result;
  }

  _getReArray() {
    const result = [];
    const reArray = this._options.regexes;
    if (!reArray) {
      throw new Error('No \'regexes\' field found in options');
    }
    if (!Array.isArray(reArray)) {
      throw new Error('Array type expected in the \'regexes\' options field');
    }
    for (const re of reArray) {
      const flags = re.flags || DEFAULT_REGEX_FLAGS;
      let regexStr = re.re;
      if (Array.isArray(re.re)) {
        regexStr = re.re.join('');
      }
      const vars = re.vars || {};
      result.push({
        re: new RegExp(regexStr, flags),
        vars
      });
    }
    return result;
  }
};
