// Vehicle data
let vehicles = [
    {
        id: "V001",
        type: "Car",
        brand: "Toyota",
        model: "Corolla",
        rate: 2000,
        available: true
    },
    {
        id: "V002",
        type: "Bike",
        brand: "Honda",
        model: "Shine",
        rate: 800,
        available: true
    },
    {
        id: "V003",
        type: "Van",
        brand: "Ford",
        model: "Transit",
        rate: 3000,
        available: true
    }
];


// Display vehicles
function showVehicles() {

    const vehicleList = document.getElementById("vehicle-list");

    vehicleList.innerHTML = "";

    vehicles.forEach(function(vehicle) {

        const card = document.createElement("div");

        card.className = "vehicle-card";

        card.innerHTML = `
            <h3>${vehicle.brand} ${vehicle.model}</h3>
            <p>Vehicle ID: ${vehicle.id}</p>
            <p>Type: ${vehicle.type}</p>
            <p>Rental Rate: ₹${vehicle.rate}/day</p>
            <p>Status: ${vehicle.available ? "Available" : "Rented"}</p>

            ${
                vehicle.available
                ? `<button onclick="selectVehicle('${vehicle.id}')">Book Now</button>`
                : ""
            }
        `;

        vehicleList.appendChild(card);
    });
}


// Show vehicles when page loads
showVehicles();


// Search vehicles
function searchVehicles() {

    const type =
        document.getElementById("searchType").value.toLowerCase();

    const brand =
        document.getElementById("searchBrand").value.toLowerCase();

    const vehicleList =
        document.getElementById("vehicle-list");

    vehicleList.innerHTML = "";

    vehicles.forEach(function(vehicle) {

        const typeMatch =
            type === "" ||
            vehicle.type.toLowerCase() === type;

        const brandMatch =
            brand === "" ||
            vehicle.brand.toLowerCase() === brand;

        if (typeMatch && brandMatch && vehicle.available) {

            const card = document.createElement("div");

            card.className = "vehicle-card";

            card.innerHTML = `
                <h3>${vehicle.brand} ${vehicle.model}</h3>
                <p>Vehicle ID: ${vehicle.id}</p>
                <p>Type: ${vehicle.type}</p>
                <p>Rental Rate: ₹${vehicle.rate}/day</p>
                <p>Status: Available</p>
                <button onclick="selectVehicle('${vehicle.id}')">
                    Book Now
                </button>
            `;

            vehicleList.appendChild(card);
        }
    });
}


// Select vehicle for booking
function selectVehicle(vehicleId) {

    document.getElementById("vehicleId").value = vehicleId;

    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });
}


// Booking
document.getElementById("bookingForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const customerName =
            document.getElementById("customerName").value;

        const vehicleId =
            document.getElementById("vehicleId").value;

        const days =
            parseInt(document.getElementById("days").value);

        const vehicle = vehicles.find(
            v => v.id.toUpperCase() === vehicleId.toUpperCase()
        );

        const message =
            document.getElementById("bookingMessage");

        if (!vehicle) {

            message.textContent = "Vehicle not found.";
            return;
        }

        if (!vehicle.available) {

            message.textContent = "Vehicle is already rented.";
            return;
        }

        const rentalCost = vehicle.rate * days;

        const deposit = 1000;

        vehicle.available = false;

        message.textContent =
            "Booking successful! Customer: " +
            customerName +
            " | Rental Cost: ₹" +
            rentalCost +
            " | Security Deposit: ₹" +
            deposit;

        showVehicles();

        document.getElementById("bookingForm").reset();
    }
);


// Return vehicle
document.getElementById("returnForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const vehicleId =
            document.getElementById("returnVehicleId").value;

        const actualDays =
            parseInt(document.getElementById("actualDays").value);

        const vehicle = vehicles.find(
            v => v.id.toUpperCase() === vehicleId.toUpperCase()
        );

        const message =
            document.getElementById("returnMessage");

        if (!vehicle) {

            message.textContent = "Vehicle not found.";
            return;
        }

        const scheduledDays = 3;

        const lateDays =
            Math.max(0, actualDays - scheduledDays);

        const penalty = lateDays * 200;

        const deposit = 1000;

        const refund =
            Math.max(0, deposit - penalty);

        vehicle.available = true;

        message.textContent =
            "Vehicle returned successfully. " +
            "Late Penalty: ₹" + penalty +
            " | Deposit Refund: ₹" + refund;

        showVehicles();

        document.getElementById("returnForm").reset();
    }
);