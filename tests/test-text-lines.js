const assert = require('assert').strict;
const {createTextLines, testLines} = require('./utils.js');

describe('TextLines', function() {
  it('should correctly be constructed', function() {
    const tl = createTextLines();
    assert.equal(tl.getText(), '');
    assert.equal(tl.getLineText(0), '');
    assert.equal(tl.getLineText(0, true), '');
    assert.deepEqual(tl.getLines(), [[0, 0]]);
  });

  it('should correctly set with an empty text', function() {
    const tl = createTextLines();
    tl.setText('');
    assert.equal(tl.getText(), '');
    assert.deepEqual(tl.getLines(), [[0, 0]]);
    assert.equal(tl.getLineText(0), '');
    assert.equal(tl.getLineText(0, true), '');
    assert.equal(tl.getSubText(0, 0), '');
    assert.equal(tl.getSubText(0, 0, true), '');
    assert.equal(tl.getSubText(0, 5), '');
    assert.equal(tl.getSubText(0, 5, true), '');
    const slice1 = tl.slice(0, 0);
    assert.equal(slice1.getText(), '');
    assert.deepEqual(slice1.getLines(), [[0, 0]]);
    assert.equal(slice1.getLineText(0), '');
    assert.equal(slice1.getLineText(0, true), '');
    const slice2 = tl.slice(0, 10);
    assert.equal(slice2.getText(), '');
  });

  it('should correctly set with a non empty line without new line', function() {
    const tl = createTextLines();
    tl.setText('test line');
    assert.equal(tl.getText(), 'test line');
    assert.deepEqual(tl.getLines(), [[0, 9]]);
    assert.equal(tl.getSubText(0, 0), '');
    assert.equal(tl.getSubText(0, 0, true), '');
    assert.equal(tl.getSubText(0, 1), 'test line');
    assert.equal(tl.getSubText(0, 1, true), 'test line');
    assert.equal(tl.getSubText(0, 7), 'test line');
    assert.equal(tl.getSubText(0, 7, true), 'test line');
    const slice1 = tl.slice(0, 0);
    assert.equal(slice1.getText(), 'test line');
    assert.deepEqual(slice1.getLines(), [[0, 0]]);
    assert.equal(slice1.getLineText(0), '');
    assert.equal(slice1.getLineText(0, true), '');
    const slice2 = tl.slice(0, 1);
    assert.equal(slice2.getText(), 'test line');
  });

  it(
    'should correctly set with a non empty line with a new line at the end',
    function() {
      const tl = createTextLines();
      tl.setText('test line2\n');
      assert.equal(tl.getText(), 'test line2\n');
      assert.deepEqual(tl.getLines(), [[0, 10], [11, 0]]);
      assert.equal(tl.getLineText(0), 'test line2\n');
      assert.equal(tl.getLineText(0, true), 'test line2');
      assert.equal(tl.getLineText(1), '');
      assert.equal(tl.getLineText(1, true), '');

      assert.equal(tl.getSubText(0, 0), '');
      assert.equal(tl.getSubText(0, 0, true), '');
      assert.equal(tl.getSubText(0, 1), 'test line2\n');
      assert.equal(tl.getSubText(0, 1, true), 'test line2');
      assert.equal(tl.getSubText(1, 2), '');
      assert.equal(tl.getSubText(1, 2, true), '');
      assert.equal(tl.getSubText(0, 7), 'test line2\n');
      assert.equal(tl.getSubText(0, 7, true), 'test line2\n');

      const slice1 = tl.slice(0, 0);
      assert.equal(slice1.getText(), 'test line2\n');
      assert.deepEqual(slice1.getLines(), [[0, 0]]);
      assert.equal(slice1.getLineText(0), '');
      assert.equal(slice1.getLineText(0, true), '');
      assert.equal(slice1.getSubText(0, 0), '');
      assert.equal(slice1.getSubText(0, 0, true), '');
      assert.equal(slice1.getSubText(0, 1), '');
      assert.equal(slice1.getSubText(0, 1, true), '');

      const slice2 = tl.slice(0, 3);
      assert.equal(slice2.getText(), 'test line2\n');
      assert.deepEqual(slice2.getLines(), [[0, 10], [11, 0]]);
      assert.equal(slice2.getLineText(0), 'test line2\n');
      assert.equal(slice2.getLineText(0, true), 'test line2');
      assert.equal(slice2.getLineText(1), '');
      assert.equal(slice2.getLineText(1, true), '');
      assert.equal(slice2.getSubText(0, 0), '');
      assert.equal(slice2.getSubText(0, 0, true), '');
      assert.equal(slice2.getSubText(0, 1), 'test line2\n');
      assert.equal(slice2.getSubText(0, 1, true), 'test line2');
      assert.equal(slice2.getSubText(1, 1), '');
      assert.equal(slice2.getSubText(1, 1, true), '');
      assert.equal(slice2.getSubText(1, 4), '');
      assert.equal(slice2.getSubText(1, 4, true), '');
    }
  );


  it(
    'should correctly set with multiple lines',
    function() {
      testLines([]);
      testLines(['']);
      testLines(['', '']);
      testLines(['', '', '']);
      testLines(['', '', '', '']);
      testLines(['', '', '', '', '', '', '', '', '', '', '', '', '', '', '']);
      testLines(['a']);
      testLines(['this is the test line']);
      testLines(['', '', 'this is the test line', '', '']);
      testLines(['a', 'b', 'c']);
      testLines(['a', '', 'c']);

      testLines([
        'first line',
        '',
        'vvvvvveeeeeeeeeerrrrrrrrryyyyyyyyyyy lllllllloooooonnnnnggggg line',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'asdf',
        '0123456789 0123456789 0123456789 0123456789',
        '         ',
        'aaa bbb ccc ddd',
        '',
        'eeeeeee ffffffff',
        '**** *** ****** ****** ******'
      ]);
    }
  );
});
