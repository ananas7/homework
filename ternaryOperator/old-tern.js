let oldTern = x=> isNaN(x) ? (x !== x ? 'NaN' : (undefined === x ? 'undefined' : (isNaN(x) ? 'NaN' : 'qqq'))) : (x === 0 ? 'number' : (isNaN(parseInt(x)) ? 'NaN' : 'number'));
module.exports = oldTern;
