
// Chapter 1 - Car Data (Arrays and Objects)

const cars = [
    {
        title: "Lamborghini Huracan",
        image: "images/lamborghini.png",
        category: "Supercar",
        description: "An Italian supercar known for its aggressive design and powerful V10 engine.",
        year: 2023,
        horsepower: 631,
        rating: 9.5,
        favorite: false
    },
    {
        title: "Nissan GT-R R35",
        image: "images/nissan.png",
        category: "Sports",
        description: "A Japanese performance car known for its advanced technology and all-wheel drive.",
        year: 2024,
        horsepower: 565,
        rating: 9.4,
        favorite: false
    },
    {
        title: "Porsche 911 GT3 RS",
        image: "images/porsche.png",
        category: "Sports",
        description: "A high-performance Porsche designed for speed and track driving.",
        year: 2023,
        horsepower: 518,
        rating: 9.8,
        favorite: false
    },
    {
        title: "BMW M4 Competition",
        image: "images/bmw.png",
        category: "Luxury",
        description: "A luxury sports coupe combining comfort, style, and performance.",
        year: 2024,
        horsepower: 503,
        rating: 9.2,
        favorite: false
    },
    {
        title: "McLaren 720S",
        image: "images/mclaren.png",
        category: "Supercar",
        description: "A British supercar featuring lightweight construction and a twin-turbo V8 engine.",
        year: 2022,
        horsepower: 710,
        rating: 9.7,
        favorite: false
    },
    {
        title: "Ferrari 488 GTB",
        image: "images/ferrari.png",
        category: "Supercar",
        description: "An Italian sports car featuring a twin-turbo V8 engine and racing-inspired design.",
        year: 2020,
        horsepower: 661,
        rating: 9.6,
        favorite: false
    }
];

// Chapter 2 - Selecting HTML Elements

const gallery = document.getElementById("gallery");
const details = document.getElementById("details");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const filterButtons = document.querySelectorAll(".filter-btn");
const favoritesBtn = document.getElementById("favoritesBtn");

let currentCategory = "All";
let showFavorites = false;

// Chapter 3 - Display Gallery Dynamically

function displayCars(carList) {

    gallery.innerHTML = "";

    if (carList.length === 0) {
        gallery.innerHTML = "<p>No cars found.</p>";
        return;
    }

    carList.forEach(function(car) {

        const card = document.createElement("div");
        card.classList.add("car-card");

        card.innerHTML = `
            <img src="${car.image}" alt="${car.title}" loading="lazy">

            <div class="car-info">
                <h2>${car.title}</h2>

                <p class="category">${car.category}</p>

                <p>${car.description}</p>

                <p>Year: ${car.year}</p>

                <p>Rating: ${car.rating}/10</p>

                <button class="details-btn">View Details</button>

                <button class="favorite-btn">
                    ${car.favorite ? "★ Favorited" : "☆ Add Favorite"}
                </button>
            </div>
        `;

        // Chapter 4 - Click Events

        card.querySelector(".details-btn").addEventListener("click", function() {
            showDetails(car);
        });

        card.querySelector(".favorite-btn").addEventListener("click", function() {
            car.favorite = !car.favorite;
            updateGallery();
        });

        gallery.appendChild(card);

    });

}

// Chapter 5 - View Additional Details

function showDetails(car) {

    details.style.display = "block";

    details.innerHTML = `
        <h2>${car.title}</h2>
        <p><strong>Category:</strong> ${car.category}</p>
        <p><strong>Year:</strong> ${car.year}</p>
        <p><strong>Horsepower:</strong> ${car.horsepower} HP</p>
        <p><strong>Rating:</strong> ${car.rating}/10</p>
        <p><strong>Description:</strong> ${car.description}</p>
        <button id="closeDetails">Close Details</button>
    `;

    document.getElementById("closeDetails").addEventListener("click", function() {
        details.style.display = "none";
    });

    details.scrollIntoView({ behavior: "smooth" });

}

// Chapter 6 - Filter Cars by Category

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        currentCategory = button.dataset.category;

        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        updateGallery();

    });

});

// Chapter 7 - Search Functionality

searchInput.addEventListener("input", function() {
    updateGallery();
});

// Chapter 8 - Sorting Options

sortSelect.addEventListener("change", function() {
    updateGallery();
});

// Chapter 9 - Favorites System

favoritesBtn.addEventListener("click", function() {

    showFavorites = !showFavorites;

    favoritesBtn.textContent = showFavorites ? "Show All Cars" : "Show Favorites";

    updateGallery();

});

// Chapter 10 - Update Gallery

function updateGallery() {

    let filteredCars = [...cars];

    if (currentCategory !== "All") {
        filteredCars = filteredCars.filter(function(car) {
            return car.category === currentCategory;
        });
    }

    const searchText = searchInput.value.toLowerCase();

    filteredCars = filteredCars.filter(function(car) {
        return car.title.toLowerCase().includes(searchText) ||
               car.description.toLowerCase().includes(searchText);
    });

    if (showFavorites) {
        filteredCars = filteredCars.filter(function(car) {
            return car.favorite;
        });
    }

    if (sortSelect.value === "az") {
        filteredCars.sort(function(a, b) {
            return a.title.localeCompare(b.title);
        });
    }

    if (sortSelect.value === "rating") {
        filteredCars.sort(function(a, b) {
            return b.rating - a.rating;
        });
    }

    displayCars(filteredCars);

}

// Chapter 11 - Start Gallery

displayCars(cars);
