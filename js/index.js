const hrefs = [
    {
        'task': 'appWithJson',
        'url': 'https://app-with-json-i-lomtev.c9users.io/'
    },
    {
        'task': 'dragSvg',
        'url': 'https://ananas7.github.io/homework/dragSvg/'
    },
    {
        'task': 'mathMl',
        'url': 'https://ananas7.github.io/homework/mathMl/'
    },
    {
        'task': 'parserTags',
        'url': 'https://ananas7.github.io/homework/parserTags/'
    },
    {
        'task': 'ternaryOperator',
        'url': 'https://ananas7.github.io/homework/ternaryOperator/'
    },
    {
        'task': 'parserXml',
        'url': 'https://ananas7.github.io/homework/parserXml/'
    }
];

$(document).ready(() => {
    let list = hrefs.map((e) => {
        return '<div class="row fill pad-all"><div class="row fix elem pad-item" onclick="window.open(\'' + e.url + '\')"><div class="fix pad-item">' + e.task + '</div></div></div>';
    });
    $('#list').html(list);
});
