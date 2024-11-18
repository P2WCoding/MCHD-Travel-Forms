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