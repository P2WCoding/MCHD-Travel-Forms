// Show modal
function showModal() {
    document.getElementById("instructionsModal").style.display = "flex";
}

// Close modal
function closeModal() {
    document.getElementById("instructionsModal").style.display = "none";
}

// Calculate Mileage
function calculateMileage() {
    const miles = parseFloat(document.getElementById('miles').value) || 0;
    const mileageRate = parseFloat(document.getElementById('mileageRate').value) || 0;
    const personalMileage = miles * mileageRate;
    document.getElementById('personalMileage').innerText = personalMileage.toFixed(2);
    document.getElementById('expenseMileage').innerText = personalMileage.toFixed(2);
    calculateTotalExpense();
}

function navigateToForm(formPage) {
    window.location.href = formPage;
}

function addDay() {
	const tableBody = document.getElementById('mealTableBody');
	const newRow = document.createElement('tr');
	newRow.classList.add('bordered', 'bg-gray-200'); // Adds gray background
	newRow.innerHTML = `
		<td class="bordered p-2"><input type="date" class="border p-2 w-full" onchange="calculateAllMeals()"></td>
		<td class="bordered p-2"><input type="number" class="border p-2 w-full" value="0" oninput="calculateMealPerDiem(this.closest('tr'))"></td>
		<td class="bordered p-2"><input type="number" class="border p-2 w-full" value="0" oninput="calculateMealPerDiem(this.closest('tr'))"></td>
		<td class="bordered p-2"><input type="number" class="border p-2 w-full" value="0" oninput="calculateMealPerDiem(this.closest('tr'))"></td>
		<td class="bordered p-2"><input type="number" class="border p-2 w-full" value="0" oninput="calculateMealPerDiem(this.closest('tr'))"></td>
		<td class="bordered p-2 text-center"><span class="totalPerDay">0</span></td>
	`;

	tableBody.appendChild(newRow);
}

function removeDay() {
	const tableBody = document.getElementById('mealTableBody');
	if (tableBody.rows.length > 1) {  // Prevent removing all rows
		tableBody.deleteRow(tableBody.rows.length - 1);
		calculateTotalMealPerDiem(); // Update the total meal per diem after removing a day
	}
}

function calculateMealPerDiem(inputElement) {
	const row = inputElement.closest('tr');
	const rowDate = new Date(row.cells[0].querySelector('input').value);
	const departDate = new Date(document.getElementById('dateDeparting').value);
	const returnDate = new Date(document.getElementById('dateReturning').value);

	const isFirstOrLastDay = (rowDate.getTime() === departDate.getTime()) || (rowDate.getTime() === returnDate.getTime());

	const breakfast = parseFloat(row.cells[1].querySelector('input').value) || 0;
	const lunch = parseFloat(row.cells[2].querySelector('input').value) || 0;
	const dinner = parseFloat(row.cells[3].querySelector('input').value) || 0;
	const incidentals = parseFloat(row.cells[4].querySelector('input').value) || 0;

// Apply 75% rate if it's the first or last day
	const dailyTotal = isFirstOrLastDay 
		? (breakfast * 0.75) + (lunch * 0.75) + (dinner * 0.75) + (incidentals * 0.75)
		: breakfast + lunch + dinner + incidentals;

	row.querySelector('.totalPerDay').innerText = dailyTotal.toFixed(2);

	calculateTotalMealPerDiem();
}

function calculateTotalMealPerDiem() {
	let totalMealPerDiem = 0;
	document.querySelectorAll('.totalPerDay').forEach(cell => {
		totalMealPerDiem += parseFloat(cell.innerText) || 0;
	});
	document.getElementById('totalMealPerDiem').innerText = totalMealPerDiem.toFixed(2);
	document.getElementById('expenseMealPerDiem').innerText = totalMealPerDiem.toFixed(2);
	calculateTotalExpense();
}

function calculateMileage() {
	const miles = parseFloat(document.getElementById('miles').value) || 0;
	const mileageRate = parseFloat(document.getElementById('mileageRate').value) || 0;
	const personalMileage = miles * mileageRate;
	document.getElementById('personalMileage').innerText = personalMileage.toFixed(2);
	document.getElementById('expenseMileage').innerText = personalMileage.toFixed(2);
	calculateTotalExpense();
}

