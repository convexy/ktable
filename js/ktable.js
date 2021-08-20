class KTable {
    #table
    #colheader
    #body
    #columns
    #data
    constructor(option) {
        this.#table = document.getElementById(option.id);
        this.#table.classList.add("ktable");
        this.reset();
        option.columns.unshift({ name: "" });
        this.#columns = option.columns;
        option.columns[1].name = option.columns[1].name + "<input type='checkbox' checked='checked'>"

        option.columns.forEach(column => {
            this.#colheader.firstChild.innerHTML += "<th>" + column.name + "</th>";
        });
        this.#colheader.firstChild.firstChild.classList.add("rh");
    }
    reset() {
        this.#table.innerHTML = "";
        this.#colheader = document.createElement("thead");
        this.#colheader.innerHTML = "<tr></tr>";
        this.#table.appendChild(this.#colheader);
        this.#body = document.createElement("tbody");
        this.#table.appendChild(this.#body);
        this.#data = [];
    }
    addRow(arr) {
        let html = "<tr>";
        html += "<th class='rh' onclick='b2(this);'></th>";
        this.#data.push(arr);
        arr.forEach((value, colIdx) => {
            if (colIdx == 0) {
                if (arr[colIdx]) {
                    html += "<td><input type='checkbox' onclick='c(this);' checked='checked'></td>"
                }
                else {
                    html += "<td><input type='checkbox' onclick='c(this);'></td>"
                }
            }
            else {
                html += "<td>" + value + "</td>";
            }
        });
        html += "</tr>";
        this.#body.innerHTML += html;
    }
    get Data() {
        return this.#data;
    }
}

function c(cb) {
    if (cb.checked) {
        cb.parentNode.parentNode.childNodes.forEach(td => console.log(td.innerText));
    }
    else {
        console.log("unchecked");
    }
}


function b2(cell) {
    cell.innerText = "▶";
    cell.parentNode.classList.add("selected");
}

