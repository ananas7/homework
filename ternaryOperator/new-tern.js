let newTern = (x) => {
    if (isNaN(x)) {
        if (x !== x) {
            return 'NaN';
        } else {
            if (undefined === x) {
                return 'undefined';
            } else {
                if (isNaN(x)) {
                    return 'NaN';
                } else {
                    return 'qqq';
                }
            }
        }
    } else {
        if (x === 0) {
            return 'number';
        } else {
            if (isNaN(parseInt(x))) {
                return 'NaN';
            } else {
                return 'number';
            }
        }
    }
}
module.exports = newTern;
