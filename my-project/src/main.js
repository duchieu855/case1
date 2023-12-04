import "../dist/output.css";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const leftNav = $$("li.p-2");
leftNav.forEach((navItem) => {
	navItem.onmouseover = function () {
		this.classList.add("bg-red-500");
	};
	navItem.onmouseout = function () {
		this.classList.remove("bg-red-500");
	};
});

document.getElementById("form1").addEventListener("submit", function (event) {
	event.preventDefault();
});

const showFormAdd = document.getElementById("addEmployee");
showFormAdd.onclick = function () {
	document.getElementById("divForm1").style.display = "block";
	document.getElementById("employeeID").focus();
};
document.getElementById("showListEmployee").onclick = function () {
	showTable(listEmployee);
};

const elementAdd = document.getElementById("add");
const listEmployee = [];

const valueFullName = document.getElementById("fullName");
const valueBaseSalary = document.getElementById("baseSalary");
const valueProductQuantity = document.getElementById("productQuantity");
const valueProductSalary = document.getElementById("productSalary");
const valueEmployeeID = document.getElementById("employeeID");
//add employee
elementAdd.onclick = function () {
	const elementInput = [
		valueEmployeeID,
		valueFullName,
		valueBaseSalary,
		valueProductSalary,
		valueProductQuantity,
	];
	const errorValueInput = [];
	const agrTotalSalary = [];
	const employee = {};
	// const infEmployee = [];
	elementInput.forEach((element) => {
		if (element.value === "") {
			errorValueInput.push(element.previousElementSibling.textContent);
		}
		if (
			["Base Salary", "Product Salary", "Product Quantity"].includes(
				element.previousElementSibling.textContent
			)
		) {
			agrTotalSalary.push(element.value);
		}
	});

	const validateInput = elementInput.some((element) => {
		return element.value === "";
	});
	if (!validateInput) {
		employee.id = valueEmployeeID.value;
		employee.fullname = valueFullName.value;
		employee.basesalary = valueBaseSalary.value;
		employee.productsalary = valueProductSalary.value;
		employee.productquantity = valueProductQuantity.value;
		employee.totalsalary = totalSalary(...agrTotalSalary);
		listEmployee.push(employee);
		elementInput.map((element) => {
			element.value = "";
		});
		alert("Nhập thành công");
	} else {
		alert("vui lòng nhập lại trường " + errorValueInput);
	}
	document.getElementById("employeeID").focus();
};

// const Staff0 = NewStaff.insertCell(0);
// const Staff1 = NewStaff.insertCell(1);
// const Staff2 = NewStaff.insertCell(2);
// const Staff3 = NewStaff.insertCell(3);
// const Staff4 = NewStaff.insertCell(4);
// const Staff5 = NewStaff.insertCell(5);

// // Staff0.innerHTML = valueEmployeeID.value;
// // Staff1.innerHTML = valueFullName.value;
// // Staff2.innerHTML = "$" + valueBaseSalary.value;
// // Staff3.innerHTML = valueProductSalary.value;
// // Staff4.innerHTML = valueProductQuantity.value;

//total Salary
function totalSalary(basesalary, productsalary, productquantity) {
	basesalary = Number(basesalary);
	productquantity = Number(productquantity);
	productsalary = Number(productsalary);

	let totalSalaryEmployee = 0;
	if (productquantity < 50) {
		totalSalaryEmployee = (basesalary + productquantity * productsalary) * 0.9;
	} else if (productquantity > 50) {
		totalSalaryEmployee =
			basesalary +
			productquantity * productsalary +
			(productquantity - 50) * productsalary * 0.1;
	} else {
		totalSalaryEmployee = basesalary + productquantity * productsalary;
	}
	return totalSalaryEmployee;
}
function showTable(arr) {
	if (!arr) {
		return;
	}
	const table = document.getElementById("listEmployee");
	table.style.display = "table";
	arr.forEach((element) => {
		console.log(element);
		let i = 0;
		const NewStaff = table.insertRow(-1);
		for (i; i < Object.values(element).length; i++) {
			NewStaff.insertCell(i).innerHTML = Object.values(element)[i];
		}
	});
}

function sortTotalSalary(arr) {
	const arr2 = arr.slice();
	arr2.sort((a, b) => {
		return a.totalsalary - b.totalsalary;
	});

	console.log(arr2);
	console.log(arr);
	return arr2;
}
document.getElementById("sortListEmployee").onclick = function () {
	showTable(sortTotalSalary(listEmployee));
};

function sortMaxTotalSalary(arr) {
	const arr2 = arr.slice();
	arr2.sort((a, b) => {
		return a.totalsalary - b.totalsalary;
	});
	const result = arr2.filter(
		(employee) => employee.totalsalary === arr2[arr2.length - 1].totalsalary
	);
	return result;
}

document.getElementById("listEmployeeHightTotal").onclick = function () {
	showTable(sortMaxTotalSalary(listEmployee));
};

function removeEmployee(arr, index) {
	const arr2 = arr.slice();
	if (!arr2.some((employee) => employee.id === index)) {
		alert(`Không có nhân viên có mã số ${index}`);
		return false;
	}
	const result = arr2.filter((employee) => {
		if (employee.id !== index) {
			return true;
		}
		return false;
	});
	alert(`Bạn đã xóa thành công nhân viên có mà số là ${index}`);
	console.log(result);
	return result;
}
document.getElementById("remove").onclick = function () {
	const valueID = document.getElementById("removeEmployee").value;
	if (valueID === "") {
		alert("Bạn chưa nhập mã số nhân viên!");
		document.getElementById("removeEmployee").focus();
		return;
	}

	document.getElementById("removeEmployee").value = "";
	// removeEmployee(listEmployee, valueID);
	showTable(removeEmployee(listEmployee, valueID));
};