function calculateLodging() {
	const nights = parseFloat(document.getElementById('nights').value) || 0;
	const dailyRate = parseFloat(document.getElementById('dailyRate').value) || 0;
	const totalLodging = nights * dailyRate;
	document.getElementById('totalLodging').innerText = totalLodging.toFixed(2);
	document.getElementById('expenseLodging').innerText = totalLodging.toFixed(2);
	calculateTotalExpense();
}

function calculateTotalCashAdvance() {
// Fetch values from each Cash Advance input field
	const cashAdvanceMileage = parseFloat(document.getElementById('cashAdvanceMileage').value) || 0;
	const cashAdvanceMealPerDiem = parseFloat(document.getElementById('cashAdvanceMealPerDiem').value) || 0;
	const cashAdvanceLodging = parseFloat(document.getElementById('cashAdvanceLodging').value) || 0;
	const cashAdvanceRental = parseFloat(document.getElementById('cashAdvanceRental').value) || 0;
	const cashAdvanceAirfare = parseFloat(document.getElementById('cashAdvanceAirfare').value) || 0;
	const cashAdvanceRegistration = parseFloat(document.getElementById('cashAdvanceRegistration').value) || 0;
	const cashAdvanceParking = parseFloat(document.getElementById('cashAdvanceParking').value) || 0;
	const cashAdvanceOtherTransportation = parseFloat(document.getElementById('cashAdvanceOtherTransportation').value) || 0;
	const cashAdvanceOtherExpenses = parseFloat(document.getElementById('cashAdvanceOtherExpenses').value) || 0;

// Sum up all cash advance amounts
	const totalCashAdvance = cashAdvanceMileage + cashAdvanceRental + cashAdvanceMealPerDiem + cashAdvanceAirfare + cashAdvanceLodging + cashAdvanceRegistration + cashAdvanceParking + cashAdvanceOtherTransportation + cashAdvanceOtherExpenses;
	document.getElementById('totalCashAdvance').innerText = totalCashAdvance.toFixed(2);
}

function calculateTotalExpense() {
// Fetch values from each input field in the Expense column
	const mileage = parseFloat(document.getElementById('personalMileage').innerText) || 0;
	const rentalVehicle = parseFloat(document.getElementById('rentalVehicle').value) || 0;
	const airfare = parseFloat(document.getElementById('airfare').value) || 0;
	const registrationFee = parseFloat(document.getElementById('registrationFee').value) || 0;
	const mealPerDiem = parseFloat(document.getElementById('expenseMealPerDiem').innerText) || 0;
	const lodging = parseFloat(document.getElementById('expenseLodging').innerText) || 0;
	const parking = parseFloat(document.getElementById('parking').value) || 0;
	const otherTransportation = parseFloat(document.getElementById('otherTransportation').value) || 0;
	const otherExpenses = parseFloat(document.getElementById('otherExpenses').value) || 0;

// Sum up all expenses
	const totalExpense = mileage + rentalVehicle + airfare + registrationFee + mealPerDiem + lodging + parking + otherTransportation + otherExpenses;
	document.getElementById('totalExpense').innerText = totalExpense.toFixed(2);

// Also update cash advance totals in case cash advance fields have changed
	calculateTotalCashAdvance();
}
		
function showModal() {
	document.getElementById("instructionsModal").style.display = "flex";
}
        
function closeModal() {
	document.getElementById("instructionsModal").style.display = "none";
}

// Function to reset form fields on page load
window.onload = function() {
	document.querySelectorAll("input[type='text'], input[type='number'], input[type='date'], input[type='time']").forEach(input => input.value = '');
	document.querySelectorAll("input[type='checkbox']").forEach(input => input.checked = false);
	document.querySelectorAll("span").forEach(span => span.innerText = '0');
};

// Function to enable print button when name and date are filled
function checkSignature() {
	const name = document.getElementById("signatureName").value.trim();
	const date = document.getElementById("signatureDate").value;
	const printButton = document.getElementById("printButton");

// Enable print button only if both name and date fields are filled
	printButton.disabled = !(name && date);
}

// Function to trigger print
function triggerPrint() {
	window.print();
}

// Ensure the print button is disabled initially
window.onload = function() {
	checkSignature(); // Call to set the initial state of the print button
};
		
