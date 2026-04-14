document.addEventListener("DOMContentLoaded", () => {

    const carsList = document.getElementById("cars-list");
    const cartPanel = document.getElementById("cartPanel");
    const favPanel = document.getElementById("favPanel");
    const backdrop = document.getElementById("backdrop");

    const cartItemsEl = document.getElementById("cartItems");
    const favItemsEl = document.getElementById("favItems");

    const cartCountEl = document.getElementById("cartCount");
    const favCountEl = document.getElementById("favCount");
    const totalEl = document.querySelectorAll("#total"); // Több helyen van total ID

    let cart = [];
    let favs = [];

    // --- MENÜPONTOK SIMA GÖRDÍTÉSE ---
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Csak akkor avatkozunk be, ha belső linkről (#) van szó
            if (href.startsWith('#')) {
                e.preventDefault(); 

                const targetId = href.substring(1); 
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Fix fejléc korrekció
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

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

    backdrop.addEventListener("click", closePanels);

    // KOSÁR RENDER
    function renderCart() {
        cartItemsEl.innerHTML = "";
        let totalSum = 0;

        cart.forEach((item, index) => {
            totalSum += item.price;
            const div = document.createElement("div");
            div.className = "item";
            div.innerHTML = `
                <h4>${item.name}</h4>
                <p>${item.price.toLocaleString()} Ft / nap</p>
                <button onclick="removeCart(${index})">Törlés</button>
            `;
            cartItemsEl.appendChild(div);
        });

        cartCountEl.textContent = cart.length;
        totalEl.forEach(el => el.textContent = totalSum.toLocaleString());
    }

    // KEDVENCEK RENDER
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

    // GLOBÁLIS TÖRLÉS FÜGGVÉNYEK
    window.removeCart = (i) => {
        cart.splice(i, 1);
        renderCart();
    };

    window.removeFav = (i) => {
        favs.splice(i, 1);
        renderFavs();
    };

    // KÁRTYA GOMBOK (ESEMÉNY DELEGÁLÁS)
    if (carsList) {
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
                if (!favs.includes(name)) {
                    favs.push(name);
                    renderFavs();
                } else {
                    alert("Ez az autó már a kedvencek között van!");
                }
            }
        });
    }

    // FELSŐ SÁV GOMBOK KEZELÉSE
    const favBtnEl = document.getElementById("favBtn");
    const cartBtnEl = document.getElementById("cartBtn");

    if (favBtnEl) favBtnEl.addEventListener("click", () => openPanel(favPanel));
    if (cartBtnEl) cartBtnEl.addEventListener("click", () => openPanel(cartPanel));

    // Kezdeti állapot
    renderCart();
    renderFavs();
});