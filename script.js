document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("welcome-screen").style.display = "flex";
});

function startOrder() {
    const name = document.getElementById("customer-name").value;
    const phone = document.getElementById("customer-phone").value;
    if (name && phone) {
        document.getElementById("welcome-screen").style.display = "none";
        document.getElementById("header").style.display = "block";
        document.getElementById("main-content").style.display = "block";
        document.querySelector(".cart-footer").style.display = "block";
    } else {
        alert("Por favor, insira seu nome e WhatsApp.");
    }
}

let cart = [];

function addToCart(name, size, bread, ingredients, addons, noteId, price) {
    const sizeValue = document.querySelector(`input[name="${size}"]:checked`).value;
    const breadValue = document.querySelector(`input[name="${bread}"]:checked`).value;
    const ingredientElements = document.querySelectorAll(`.${ingredients}:checked`);
    const addonElements = document.querySelectorAll(`.${addons}:checked`);
    
    const selectedIngredients = Array.from(ingredientElements).map(el => el.value);
    const selectedAddons = Array.from(addonElements).map(el => el.value);

    const item = {
        name,
        size: sizeValue,
        bread: breadValue,
        ingredients: selectedIngredients,
        addons: selectedAddons,
        price: sizeValue === "Duplo" ? price + 7 : price
    };

    cart.push(item);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartContent = document.getElementById("cart-content");
    cartContent.innerHTML = "";
    let totalPrice = 5;

    cart.forEach(item => {
        totalPrice += item.price;
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <strong>${item.name}</strong> - ${item.size} (R$${item.price.toFixed(2)})
            <br>Pão: ${item.bread}
            <br>Remover: ${item.ingredients.join(", ") || "Nenhum"}
            <br>Adicionais: ${item.addons.join(", ") || "Nenhum"}
            <hr>
        `;
        cartContent.appendChild(itemElement);
    });

    document.getElementById("total-price").innerText = `Total: R$${totalPrice.toFixed(2)}`;
}

function finalizeOrder() {
    const cartContent = cart.map(item => `
        ${item.name} - ${item.size} (R$${item.price.toFixed(2)})
        Pão: ${item.bread}
        Remover: ${item.ingredients.join(", ") || "Nenhum"}
        Adicionais: ${item.addons.join(", ") || "Nenhum"}
    `).join("\n\n");

    const phone = "48991758488";
    const totalPrice = document.getElementById("total-price").innerText.split(": R$")[1];
    const message = encodeURIComponent(`Pedido:\n${cartContent}\n\nTaxa de Entrega: R$5,00\nTotal: R$${totalPrice}`);
    window.open(`https://wa.me/${phone}?text=${message}`);
}

