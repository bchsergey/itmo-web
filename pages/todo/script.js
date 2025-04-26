let numRows = 0;
let numCols = 0;

function saveDays(value) {
    localStorage.setItem('days', value);
    numCols = parseInt(value);
    generateTable();
}

function saveLessons(value) {
    localStorage.setItem('lessons', value);
    numRows = parseInt(value);
    generateTable();
}

function generateTable() {
    const wrapper = document.getElementById('wrapper');

    wrapper.innerHTML = '';

    if (numRows <= 0 || numCols <= 0) {
        return;
    }

    const table = document.createElement('div');
    table.className = 'table-container';
    table.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;

    for (let i = 0; i < numRows; i++) {
        const row = document.createElement('div');
        row.className = 'table-row';

        for (let j = 0; j < numCols; j++) {
            const cell = document.createElement('div');
            cell.className = 'table-item';
            cell.contentEditable = 'true';
            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    wrapper.appendChild(table);

    const editableCells = document.querySelectorAll('.table-item');
    editableCells.forEach(cell => {
        cell.addEventListener('input', saveData);
    });

    loadTable();
}

function saveData() {
    const cells = document.querySelectorAll('.table-item');
    const tableData = Array.from(cells).map(cell => cell.textContent);
    localStorage.setItem('tableData', JSON.stringify(tableData));
}

function loadTable() {
    const tableData = JSON.parse(localStorage.getItem('tableData'));
    if (tableData && tableData.length > 0) {
        let index = 0;
        const cells = document.querySelectorAll('.table-item');
        cells.forEach(cell => {
            if (index < tableData.length) {
                cell.textContent = tableData[index];
                index++;
            }
        });
    }
}

function clearTable() {
    const tableContainer = document.getElementsByClassName('table-container');
    tableContainer[0].innerHTML = '';

    localStorage.removeItem('tableData');
    localStorage.setItem('lessons', 1);
    numRows = 1;
    localStorage.setItem('days', 5);
    numCols = 5;
    generateTable();
}

window.onload = function () {
    let savedDays = localStorage.getItem('days');
    let savedLessons = localStorage.getItem('lessons');

    console.log(savedDays)
    console.log(savedLessons)

    if (savedDays == null) {
        savedDays = 5;
    }

    if (savedLessons == null) {
        savedLessons = 1;
    }


    numCols = parseInt(savedDays);
    numRows = parseInt(savedLessons);

    generateTable();
};