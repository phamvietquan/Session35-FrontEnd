let employeeList = JSON.parse(localStorage.getItem("employeeList")) || [];
let currentPage = 1;
let perPage = 3;
let users = [];

// hàm hiển thị
function renderEmployee() {
  let tbody = document.getElementById("employee-list");
  tbody.innerHTML = "";
  let start = (currentPage - 1) * perPage;
  let end = start + perPage;
  users = employeeList.slice(start, end);
  users.forEach((element, index) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `<td>${start + index + 1}</td>
              <td>${element.name}</td>
              <td>${element.position}</td>`;
    tbody.appendChild(tr);
  });
}
// hiểm thị số trang
function renderPageNumber() {
  let ul = document.getElementById("pagination");
  ul.innerHTML = "";

  let totalPage = Math.ceil(employeeList.length / perPage);
  ul.innerHTML += `<li onclick="prePage()" style="width:70px">Previous</li>`;
  for (let i = 1; i <= totalPage; i++) {
    ul.innerHTML += `<li onclick="changePage(${i})" style="background-color: ${
      i === currentPage ? "#007bff" : "transparent"
    };
    color: ${i === currentPage ? "#fff" : "#000"}">${i}</li>`;
  }
  ul.innerHTML += `<li onclick="nextPage()" style="width:50px">Next</li>`;
}
function changePage(page) {
  let totalPage = Math.ceil(employeeList.length / perPage);
  if (page < 1 || page > totalPage) return;
  currentPage = page;
  renderEmployee();
  renderPageNumber();
}
function prePage() {
  if (currentPage > 1) {
    currentPage--;
    renderEmployee();
    renderPageNumber();
  }
}
function nextPage() {
  let totalPage = Math.ceil(employeeList.length / perPage);
  if (currentPage < totalPage) {
    currentPage++;
    renderEmployee();
    renderPageNumber();
  }
}
// hàm thêm mới nhân viên
function addEmployee(e) {
  e.preventDefault();
  let inputName = document.getElementById("name").value.trim();
  let inputPosition = document.getElementById("position").value.trim();
  if (inputName || inputPosition) {
    employeeList.push({
      name: inputName,
      position: inputPosition,
    });
    localStorage.setItem("employeeList", JSON.stringify(employeeList));
    document.getElementById("name").value = "";
    document.getElementById("position").value = "";
    let totalPage = Math.ceil(employeeList.length / perPage);
    currentPage = totalPage;
    renderEmployee();
    renderPageNumber();
  } else {
    alert("Mời bạn nhập đầy đủ thông tin");
  }
}

renderEmployee();
renderPageNumber();
