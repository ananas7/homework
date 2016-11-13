function parserTages(str) {
    let status = true;
    let stack = '';
    for (let i = 0; i < str.length; ++i) {
        switch (str[i]) {
            case '[':
            case '{':
            case '(':
            case '<': {
                stack += str[i];
                break;
            }
            case ']': {
                [status, stack] = checkRightClosing(status, stack, '[');
                break;
            }
            case '}': {
                [status, stack] = checkRightClosing(status, stack, '{');
                break;
            }
            case ')': {
                [status, stack] = checkRightClosing(status, stack, '(');
                break;
            }
            case '>': {
                [status, stack] = checkRightClosing(status, stack, '<');
                break;
            }
            default:
                break;
        }
    }
    if (stack.length == 0 && status) {
        console.log('Good string: ', str);
    } else {
        console.log('Bad string:', str);
    }
}
function checkRightClosing(status, stack, bracket) {
    if (stack.length == 0) {
        status = false;
    } else if (stack[stack.length - 1] == bracket) {
        stack = stack.substring(0, stack.length - 1);
    }
    return [status, stack];
}
const bad = '{[]()}({}))';
parserTages(bad); // Bad string
const good = '{{}[({})]()}(({})){}';
parserTages(good); // Good string
