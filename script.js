let cart = [];
const deliveryFee = 5.00;
let customerName = '';
let customerPhone = '';

function startOrder() {
    customerName = document.getElementById('customer-name').value;
    customerPhone = document.getElementById('customer-phone').value;

    if (customerName && customerPhone) {
        document.getElementById('welcome-screen').style.display = 'none';
        document.querySelector('header').style.display = 'block';
        document.querySelector('main').style.display = 'flex';
    } else {
        alert('Por favor, insira seu nome e WhatsApp.');
    }
}

function addToCart(productName, breadClass, pointClass, ingredientClass, noteId, price) {
    const bread = document.querySelector(`input[name=${breadClass}]:checked`).value;
    const point = document.querySelector(`input[name=${pointClass}]:checked`).value;

    let removedIngredients = [];
    document.querySelectorAll(`.${ingredientClass}:checked`).forEach((checkbox) => {
        removedIngredients.push(checkbox.value);
    });

    const note = document.getElementById(noteId).value || 'Nenhuma observação';

    cart.push({
        productName,
        bread,
        point,
        removedIngredients: removedIngredients.join(', '),
        note,
        price
    });

    displayCart();
}

function displayCart() {
    const cartContent = document.getElementById("cart-content");
    const totalPriceElement = document.getElementById("total-price");
    cartContent.innerHTML = "";

    let total = 0;
    cart.forEach((item, index) => {
        cartContent.innerHTML += `
            <p><strong>Nome:</strong> ${item.productName}<br>
            <strong>Pão:</strong> ${item.bread}<br>
            <strong>Ponto:</strong> ${item.point}<br>
            <strong>Remover:</strong> ${item.removedIngredients || 'Nenhum'}<br>
            <strong>Observação:</strong> ${item.note}<br>
            <strong>Preço:</strong> R$${item.price.toFixed(2)}<br>
            <button onclick="removeFromCart(${index})">Remover</button></p>
            <hr>`;
        total += item.price;
    });

    total += deliveryFee;
    totalPriceElement.textContent = `Total: R$${total.toFixed(2)}`;
}

function finalizeOrder() {
    let orderSummary = `Pedido de ${customerName} - WhatsApp: ${customerPhone}\n\n`;
    cart.forEach(item => {
        orderSummary += `Nome do lanche: ${item.productName}\nTipo de pão: ${item.bread}\nPonto da carne: ${item.point}\nRemover: ${item.removedIngredients || 'Nenhum'}\nObservação: ${item.note}\nPreço: R$${item.price.toFixed(2)}\n\n`;
    });
    orderSummary += `Taxa de Entrega: R$${deliveryFee.toFixed(2)}\nTotal: R$${(cart.reduce((sum, item) => sum + item.price, 0) + deliveryFee).toFixed(2)}`;

    const whatsappLink = `https://wa.me/48991758488?text=${encodeURIComponent(orderSummary)}`;
    window.open(whatsappLink, '_blank');
}
