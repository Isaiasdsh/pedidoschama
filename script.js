function startOrder() {
    const name = document.getElementById("customer-name").value;
    const phone = document.getElementById("customer-phone").value;
    if (name && phone) {
        document.getElementById("welcome-screen").style.display = "none";
        document.getElementById("menu-screen").style.display = "block";
    } else {
        alert("Preencha seu nome e WhatsApp.");
    }
}

let cart = [];

function addToCart(productName) {
    const size = document.getElementById(`size-${productName.toLowerCase()}`).value;
    const bread = document.getElementById(`bread-${productName.toLowerCase()}`).value;
    const addons = Array.from(document.querySelectorAll(`.addon-${productName.toLowerCase()}:checked`))
                        .map(addon => addon.value);
    
    cart.push({ productName, size, bread, addons });
    alert(`${productName} adicionado ao carrinho!`);
}

function finalizeOrder() {
    const orderDetails = cart.map(item => `
        ${item.productName} - ${item.size}
        Pão: ${item.bread}
        Adicionais: ${item.addons.join(', ') || "Nenhum"}
    `).join("\n\n");

    const phone = "48991758488";
    const message = encodeURIComponent(`Pedido:\n${orderDetails}`);
    window.open(`https://wa.me/${phone}?text=${message}`);
}

