document.getElementById("button").addEventListener("click", function () {
    let text = "Вы нажали на кнопку!";
    document.getElementById("demo").innerHTML = text;
});


var num_rows = 0
var num_cols = 0


function createTable() {
    var table = document.getElementById("table");
    if (table != null) {
        return
    }

    var body = '<table border="1">\n';

    for (var i = 0; i < num_rows; i++) {
        for (var j = 0; j < num_cols; j++) {
            body += '<td class=edited-cell contenteditable=\'true\' width="100">';
            body += '</td>'
        }
        body += '</tr>\n';
    }
    body += '</table>';
    document.getElementById('wrapper').innerHTML = body;
}


function saveDaysLessons() {
    var days = localStorage.getItem('days')
    var lessons = localStorage.getItem('lessons')

    if (days == null) {
        document.getElementById("demo").innerText = "Вы не ввели количество дней";
        return;
    }
    if (lessons == null) {
        document.getElementById("demo").innerText = "Вы не ввели количество пар";

        return;
    }

    document.getElementById("demo").innerText = "Вы ввели количество пар: " + lessons + " , дней: " + days;

    num_rows = lessons
    num_cols = days

    createTable();
}

function saveDays(value) {
    localStorage.setItem('days', value);
}

function saveLessons(value) {
    localStorage.setItem('lessons', value);
}

function saveTable(e) {
    var table = document.getElementById('wrapper')
    var cells = table.getElementsByClassName('edited-cell')
    var texts = []
    for (let cell of cells) {
        texts.push(cell.textContent || cell.innerText)
    }
    localStorage.setItem('member-data', JSON.stringify(texts))
    document.getElementById("demo").innerText = "Успешно сохранено";
}


function loadTable() {
    var table = document.getElementById("wrapper");
    if (table != null) {
        var cells = table.getElementsByClassName('edited-cell')
        var member = JSON.parse(localStorage.getItem('member-data'))

        var k = 0;
        if (num_rows != null && num_cols != null) {
            for (var i = 0; i < num_rows; i++) {
                for (var j = 0; j < num_cols; j++) {
                    cells[k].textContent = member[k];
                    k++;
                }
            }
        }

        document.getElementById("demo").innerText = "Успешно загружено ";
    } else {

        document.getElementById("demo").innerText = "Ничего не загружено ";
    }
}