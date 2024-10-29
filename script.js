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

    // Limpar as seleções após adicionar ao carrinho
    resetSelections(sizeClass, breadClass, ingredientClass, addonClass);
    displayCart();
}

function resetSelections(sizeClass, breadClass, ingredientClass, addonClass) {
    // Reseta o tamanho para o padrão (Simples)
    if (sizeClass) document.querySelector(`input[name=${sizeClass}][value="single"]`).checked = true;

    // Reseta o pão para o padrão (Brioche ou primeira opção)
    if (breadClass) document.querySelector(`input[name=${breadClass}][value="brioche"]`).checked = true;

    // Desmarca todos os ingredientes para remover
    document.querySelectorAll(`.${ingredientClass}:checked`).forEach((checkbox) => {
        checkbox.checked = false;
    });

    // Desmarca todos os adicionais
    if (addonClass) {
        document.querySelectorAll(`.${addonClass}:checked`).forEach((checkbox) => {
            checkbox.checked = false;
        });
    }
}

function displayCart() {
    const cartElement = document.getElementById("cart-content");
    cartElement.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        cartElement.innerHTML += `
            <p>
                <strong>Nome do lanche:</strong> ${item.productName}<br>
                <strong>Tamanho:</strong> ${item.size}<br>
                <strong>Tipo de pão:</strong> ${item.bread}<br>
                <strong>Ingredientes para Remover:</strong> ${item.removedIngredients || 'Nenhum'}<br>
                <strong>Adicionais:</strong> ${item.additionalItems || 'Nenhum'}<br>
                <button onclick="removeFromCart(${index})">Remover</button>
            </p>
            <hr>
        `;
        total += item.price;
    });

    const deliveryFeeElement = document.getElementById("delivery-fee");
    const totalPriceElement = document.getElementById("total-price");
    deliveryFeeElement.innerHTML = `<h3>Taxa de entrega: R$${deliveryFee.toFixed(2)}</h3>`;
    totalPriceElement.innerHTML = `<h3>Total com entrega: R$${(total + deliveryFee).toFixed(2)}</h3>`;
}

function finalizeOrder() {
    let orderSummary = `Estamos atendendo apenas Fazenda da Armação e Palmas.\n\nSeu Pedido:\n`;
    cart.forEach(item => {
        orderSummary += `
Nome do lanche: ${item.productName}
Tamanho: ${item.size}
Tipo de pão: ${item.bread}
Ingredientes para Remover: ${item.removedIngredients || 'Nenhum'}
Adicionais: ${item.additionalItems || 'Nenhum'}\n\n`;
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

    orderSummary += `\nTaxa de Entrega: R$${deliveryFee.toFixed(2)}`;

    const phoneNumber = "48991490613";
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(orderSummary)}`;
    window.open(whatsappLink, '_blank');
}

