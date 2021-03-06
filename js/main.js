var list = [];

function getTotal(list) {
  var total = 0;
  for (var key in list) {
    total += list[key].value * list[key].amount;
  }

  document.getElementById("totalValue").innerHTML = formatValue(total);
}

function setList(list) {
  var table = '<thead><tr><td>ID</td><td>Nazwa produktu</td><td>Ilość</td><td>Cena</td><td>Operacje</td></tr></thead><tbody>';
  for (var key in list) {
    table += '<tr><td>' + (parseInt(key) + 1) + '</td><td>' + formatDesc(list[key].desc) + '</td><td>' + parseInt(list[key].amount) + '</td><td>' + formatValue(list[key].value) + '</td><td><button class="btn btn-default" onclick="setUpdate(' + key + ');" >Edytuj</button>  <button class="btn btn-default" onclick="deleteData(' + key + ');" >Usuń</button></td></tr>';
  }
  table += '</tbody>';
  document.getElementById("listTable").innerHTML = table;
  getSelectedRow();
  getTotal(list);
  saveListStorage(list);

}

function formatDesc(desc) {
  var str = desc.toLowerCase();
  str = str.charAt(0).toUpperCase() + str.slice(1);
  return str;
}


function formatValue(value) {
  var str = parseFloat(value).toFixed(2) + "";
  str = str.replace(".", ",");
  str = str + " ZŁ";
  return str;
}

function addData() {
  if (!validation()) {
    return;
  }
  var desc = document.getElementById("desc").value;
  var amount = document.getElementById("amount").value;
  var value = document.getElementById("value").value;

  list.unshift({
    "desc": desc,
    "amount": amount,
    "value": value
  });
  setList(list);
}

function setUpdate(id) {
  var obj = list[id];
  document.getElementById("desc").value = obj.desc;
  document.getElementById("amount").value = obj.amount;
  document.getElementById("value").value = obj.value;
  document.getElementById("btnUpdate").style.display = "inline-block";
  document.getElementById("btnAdd").style.display = "none";

  document.getElementById("inputIDUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="' + id + '">';
}

function resetForm() {
  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("value").value = "";
  document.getElementById("btnUpdate").style.display = "none";
  document.getElementById("btnAdd").style.display = "inline-block";
  document.getElementById("inputIDUpdate").innerHTML = "";
  document.getElementById("errors").style.display = "none";
}

function updateData() {
  if (!validation()) {
    return;
  }
  var id = document.getElementById("idUpdate").value;
  var desc = document.getElementById("desc").value;
  var amount = document.getElementById("amount").value;
  var value = document.getElementById("value").value;

  list[id] = {
    "desc": desc,
    "amount": amount,
    "value": value
  };
  resetForm();
  setList(list);
}

function deleteData(id) {
  if (id === list.length - 1) {
    list.pop();
  } else if (id === 0) {
    list.shift();
  } else {
    var arrStart = list.slice(0, id);
    var arrEnd = list.slice(id + 1);
    list = arrStart.concat(arrEnd);
  }
  setList(list);
}

function validation() {
  var desc = document.getElementById("desc").value;
  var amount = document.getElementById("amount").value;
  var value = document.getElementById("value").value;
  var errors = "";
  document.getElementById("errors").style.display = "none";
  if (desc === "") {
    errors += '<p>Uzupełnij nazwę produktu</p>';
  }
  if (amount === "") {
    errors += '<p>Wpisz ilość</p>';
  } else if (amount != parseInt(amount)) {
    errors += '<p>Wpisz prawidłowową ilość</p>';
  }
  if (value === "") {
    errors += '<p>Wpisz cenę</p>';
  } else if (value != parseFloat(value)) {
    errors += '<p>Wpisz prawidłową cenę</p>';
  }

  if (errors != "") {
    document.getElementById("errors").style.display = "block";
    document.getElementById("errors").style.backgroundColor = "rgba(85, 85, 85, 0.3)";
    document.getElementById("errors").style.color = "white";
    document.getElementById("errors").style.padding = "10px";
    document.getElementById("errors").style.margin = "10px";
    document.getElementById("errors").style.borderRadius = "13px";

    document.getElementById("errors").innerHTML = "<h3>Error:</h3>" + errors;
    return 0;
  } else {
    return 1;
  }

}

function deleteList() {
  if (confirm("Czy na pewno chcesz usunąć wszystko?")) {
    list = [];
    setList(list);
  }
}

function saveListStorage(list) {
  var jsonStr = JSON.stringify(list);
  localStorage.setItem("list", jsonStr);
}

function initListStorage() {
  var testList = localStorage.getItem("list");
  if (testList) {
    list = JSON.parse(testList);
  }
  setList(list);
}
initListStorage();
var index;

function getSelectedRow() {
  index = undefined;
  var table = document.getElementById("listTable");
  for (var i = 1; i < table.rows.length; i++) {
    table.rows[i].onclick = function() {
      if (typeof index !== "undefined") {
        table.rows[index].classList.toggle("selected");
      }

      index = this.rowIndex;
      this.classList.toggle("selected");

    };
  }

}


getSelectedRow();


function upNdown(direction) {
  var rows = document.getElementById("listTable").rows,
    parent = rows[index].parentNode;
  if (direction === "up") {
    if (index > 1) {
      parent.insertBefore(rows[index], rows[index - 1]);
      index--;
    }
  }

  if (direction === "down") {
    if (index < rows.length - 1) {
      parent.insertBefore(rows[index + 1], rows[index]);
      index++;
    }
  }
}

function getCurrentTime() {
  var d = new Date();
  var nd = d.toLocaleDateString('pl-PL')
  document.getElementById("time").innerHTML = nd;
}
setInterval('getCurrentTime()', 1000);
