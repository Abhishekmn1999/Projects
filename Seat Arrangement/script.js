document.addEventListener("DOMContentLoaded", function () {
    // Function to update the table with vacant seat counts
    function updateTable() {
        const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S'];
        const totalSeatsCell = document.getElementById('totalVacantSeats');

        let totalVacantSeats = 0;

        rows.forEach(row => {
            const rowClassName = `row${row.toLowerCase()}`;
            const vacantSeatCount = document.querySelectorAll(`.${rowClassName} .vacant`).length;

            // Update total vacant seats
            totalVacantSeats += vacantSeatCount;

            // Update table row with vacant seat count
            const rowElement = document.createElement('tr');
            rowElement.innerHTML = `<td>${row}</td><td>${vacantSeatCount}</td>`;
            totalSeatsCell.parentElement.insertAdjacentElement('beforebegin', rowElement);
        });

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
