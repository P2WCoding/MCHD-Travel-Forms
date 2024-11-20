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
		
		document.addEventListener("DOMContentLoaded", function() {
			const links = document.querySelectorAll(".navbar a");
			links.forEach(link => {
				if (link.href === window.location.href) {
					link.style.fontWeight = "bold";
					link.style.textDecoration = "underline";
				}
			});
		});
