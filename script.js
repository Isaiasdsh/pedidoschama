let cart = {};
const deliveryFee = 5.00;

function updateQuantity(item, change) {
    if (!cart[item]) cart[item] = { quantity: 0, price: 0 };
    cart[item].quantity += change;
    if (cart[item].quantity < 0) cart[item].quantity = 0;
    document.getElementById(`quantity-${item}`).textContent = cart[item].quantity;
    displayCart();
}

function addToCart(item, price) {
    if (!cart[item]) cart[item] = { quantity: 0, price: price };
    cart[item].quantity += 1;
    document.getElementById(`quantity-${item}`).textContent = cart[item].quantity;
    displayCart();
}

function displayCart() {
    const cartContent = document.getElementById("cart-content");
    const totalPriceElement = document.getElementById("total-price");
    cartContent.innerHTML = "";

    let total = 0;
    for (const [item, { quantity, price }] of Object.entries(cart)) {
        if (quantity > 0) {
            total += price * quantity;
            cartContent.innerHTML += `<p>${item} - ${quantity} x R$${price.toFixed(2)}</p>`;
        }
    }

    total += deliveryFee;
    totalPriceElement.textContent = `Total: R$${total.toFixed(2)}`;
}

function finalizeOrder() {
    let orderSummary = `Seu Pedido:\n`;
    for (const [item, { quantity }] of Object.entries(cart)) {
        if (quantity > 0) {
            orderSummary += `${item} - ${quantity} unidades\n`;
        }
    }
    orderSummary += `\nTaxa de Entrega: R$${deliveryFee.toFixed(2)}`;

    const phoneNumber = "48991758488";
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(orderSummary)}`;
    window.open(whatsappLink, '_blank');
}
