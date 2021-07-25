const assert = require('assert').strict;
const {SimpleExtractor} = require('../index');
const {createTextLines} = require('./utils.js');

const textLines = createTextLines([
  'aaa bbb ccc ddd',
  '124 52 boba',
  'abb ee ccc dd',
  '1025 18 nana',
  'aaa ddd'
]);

describe('SimpleExtractor', function() {
  it('should pass', function() {
    const extractor = new SimpleExtractor({
      regexes: [
        {
          flags: 'im',
          re: '^AAA (?<n>BBB) .*$',
          vars: {
            a: 'ok',
            n: 'aho'
          }
        },
        {
          re: ['^.*c', 'cc (?<name>[a-z]*)$']
        },
        {
          re: '^124 (?<num>[0-9]+) .*',
          vars: {
            'name': 'test'
          }
        }
      ]
    });
    const result = extractor.extract(textLines);
    assert.deepEqual(
      result,
      [
        {
          a: 'ok',
          n: 'bbb'
        },
        {name: 'ddd'},
        {name: 'test', num: '52'},
        {name: 'dd'}
      ]
    );
  });
});
