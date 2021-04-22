var list = [];

function setList(list) {
  var table = '<thead><tr><td>Nazwa produktu</td><td>Ilość</td><td>Cena</td><td>Operacje</td></tr></thead><tbody>';
  for (var key in list) {
    table += '<tr><td>' + list[key].desc + '</td><td>' + list[key].amount + '</td><td>' + list[key].value + '</td><td><button class="btn btn-default" onclick="setUpdate(' + key + ');" >Edytuj</button>  <button class="btn btn-default" onclick="deleteData(' + key + ');" >Usuń</button></td></tr>';
  }
  table += '</tbody>';
  document.getElementById("listTable").innerHTML = table;
  saveListStorage(list);
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

function deleteData(id) {
  if (id === list.length - 1) {
    list.pop();
  } else if (id === 0) {
    list.shift();
  } else {
    var arrAuxIni = list.slice(0, id);
    var arrAuxEnd = list.slice(id + 1);
    list = arrAuxIni.concat(arrAuxEnd);
  }
  setList(list);
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

function saveListStorage(list) {
  var jsonStr = JSON.stringify(list);
  localStorage.setItem("list", jsonStr);
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

function initListStorage() {
  var testList = localStorage.getItem("list");
  if (testList) {
    list = JSON.parse(testList);
  }
  setList(list);
}
initListStorage();