function printForm() {
	const signature = document.querySelector('input[type="text"][required]').value;
	const signatureDate = document.querySelector('input[type="date"][required]').value;
	if (signature && signatureDate) {
		window.print();
	} else {
		alert('Please fill in the signature and date before printing.');
	}
}

function getMileageRate() {
	return parseFloat(document.getElementById("mileageRate").value) || 0.67;
}

function autoResizeTextArea(element) {
	element.style.height = 'auto';
	element.style.height = element.scrollHeight + 'px';
}

function calculateMileageAmount(input) {
	const miles = parseFloat(input.value) || 0;
	const mileageAmount = miles * getMileageRate();
	input.closest('tr').querySelector('.mileageAmount').innerText = `$${mileageAmount.toFixed(2)}`;
}

function calculatePerDiem(row) {
	const rows = Array.from(row.closest('tbody').rows);
	const isFirstRow = row === rows[0];
	const isLastRow = row === rows[rows.length - 1];

// Select the per diem fields based on their class for reliability
	const perDiemColumns = row.querySelectorAll('.perDiem'); 
	const perDiemTotal = Array.from(perDiemColumns).reduce((acc, el) => acc + (parseFloat(el.value) || 0), 0);
	const multiplier = (isFirstRow || isLastRow) ? 0.75 : 1;
	const totalPerDay = perDiemTotal * multiplier;
	row.querySelector('.totalPerDay').innerText = `$${totalPerDay.toFixed(2)}`;
}

function calculateTotals() {
	const rows = document.querySelectorAll("#expenseTableBody tr");
	let totalMileage = 0;
	let totalPerDay = 0;

	rows.forEach(row => {
		calculateMileageAmount(row.querySelector('input[type="number"]'));
		calculatePerDiem(row);

		const mileageText = row.querySelector('.mileageAmount').innerText;
		const mileageAmount = parseFloat(mileageText.replace('$', '')) || 0;
		totalMileage += mileageAmount;

		const totalPerDayText = row.querySelector('.totalPerDay').innerText;
		const totalDayAmount = parseFloat(totalPerDayText.replace('$', '')) || 0;
		totalPerDay += totalDayAmount;
	});

	document.getElementById("totalMileage").innerText = `$${totalMileage.toFixed(2)}`;
	document.getElementById("totalPerDay").innerText = `$${totalPerDay.toFixed(2)}`;
	document.getElementById("totalDueEmployee").innerText = `$${(totalMileage + totalPerDay).toFixed(2)}`;
}

function addDay() {
	const tableBody = document.getElementById('expenseTableBody');
	const newRow = document.createElement('tr');
	newRow.innerHTML = `
		<td><input type="date" required></td>
		<td><textarea rows="1" oninput="autoResizeTextArea(this)" required></textarea></td>
		<td><textarea rows="1" oninput="autoResizeTextArea(this)" required></textarea></td>
		<td><input type="number" value="0" oninput="calculateTotals()" required></td>
		<td><span class="mileageAmount">$0.00</span></td>
		<td><input type="number" class="perDiem" value="0" oninput="calculateTotals()"></td>
		<td><input type="number" class="perDiem" value="0" oninput="calculateTotals()"></td>
		<td><input type="number" class="perDiem" value="0" oninput="calculateTotals()"></td>
		<td><input type="number" class="perDiem" value="0" oninput="calculateTotals()"></td>
		<td><input type="number" class="perDiem" value="0" oninput="calculateTotals()"></td>
		<td><span class="totalPerDay">$0.00</span></td>
	`;
	tableBody.appendChild(newRow);
	calculateTotals(); // Recalculate totals after adding a row
}

function removeDay() {
	const tableBody = document.getElementById('expenseTableBody');
	if (tableBody.rows.length > 1) {
		tableBody.deleteRow(-1);
		calculateTotals(); // Recalculate totals after removing a row
	}
}

// Attach an event listener to recalculate totals whenever there is an input, change, or click event
	document.querySelector('form').addEventListener('input', calculateTotals);
	document.querySelector('form').addEventListener('click', calculateTotals);
	document.querySelector('form').addEventListener('change', calculateTotals);

// Attach an event listener to the mileage rate to recalculate totals when it's updated
	document.getElementById("mileageRate").addEventListener("input", calculateTotals);
			
function showModal() {
	document.getElementById("instructionsModal").style.display = "flex";
}

function closeModal() {
	document.getElementById("instructionsModal").style.display = "none";
}