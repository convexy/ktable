(function () {
  let head = document.getElementsByTagName("head")[0];
  let link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  link.setAttribute("href", "ktable.css");
  head.appendChild(link);
})();

class KTable {
  #table
  #values
  #selected
  constructor(id) {
    this.#table = document.getElementById(id);
    if (!this.#table) {
      console.log("No table tag with id='" + id + "' was found.");
      return;
    }
    this.#table.classList.add("ktable");
    this.#selected = new Array();

    let me = this;
    this.#table.addEventListener("click", function (e) {
      if (e.path[3].id == id) {
        let cell = e.path[0];
        let rowIndex = e.path[2].rowIndex;
        let columnIndex = e.path[1].columnIndex;
        console.log(e.path);
        console.log(rowIndex, columnIndex);
        if (rowIndex == 0) {
          if (columnIndex == 0) {
            console.log("rc");
            me.#table.childNodes.forEach(row => {
              row.childNodes.forEach(tcell => {
                let cell2 = tcell.firstChild;
                me.#selected.push(cell2);
                cell2.style.backgroundColor = "lightskyblue";
              });
            });
          }
          else {
            console.log("r");
            me.#table.childNodes.forEach(row => {
              let cell2 = row.childNodes[columnIndex].firstChild;
              me.#selected.push(cell2);
              cell2.style.backgroundColor = "lightskyblue";
            });
          }
        }
        else {
          if (columnIndex == 0) {
            console.log("c");
            me.#table.childNodes[rowIndex].forEach(tcell => {
              let cell2 = tcell.firstChild;
              me.#selected.push(cell2);
              cell2.style.backgroundColor = "lightskyblue";
            });
          }
          else {
            me.#selected.push(cell);
            cell.style.backgroundColor = "lightskyblue";
          }
        }
      }
    });

    document.addEventListener("keyup", function (e) {
      if (e.code == "Escape") {
        me.#selected.forEach(cell => {
          cell.style.backgroundColor = "";
        });
        me.#selected.length = 0;
      }
    });

    this.setColumns([
      { name: "Column1" },
      { name: "Column2" },
      { name: "Column3" },
      { name: "Column4" },
      { name: "Column5" },
    ]);

    this.addRow(["Value11", "Value12", "Value13", "Value14", "Value15"]);
    this.addRow(["Value21", "Value22", "Value23", "Value24", "Value25"]);


  }
  setColumns(cols) {
    this.#values = new Array();

    this.#values.push(new Array(cols.length + 1));
    let tr = document.createElement("tr");
    
    this.#values[0].push("　");
    let th = document.createElement("th");
    let div = document.createElement("div");
    div.innerText = "　";
    th.appendChild(div);
    tr.appendChild(th);
    cols.forEach(col => {
      this.#values[0].push(col.name);
      let th = document.createElement("th");
      let div = document.createElement("div");
      div.innerText = col.name;
      th.appendChild(div);
      tr.appendChild(th);
    });
    this.#table.appendChild(tr);
  }
  addRow(array) {
    let rowNo = this.#values.length;
    let rowData = [rowNo].concat(array);
    this.#values.push(rowData);
    let tr = document.createElement("tr");
    let ch = true;
    rowData.forEach(val => {
      let td = document.createElement(ch ? "th" : "td");
      let div = document.createElement("div");
      div.innerText = val;
      td.appendChild(div);
      tr.appendChild(td);
      ch = false;
    });
    this.#table.appendChild(tr);
  }
}
