/* =========================
   FOOD DATA
========================= */

const foods = [
    {
        id: 1,
        name: "Smoky Paneer Burger",
        category: "burger",
        price: 249,
        description: "Smoky paneer, crisp lettuce & house sauce.",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 2,
        name: "Urban Loaded Fries",
        category: "fries",
        price: 179,
        description: "Crispy fries, cheese, herbs & signature drizzle.",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 3,
        name: "Classic Veg Pizza",
        category: "pizza",
        price: 299,
        description: "Roasted veggies, mozzarella & fresh basil.",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 4,
        name: "Cheese Burger",
        category: "burger",
        price: 229,
        description: "Juicy veggie patty, cheese & fresh vegetables.",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 5,
        name: "Margherita Pizza",
        category: "pizza",
        price: 269,
        description: "Classic tomato sauce, mozzarella & basil.",
        image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 6,
        name: "Classic French Fries",
        category: "fries",
        price: 129,
        description: "Golden crispy fries with signature seasoning.",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 7,
        name: "Cold Coffee",
        category: "drink",
        price: 149,
        description: "Creamy chilled coffee with rich coffee flavor.",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 8,
        name: "Fresh Lemon Drink",
        category: "drink",
        price: 99,
        description: "Refreshing lemon drink served chilled.",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=85"
    }
];


/* =========================
   DOM ELEMENTS
========================= */

const foodGrid = document.getElementById("foodGrid");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".category-btn");
const noResults = document.getElementById("noResults");

const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const toast = document.getElementById("toast");

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

const contactForm = document.getElementById("contactForm");
const checkoutBtn = document.getElementById("checkoutBtn");


/* =========================
   VARIABLES
========================= */

let currentCategory = "all";

let cart = JSON.parse(
    localStorage.getItem("urbanBitesCart")
) || [];


/* =========================
   DISPLAY FOOD
========================= */

function displayFoods(list) {

    foodGrid.innerHTML = "";

    if (list.length === 0) {

        noResults.style.display = "block";

        return;
    }

    noResults.style.display = "none";

    list.forEach(food => {

        const card = document.createElement("div");

        card.className = "food-card";

        card.innerHTML = `
            <div class="food-image">

                <img
                    src="${food.image}"
                    alt="${food.name}"
                    loading="lazy"
                >

            </div>

            <div class="food-info">

                <h3>${food.name}</h3>

                <p>${food.description}</p>

                <div class="food-bottom">

                    <span class="food-price">
                        ₹${food.price}
                    </span>

                    <button
                        class="add-btn"
                        onclick="addToCart(${food.id})"
                    >
                        + Add
                    </button>

                </div>

            </div>
        `;

        foodGrid.appendChild(card);

    });
}


/* =========================
   FILTER FOOD
========================= */

function filterFoods() {

    const searchText =
        searchInput.value.toLowerCase().trim();


    const filteredFoods = foods.filter(food => {

        const categoryMatch =
            currentCategory === "all" ||
            food.category === currentCategory;


        const searchMatch =
            food.name.toLowerCase().includes(searchText) ||
            food.description.toLowerCase().includes(searchText);


        return categoryMatch && searchMatch;

    });


    displayFoods(filteredFoods);
}


/* =========================
   CATEGORY FILTER
========================= */

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentCategory =
            button.getAttribute("data-category");

        filterFoods();

    });

});


/* =========================
   SEARCH
========================= */

searchInput.addEventListener("input", () => {

    filterFoods();

});


/* =========================
   ADD TO CART
========================= */

function addToCart(id) {

    const existingItem =
        cart.find(item => item.id === id);


    if (existingItem) {

        existingItem.quantity++;

    } else {

        const food =
            foods.find(item => item.id === id);

        cart.push({
            ...food,
            quantity: 1
        });

    }


    saveCart();

    updateCart();

    showToast("Added to cart!");

}


/* =========================
   SAVE CART
========================= */

function saveCart() {

    localStorage.setItem(
        "urbanBitesCart",
        JSON.stringify(cart)
    );

}


/* =========================
   UPDATE CART
========================= */

function updateCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <i class="fa-solid fa-bag-shopping"></i>

                <h3>Your cart is empty</h3>

                <p>
                    Add something delicious from our menu.
                </p>

            </div>
        `;

    } else {

        cart.forEach(item => {

            const cartItem =
                document.createElement("div");

            cartItem.className = "cart-item";

            cartItem.innerHTML = `

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="cart-item-info">

                    <h4>${item.name}</h4>

                    <span>₹${item.price}</span>

                    <div class="quantity">

                        <button
                            onclick="changeQuantity(${item.id}, -1)"
                        >
                            -
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${item.id}, 1)"
                        >
                            +
                        </button>

                    </div>

                </div>

                <button
                    class="remove-item"
                    onclick="removeFromCart(${item.id})"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>

            `;

            cartItems.appendChild(cartItem);

        });

    }


    updateCartSummary();

}


/* =========================
   CHANGE QUANTITY
========================= */

function changeQuantity(id, amount) {

    const item =
        cart.find(item => item.id === id);


    if (!item) {
        return;
    }


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart = cart.filter(
            item => item.id !== id
        );

    }


    saveCart();

    updateCart();

}


/* =========================
   REMOVE ITEM
========================= */

function removeFromCart(id) {

    cart = cart.filter(
        item => item.id !== id
    );

    saveCart();

    updateCart();

    showToast("Item removed!");

}


/* =========================
   CART SUMMARY
========================= */

function updateCartSummary() {

    let totalItems = 0;
    let totalPrice = 0;


    cart.forEach(item => {

        totalItems += item.quantity;

        totalPrice +=
            item.price * item.quantity;

    });


    cartCount.textContent = totalItems;

    cartTotal.textContent =
        `₹${totalPrice}`;

}


/* =========================
   OPEN CART
========================= */

cartBtn.addEventListener("click", () => {

    cartSidebar.classList.add("open");

    overlay.classList.add("show");

    document.body.style.overflow = "hidden";

});


/* =========================
   CLOSE CART
========================= */

function closeCartSidebar() {

    cartSidebar.classList.remove("open");

    overlay.classList.remove("show");

    document.body.style.overflow = "";

}


closeCart.addEventListener(
    "click",
    closeCartSidebar
);


overlay.addEventListener(
    "click",
    closeCartSidebar
);


/* =========================
   TOAST MESSAGE
========================= */

function showToast(message) {

    toast.querySelector("span").textContent =
        message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}


/* =========================
   MOBILE MENU
========================= */

menuToggle.addEventListener("click", () => {

    navbar.classList.toggle("show");

});


document.querySelectorAll(".navbar a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("show");

        });

    });


/* =========================
   CONTACT FORM
========================= */

contactForm.addEventListener("submit", event => {

    event.preventDefault();

    const name =
        document.getElementById("name").value;

    showToast(`Thank you, ${name}!`);

    contactForm.reset();

});


/* =========================
   CHECKOUT
========================= */

checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        showToast("Your cart is empty!");

        return;
    }


    showToast("Checkout feature coming soon!");

});


/* =========================
   INITIALIZE WEBSITE
========================= */

displayFoods(foods);

updateCart();