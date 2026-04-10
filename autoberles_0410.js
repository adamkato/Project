const searchInput = document.getElementById("search");
const filter = document.getElementById("filter");
const cars = document.querySelectorAll(".car-card");

function updateCars() {
    const search = searchInput.value.toLowerCase();
    const filterValue = filter.value;

    cars.forEach(car => {
        const name = car.dataset.name;
        const price = parseInt(car.dataset.price);

        let visible = true;

        // keresés
        if (!name.includes(search)) {
            visible = false;
        }

        // szűrés
        if (filterValue === "low" && price > 10000) {
            visible = false;
        }

        if (filterValue === "high" && price <= 10000) {
            visible = false;
        }

        car.style.display = visible ? "block" : "none";
    });
}

searchInput.addEventListener("input", updateCars);
filter.addEventListener("change", updateCars);