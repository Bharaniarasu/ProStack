function showAddModal() {
  document.getElementById("form_header").innerHTML = "Add Customer";

  $("#addEmployeeModal").toggleClass("show"); //see here usage
}

function closeAddModal() {
  $("#addEmployeeModal").removeClass("show"); //see here usage
  resetFormData();
}
const showUpdataModal = () => {
  document.getElementById("form_header").innerHTML = "Update Customer";

  $("#addEmployeeModal").toggleClass("show"); //see here usage
};
const closeUpdataModal = () => {
  $("#editEmployeeModal").removeClass("show"); //see here usage
};
let selectedRow = null;
function onFormSubmit() {
  console.log("Submit triggered..........");

  if (doValidate()) {
    let formData = readFormData();
    if (selectedRow == null) {
      insertNewData(formData);
    } else {
      updateData(formData);
    }
    console.log(formData);

    resetFormData();
    closeAddModal();
  }
}
const readFormData = () => {
  let formData = {};
  formData["uName"] = document.getElementById("uName").value;
  formData["mail"] = document.getElementById("mail").value;
  formData["phone"] = document.getElementById("phone").value;
  formData["country"] = document.getElementById("country").value;
  formData["status"] = document.getElementById("status").value;
  formData["orders"] = document.getElementById("orders").value;
  return formData;
};
function insertNewData(data) {
  let table = document
    .getElementById("listTable")
    .getElementsByTagName("tbody")[0];

  //   console.log(table.length);
  let newRow = table.insertRow(0);
  col1 = newRow.insertCell(0);
  col1.innerHTML +=
    "<span class='custom-checkbox'>" +
    "<input type='checkbox' id='checkbox1' name='options[]' value='1' />" +
    "<label for='checkbox1'></label>";
  ("</span>");
  col2 = newRow.insertCell(1);
  col2.innerHTML = data.uName;
  col3 = newRow.insertCell(2);
  col3.innerHTML = data.mail;
  col4 = newRow.insertCell(3);
  col4.innerHTML = data.phone;
  col5 = newRow.insertCell(4);
  col5.innerHTML = data.country;
  col6 = newRow.insertCell(5);
  col6.innerHTML = data.status;
  col7 = newRow.insertCell(6);
  col7.innerHTML = data.orders;
  col8 = newRow.insertCell(7);
  col8.innerHTML = ` <td>
                        <a
                          href="#editEmployeeModal"
                          class="edit"
                          data-toggle="modal"
                          onClick=onEdit(this)
                        >
                          <i
                            class="material-icons"
                            data-toggle="tooltip"
                            title="Edit"
                            ></i
                          ></a
                        >
                        <a
                          href="#deleteEmployeeModal"
                          class="delete"
                          data-toggle="modal"
                          onClick="onDelete(this)"
                        >
                          <i
                            class="material-icons"
                            data-toggle="tooltip"
                            title="Delete"
                            ></i
                          ></a
                        >
                      </td> `;
}
const resetFormData = () => {
  document.getElementById("uName").value = "";
  document.getElementById("mail").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("country").value = "";
  document.getElementById("status").value = "";
  document.getElementById("orders").value = "";
  selectedRow = null;
};
const onEdit = (td) => {
  showUpdataModal();
  selectedRow = td.parentElement.parentElement;
  //   document.getElementById("").value = selectedRow.cells[0].innerHTML;

  document.getElementById("uName").value = selectedRow.cells[1].innerHTML;
  document.getElementById("mail").value = selectedRow.cells[2].innerHTML;
  document.getElementById("phone").value = selectedRow.cells[3].innerHTML;
  document.getElementById("country").value = selectedRow.cells[4].innerHTML;
  document.getElementById("status").value = selectedRow.cells[5].innerHTML;
  document.getElementById("orders").value = selectedRow.cells[6].innerHTML;
  console.log(selectedRow);
};
const updateData = (data) => {
  selectedRow.cells[1].innerHTML = data.uName;
  selectedRow.cells[2].innerHTML = data.mail;
  selectedRow.cells[3].innerHTML = data.phone;
  selectedRow.cells[4].innerHTML = data.country;
  selectedRow.cells[5].innerHTML = data.status;
  selectedRow.cells[6].innerHTML = data.orders;
};
const onDelete = (tr) => {
  if (confirm("Are you sure to delete this Customer data ?")) {
    row = tr.parentElement.parentElement;

    document.getElementById("listTable").deleteRow(row.rowIndex);
    resetFormData();
  }
};
const multipleDelete = (tr) => {
  let tbody = document
    .getElementById("listTable")
    .getElementsByTagName("tbody")[0];
  let trLength = tbody.children.length;

  for (let i = 0; i <= trLength; i++) {
    document.getElementById();
  }
  row = tr.parentElement.parentElement;
  console.log(row);
};
const onSearch = () => {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("listTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
};

const doValidate = () => {
  isValid = true;
  let uName = document.getElementById("uName").value;
  if (uName.length < 1) {
    isValid = false;
    document.getElementById("nameValidateError").classList.remove("hide");
  } else {
    isValid = true;
    if (
      !document.getElementById("nameValidateError").classList.contains("hide")
    ) {
      document.getElementById("nameValidateError").classList.add("hide");
    }
  }
  console.log(isValid);
  return isValid;
};
