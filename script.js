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
        document.querySelector(".cart-footer").style.display = "block"; // Exibe o carrinho apenas após iniciar o pedido
    } else {
        alert("Por favor, insira seu nome e WhatsApp.");
    }
}

let cart = [];

function addToCart(name, size, bread, point, ingredients, addons, noteId, price) {
    const sizeValue = document.querySelector(`input[name="${size}"]:checked`).value;
    const breadValue = document.querySelector(`input[name="${bread}"]:checked`).value;
    const pointValue = document.querySelector(`input[name="${point}"]:checked`).value;
    const ingredientElements = document.querySelectorAll(`.${ingredients}:checked`);
    const addonElements = document.querySelectorAll(`.${addons}:checked`);
    const note = document.getElementById(noteId).value;
    
    const selectedIngredients = Array.from(ingredientElements).map(el => el.value);
    const selectedAddons = Array.from(addonElements).map(el => el.value);

    const item = {
        name,
        size: sizeValue,
        bread: breadValue,
        point: pointValue,
        ingredients: selectedIngredients,
        addons: selectedAddons,
        note: note || "Nenhuma",
        price: sizeValue === "Duplo" ? price + 7 : price
    };

    cart.push(item);
    updateCartDisplay();
}

function addBeveragesToCart() {
    const beverageItems = [
        { name: "Coca Cola 310ml", price: 6, quantity: document.getElementById("coca-cola").value },
        { name: "Guaraná Antártica 310ml", price: 6, quantity: document.getElementById("guarana").value },
        { name: "Água com Gás", price: 3, quantity: document.getElementById("agua").value }
    ];

    beverageItems.forEach(beverage => {
        if (beverage.quantity > 0) {
            cart.push({
                name: beverage.name,
                quantity: beverage.quantity,
                price: beverage.price * beverage.quantity,
                isBeverage: true
            });
        }
    });

    updateCartDisplay();
}

function updateCartDisplay() {
    const cartContent = document.getElementcontinuação do código...

```javascript
function updateCartDisplay() {
    const cartContent = document.getElementById("cart-content");
    cartContent.innerHTML = "";
    let totalPrice = 5; // Taxa de entrega

    cart.forEach(item => {
        totalPrice += item.price;
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = item.isBeverage ? `
            <strong>${item.name}</strong> - Quantidade: ${item.quantity} (R$${item.price.toFixed(2)})
            <hr>
        ` : `
            <strong>${item.name}</strong> - ${item.size} (R$${item.price.toFixed(2)})
            <br>Pão: ${item.bread} - Ponto: ${item.point}
            <br>Remover: ${item.ingredients.join(", ") || "Nenhum"}
            <br>Adicionais: ${item.addons.join(", ") || "Nenhum"}
            <br>Observação: ${item.note}
            <hr>
        `;
        cartContent.appendChild(itemElement);
    });

    document.getElementById("total-price").innerText = `Total: R$${totalPrice.toFixed(2)}`;
}

function finalizeOrder() {
    addBeveragesToCart();
    const cartContent = cart.map(item => item.isBeverage ? `
        ${item.name} - Quantidade: ${item.quantity} (R$${item.price.toFixed(2)})
    ` : `
        ${item.name} - ${item.size} (R$${item.price.toFixed(2)})
        Pão: ${item.bread} - Ponto: ${item.point}
        Remover: ${item.ingredients.join(", ") || "Nenhum"}
        Adicionais: ${item.addons.join(", ") || "Nenhum"}
        Observação: ${item.note}
    `).join("\n\n");

    const phone = "48991490613";
    const totalPrice = document.getElementById("total-price").innerText.split(": R$")[1];
    const message = encodeURIComponent(`Pedido:\n${cartContent}\n\nTaxa de Entrega: R$5,00\nTotal: R$${totalPrice}`);
    window.open(`https://wa.me/${phone}?text=${message}`);
}
