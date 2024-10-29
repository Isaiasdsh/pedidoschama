let cart = [];
const deliveryFee = 5.00;
const pixKey = "48243861000127";

function addToCart(productName, sizeClass, breadClass, ingredientClass, addonClass) {
    const size = sizeClass ? document.querySelector(`input[name=${sizeClass}]:checked`).value : 'Simples';
    const bread = breadClass ? document.querySelector(`input[name=${breadClass}]:checked`).value : "Pão Kids";

    let removedIngredients = [];
    document.querySelectorAll(`.${ingredientClass}:checked`).forEach((checkbox) => {
        removedIngredients.push(checkbox.value);
    });

    let additionalItems = [];
    if (addonClass) {
        document.querySelectorAll(`.${addonClass}:checked`).forEach((checkbox) => {
            additionalItems.push(checkbox.value);
        });
    }

    let price = size === 'single' ? 26 : 33;
    cart.push({
        productName,
        size: size === 'single' ? 'Simples' : 'Duplo',
        bread,
        price,
        removedIngredients: removedIngredients.join(', '),
        additionalItems: additionalItems.join(', ')
    });

    displayCart();
}

function displayCart() {
    const cartElement = document.getElementById("cart-content");
    cartElement.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        cartElement.innerHTML += `<p>${item.productName} (${item.size}) - Pão: ${item.bread} - R$${item.price.toFixed(2)} <br> Removido: ${item.removedIngredients} <br> Adicionais: ${item.additionalItems} <button onclick="removeFromCart(${index})">Remover</button></p>`;
        total += item.price;
    });
}

function finalizeOrder() {
    let orderSummary = `Estamos atendendo apenas Fazenda da Armação e Palmas.\n\nSeu Pedido:\n`;
    cart.forEach(item => {
        orderSummary += `Hambúrguer: ${item.productName} (${item.size}), Pão: ${item.bread}, Removido: ${item.removedIngredients}, Adicionais: ${item.additionalItems}, Preço: R$${item.price.toFixed(2)}\n`;
    });

    let beverages = "";
    const cocaColaQty = document.getElementById("coca-cola").value || 0;
    const guaranaQty = document.getElementById("guarana").value || 0;
    const aguaQty = document.getElementById("agua").value || 0;

    if (cocaColaQty > 0) beverages += `Coca Cola 310ml - ${cocaColaQty} unidades\n`;
    if (guaranaQty > 0) beverages += `Guaraná Antártica 310ml - ${guaranaQty} unidades\n`;
    if (aguaQty > 0) beverages += `Água com Gás - ${aguaQty} unidades\n`;

    if (beverages) {
        orderSummary += `\nBebidas:\n${beverages}`;
    }

    const phoneNumber = "48991490613";
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(orderSummary)}`;
    window.open(whatsappLink, '_blank');
}
