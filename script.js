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

function addToCart(name, sizeClass, breadClass, ingredientsClass, addonsClass, beveragesClass, paymentClass, addressId, basePrice) {
    const size = document.querySelector(`input[name="${sizeClass}"]:checked`);
    const bread = document.querySelector(`input[name="${breadClass}"]:checked`);
    const ingredients = document.querySelectorAll(`.${ingredientsClass}:checked`);
    const addons = document.querySelectorAll(`.${addonsClass}:checked`);
    const beverages = document.querySelectorAll(`.${beveragesClass}:checked`);
    const payment = document.querySelector(`input[name="${paymentClass}"]:checked`);
    const address = document.getElementById(addressId).value;

    // Calculate price based on size
    const sizePrice = size && size.value === "Duplo" ? basePrice + 7 : basePrice;

    const selectedIngredients = Array.from(ingredients).map(el => el.value);
    const selectedAddons = Array.from(addons).map(el => el.value);
    const selectedBeverages = Array.from(beverages).map(el => el.value);
    const paymentMethod = payment ? payment.value : "Não informado";

    const item = {
        name,
        size: size ? size.value : "Simples",
        bread: bread ? bread.value : "Padrão",
        ingredients: selectedIngredients,
        addons: selectedAddons,
        beverages: selectedBeverages,
        payment: paymentMethod,
        address: address || "Endereço não informado",
        price: sizePrice
    };

    cart.push(item);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartContent = document.getElementById("cart-content");
    cartContent.innerHTML = "";
    let totalPrice = 5; // Delivery fee

    cart.forEach(item => {
        totalPrice += item.price;
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <div><strong>${item.name}</strong> - ${item.size} (R$${item.price.toFixed(2)})</div>
            <div>Pão: ${item.bread}</div>
            <div>Remover: ${item.ingredients.join(", ") || "Nenhum"}</div>
            <div>Adicionais: ${item.addons.join(", ") || "Nenhum"}</div>
            <div>Bebidas: ${item.beverages.join(", ") || "Nenhuma"}</div>
            <div>Pagamento: ${item.payment}</div>
            <div>Endereço: ${item.address}</div>
            <hr>
        `;
        cartContent.appendChild(itemElement);
    });

    document.getElementById("total-price").innerText = `Total: R$${totalPrice.toFixed(2)}`;
}

function finalizeOrder() {
    const cartSummary = cart.map(item => `
        ${item.name} - ${item.size} (R$${item.price.toFixed(2)})
        Pão: ${item.bread}
        Remover: ${item.ingredients.join(", ") || "Nenhum"}
        Adicionais: ${item.addons.join(", ") || "Nenhum"}
        Bebidas: ${item.beverages.join(", ") || "Nenhuma"}
        Pagamento: ${item.payment}
        Endereço: ${item.address}
    `).join("\n\n");

    const phone = "48991758488";
    const totalPrice = document.getElementById("total-price").innerText.split(": R$")[1];
    const message = encodeURIComponent(`Pedido:\n${cartSummary}\n\nTaxa de Entrega: R$5,00\nTotal: R$${totalPrice}`);
    window.open(`https://wa.me/${phone}?text=${message}`);
}
