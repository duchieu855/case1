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
};
document.getElementById("showListEmployee").onclick = function () {
	showTable(listEmployee);
};

const elementAdd = document.getElementById("add");
const listEmployee = [];

// const valueFullName = document.getElementById("fullName");
// const valueBaseSalary = document.getElementById("baseSalary");
// const valueProductQuantity = document.getElementById("productQuantity");
// const valueProductSalary = document.getElementById("productSalary");
// const valueEmployeeID = document.getElementById("employeeID");

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

//add employee
elementAdd.onclick = function () {
	const elementInput = Array.from(document.querySelectorAll("#form1 input"));
	console.log(document.querySelectorAll("#form1 input"));
	const errorValueInput = [];
	const agrTotalSalary = [];
	const infEmployee = [];
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
		elementInput.forEach((element) => {
			infEmployee.push(element.value);
		});
		infEmployee.push(totalSalary(...agrTotalSalary));
		listEmployee.push(infEmployee);
		elementInput.map((element) => {
			element.value = "";
		});
		alert("Nhập thành công");
	} else {
		alert("vui lòng nhập lại trường " + errorValueInput);
	}
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

function showTable(arr) {
	const table = document.getElementById("listEmployee");
	table.style.display = "table";
	arr.forEach((element) => {
		console.log(element);
		let i = 0;
		const NewStaff = table.insertRow(-1);
		for (i; i < element.length; i++) {
			NewStaff.insertCell(i).innerHTML = element[i];
		}
	});
}

function sortTotalSalary(arr) {
	const arr2 = arr.slice();
	arr2.sort((a, b) => {
		return a[a.length - 1] - b[b.length - 1];
	});

	console.log(arr2);
	console.log(arr);
	return arr2;
}
document.getElementById("sortListEmployee").onclick = function () {
	showTable(sortTotalSalary(listEmployee));
};
