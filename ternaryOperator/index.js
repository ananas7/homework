const tape = require('tape');
const oldTern = require('./old-tern.js');
const newTern = require('./new-tern.js');

let tests = [64, 0, -212, 0.3543, NaN, false, undefined, '37', '0', '-124', '0.353', 'NAN', 'false', 'undefined'];
tests.map((el, i) => {
    tape(`ternary test ${i}`, (assert) => {
        const oldV = oldTern(el);
		const newV = newTern(el);
        assert.equal(oldV, newV, `Input: ${el}, new: ${newV}, old: ${oldV}`);
        assert.end();
    });
});
