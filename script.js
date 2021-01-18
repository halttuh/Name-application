
const namesTable = document.getElementById('names-table');
const sortNames = document.getElementById('sort-names');
const sortAmounts = document.getElementById('sort-amounts');
const sum = document.getElementById('total');

//Creating XMLHttpRequest to read the JSON file
let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

        // Parsing the JSON data
        let namesDataParsed = JSON.parse(this.responseText);

        // Creating table and appending to html
        for (let i = 0; i < namesDataParsed.names.length; i++) {
            let newName = namesDataParsed.names[i].name;
            let newAmount = namesDataParsed.names[i].amount;
        
            let newRow = document.createElement('tr');

            let newNameCell = newRow.insertCell(0);
            let newAmountCell = newRow.insertCell(1);
                     
            namesTable.appendChild(newRow);
            
            newNameCell.innerText = newName;
            newAmountCell.innerText = newAmount;
        }

        // Return the sum of amounts
        let total = 0;
        for (let i = 0; i < namesDataParsed.names.length; i++) {
            total += namesDataParsed.names[i].amount;

            sum.innerHTML = total;
        }        
    }
};

xmlhttp.open("GET", "names.json", true);
xmlhttp.send();

// Sorting table alphabetically by name
sortNames.addEventListener("click", function() {
    let rows, switching, i, x, y, shouldSwitch, dir, switchCount = 0;
    switching = true;
    dir= 'asc';

    while(switching) {
        switching = false;
        rows = namesTable.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName('td')[0];
            y = rows[i + 1].getElementsByTagName('td')[0];

            if (dir == 'asc') {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == 'desc') {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchCount ++;
        } else {
            if (switchCount == 0 && dir == 'asc') {
                dir = 'desc';
                switching = true;
            }
        }
    }

    // Changing A to Z button text
    if (dir == 'desc') {
        sortNames.innerHTML = "A to Z";
    } else {
        sortNames.innerHTML = "Z to A";
    }
})

// Sorting table by popularity
sortAmounts.addEventListener("click", function() {
    let rows, switching, i, x, y, shouldSwitch, dir, switchCount = 0;
    switching = true;
    dir= 'asc';

    while(switching) {
        switching = false;
        rows = namesTable.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName('td')[1];
            y = rows[i + 1].getElementsByTagName('td')[1];

            if (dir == 'asc') {
                if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == 'desc') {
                if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchCount ++;
        } else {
            if (switchCount == 0 && dir == 'asc') {
                dir = 'desc';
                switching = true;
            }
        }
    }

    // Changing High to low button text
    if (dir == 'desc') {
        sortAmounts.innerHTML = "Low to high";
    } else {
        sortAmounts.innerHTML = "High to low";
    }
})