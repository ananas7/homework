const parser = require('xml2js').parseString;
const tape = require('tape');
const fs = require('fs');
const jsonfile = require('jsonfile');
const xml = 'data.xml';
const json = 'data.json';
const dataForTest = require('./data.json');
const write = false; // change on true for write to file

function parseXml() {
    fs.readFile(xml, 'utf8', (err, data) => {
        if (err) {
            return console.log(err);
        }
        parser(data, test);
    });
}
function test(err, result) {
    tape('Object length test', assert => {
        const right = result.USERS.USER.length;
        const testable = 9;
        assert.equal(right, testable, `| testable: ${testable}, correct: ${right}`);
        assert.end();
    });
    tape('Random element test 1', assert => {
        const right = result.USERS.USER[0].LOGIN[0];
        const testable = 'admin';
        assert.equal(right, testable, `| testable: ${testable}, correct: ${right}`);
        assert.end();
    });
    tape('Random element test 2', assert => {
        const right = result.USERS.USER[8].EMAIL[0];
        const testable = 'din@gmail.com';
        assert.equal(right, testable, `| testable: ${testable}, correct: ${right}`);
        assert.end();
    });
    tape('Random element test 3', assert => {
        const right = result.USERS.USER[7].PASSWORD[0];
        const testable = 'lol';
        assert.equal(right, testable, `| testable: ${testable}, correct: ${right}`);
        assert.end();
    });
    if (write) {
        jsonfile.writeFile(json, result, {spaces: 4}, err => {
            console.error(err)
        });
    }
};
test(null, dataForTest);
// parseXml();
