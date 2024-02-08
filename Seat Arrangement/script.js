document.addEventListener("DOMContentLoaded", function () {
    // Function to update the table with vacant seat counts
    function updateTable() {
        const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S'];
        const tableBody = document.querySelector('tbody');
        const totalSeatsCell = document.getElementById('totalVacantSeats');

        let totalVacantSeats = 0;

        // Clear previous data
        tableBody.innerHTML = '';

        // Create top heading row
        const topHeadingRow = document.createElement('tr');
        topHeadingRow.innerHTML = `<th>Row</th><th>Vacant Seats</th>`;
        tableBody.appendChild(topHeadingRow);

        // Update vacant seats for each row
        rows.forEach(row => {
            const rowClassName = `row${row.toLowerCase()}`;
            const vacantSeatCount = document.querySelectorAll(`.${rowClassName} .vacant`).length;

            // Update total vacant seats
            totalVacantSeats += vacantSeatCount;

            // Update table row with vacant seat count
            const rowElement = document.createElement('tr');
            rowElement.innerHTML = `<td>${row}</td><td>${vacantSeatCount}</td>`;
            tableBody.appendChild(rowElement);
        });

        // Create row for total vacant seats
        const totalSeatsRow = document.createElement('tr');
        totalSeatsRow.innerHTML = `<td class="bold">Total Vacant Seats</td><td class="bold">${totalVacantSeats}</td>`;
        tableBody.appendChild(totalSeatsRow);

        // Update the total vacant seats at the top of the table
        totalSeatsCell.textContent = totalVacantSeats;
    }

    // Function to toggle seat status (booked/vacant)
    function toggleSeatStatus(seat) {
        seat.classList.toggle('vacant');
        seat.classList.toggle('booked');
    }

    // Event listener for seat clicks
    document.querySelectorAll('.seat').forEach(seat => {
        seat.addEventListener('click', function () {
            toggleSeatStatus(this);
            updateTable();
        });
    });

    // Initial update of the table
    updateTable();
});
