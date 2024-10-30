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
    } else {
        alert("Por favor, insira seu nome e WhatsApp.");
    }
}

function addToCart(name, size, bread, point, ingredients, addons, noteId, price) {
    const sizeValue = document.querySelector(`input[name="${size}"]:checked`).value;
    const breadValue = document.querySelector(`input[name="${bread}"]:checked`).value;
    const pointValue = document.querySelector(`input[name="${point}"]:checked`).value;
    const ingredientElements = document.querySelectorAll(`.${ingredients}:checked`);
    const addonElements = document.querySelectorAll(`.${addons}:checked`);
    const note = document.getElementById(noteId).value;
    const selectedIngredients = Array.from(ingredientElements).map(el => el.value).join(", ");
    const selectedAddons = Array.from(addonElements).map(el => el.value).join(", ");

    const item = `
        <div>
            <strong>${name}</strong> - ${sizeValue} (${price})
            <br>Pão: ${breadValue} - Ponto: ${pointValue}
            <br>Remover: ${selectedIngredients}
            <br>Adicionais: ${selectedAddons}
            <br>Observação: ${note || "Nenhuma"}
        </div>
    `;
    document.getElementById("cart-content").innerHTML += item;
}

function finalizeOrder() {
    const cartContent = document.getElementById("cart-content").innerText;
    const phone = "48991490613";
    const message = encodeURIComponent(`Pedido:\n${cartContent}`);
    window.open(`https://wa.me/${phone}?text=${message}`);
}

