const showAddModal = () => {
  document.getElementById("form_header").innerHTML = "Add Customer";

  $("#addEmployeeModal").toggleClass("show");
};

const closeAddModal = () => {
  $("#addEmployeeModal").removeClass("show");
  resetFormData();
};
const showUpdataModal = () => {
  document.getElementById("form_header").innerHTML = "Update Customer";

  $("#addEmployeeModal").toggleClass("show");
};
const closeUpdataModal = () => {
  $("#editEmployeeModal").removeClass("show");
};
const showDeleteModal = () => {
  $("#deleteEmployeeModal").toggleClass("show");
};
const closeDeleteModal = () => {
  $("#deleteEmployeeModal").removeClass("show");
};

let selectedRow = null;
const onFormSubmit = () => {
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
    showUserCount();
  }
};
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
const insertNewData = (data) => {
  let table = document
    .getElementById("listTable")
    .getElementsByTagName("tbody")[0];

  //   console.log(table.length);
  let newRow = table.insertRow(0);
  col1 = newRow.insertCell(0);
  col1.innerHTML +=
    "<span class='custom-checkbox'>" +
    "<input type='checkbox' id='checkbox12' />" +
    "<label for='checkbox1'></label>";
  ("</span>");
  col2 = newRow.insertCell(1);
  col2.innerHTML =
    `<span id="profileImage" style="color:rgb(110, 110, 235)"></span><span class="fullName">` +
    data.uName +
    `</span>`;
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
};
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
  console.log(document.getElementById("phone").value);
  document.getElementById("uName").value =
    selectedRow.cells[1].children[1].innerHTML;
  document.getElementById("mail").value = selectedRow.cells[2].innerHTML;
  document.getElementById("phone").value = selectedRow.cells[3].innerHTML;
  document.getElementById("country").value = selectedRow.cells[4].innerHTML;
  document.getElementById("status").value = selectedRow.cells[5].innerHTML;
  document.getElementById("orders").value = selectedRow.cells[6].innerHTML;
  console.log(document.getElementById("phone").value);

  console.log(selectedRow);
};
const updateData = (data) => {
  selectedRow.cells[1].innerHTML =
    `<span id="profileImage" style="color:rgb(110, 110, 235)"></span><span class="fullName">` +
    data.uName +
    `</span>`;
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
    showUserCount();
  }
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
  return isValid;
};
//delete selected rows
document.getElementById("delete").addEventListener("click", () => {
  let tableRef = document.getElementById("listTable");
  let tableRows = tableRef.rows;
  let checkedIndexes = [];
  for (var i = 1; i < tableRows.length; i++) {
    let checkboxSelected =
      tableRows[i].cells[0].children[0].children[0].checked;
    if (checkboxSelected) {
      checkedIndexes.push(i);
    }
  }

  for (let k = checkedIndexes.length - 1; k >= 0; k--) {
    tableRef.deleteRow(checkedIndexes[k]);
  }
  closeDeleteModal();
  showUserCount();
});

const showUserCount = () => {
  let tableRef = document.getElementById("listTable");
  let tableRows = tableRef.rows;
  let userCount = tableRows.length - 1;

  document.getElementById("customerCount").innerHTML = userCount;
};
// document.getElementById("notification").addEventListener("click", () => {
//   console.log("noti");
//   $("#notification >ul").toggleClass("show_notification");
// });

// const showNotification = () => {
//   $(".show_notification").toggleClass("show_notification");
// };
