document.addEventListener("DOMContentLoaded", () => {

    const carsList = document.getElementById("cars-list");

    const cartBtn = document.getElementById("cartBtn");
    const favBtn = document.getElementById("favBtn");

    const cartPanel = document.getElementById("cartPanel");
    const favPanel = document.getElementById("favPanel");
    const backdrop = document.getElementById("backdrop");

    const cartItemsEl = document.getElementById("cartItems");
    const favItemsEl = document.getElementById("favItems");

    const cartCountEl = document.getElementById("cartCount");
    const favCountEl = document.getElementById("favCount");
    const totalEl = document.getElementById("total");

    let cart = [];
    let favs = [];

    // PANEL NYITÁS
    function openPanel(panel) {
        panel.classList.add("open");
        backdrop.classList.add("show");
    }

    function closePanels() {
        cartPanel.classList.remove("open");
        favPanel.classList.remove("open");
        backdrop.classList.remove("show");
    }

    cartBtn.addEventListener("click", () => openPanel(cartPanel));
    favBtn.addEventListener("click", () => openPanel(favPanel));
    backdrop.addEventListener("click", closePanels);

    // RENDER KOSÁR
    function renderCart() {
        cartItemsEl.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;

            const div = document.createElement("div");
            div.className = "item";
            div.innerHTML = `
                <h4>${item.name}</h4>
                <p>${item.price} Ft / nap</p>
                <button onclick="removeCart(${index})">Törlés</button>
            `;
            cartItemsEl.appendChild(div);
        });

        cartCountEl.textContent = cart.length;
        totalEl.textContent = total;
    }

    // RENDER KEDVENC
    function renderFavs() {
        favItemsEl.innerHTML = "";

        favs.forEach((name, index) => {
            const div = document.createElement("div");
            div.className = "item";
            div.innerHTML = `
                <h4>${name}</h4>
                <button onclick="removeFav(${index})">Törlés</button>
            `;
            favItemsEl.appendChild(div);
        });

        favCountEl.textContent = favs.length;
    }

    // REMOVE FUNCTIONS (globál)
    window.removeCart = (i) => {
        cart.splice(i, 1);
        renderCart();
    };

    window.removeFav = (i) => {
        favs.splice(i, 1);
        renderFavs();
    };

    // KOSÁR + ❤️ GOMBOK
    carsList.addEventListener("click", (e) => {

        const card = e.target.closest(".car-card");
        if (!card) return;

        const name = card.querySelector("h3").textContent;
        const price = parseInt(card.dataset.price);

        if (e.target.textContent === "Bérlés") {
            cart.push({ name, price });
            renderCart();
        }

        if (e.target.classList.contains("fav")) {
            if (favs.includes(name)) {
                favs = favs.filter(f => f !== name);
            } else {
                favs.push(name);
            }
            renderFavs();
        }
    });

    // INIT
    renderCart();
    renderFavs();
});
