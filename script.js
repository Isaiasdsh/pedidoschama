document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.querySelector("#welcome-form button");

    // Evento de clique no botão para iniciar o atendimento
    startButton.addEventListener("click", function (e) {
        e.preventDefault(); // Previne o envio do formulário

        // Oculta a tela de boas-vindas e exibe o menu
        document.querySelector(".welcome-screen").style.display = "none";
        document.getElementById("menu").style.display = "block";
    });
});

function finalizarPedido() {
    // Obter o lanche selecionado e o preço
    const lanche = document.querySelector('input[name="lanche"]:checked');
    const lancheNome = lanche.value;
    let totalPrice = parseFloat(lanche.getAttribute("data-price"));
    let pedido = `Lanche: ${lancheNome}\n`;

    // Adicionar tipo de pão
    const pao = document.querySelector('input[name="pao"]:checked').value;
    pedido += `Pão: ${pao}\n`;

    // Adicionar ponto da carne
    const ponto = document.querySelector('input[name="ponto"]:checked').value;
    pedido += `Ponto da Carne: ${ponto}\n`;

    // Adicionar adicionais
    const extras = document.querySelectorAll(".extra:checked");
    extras.forEach(extra => {
        pedido += `+ ${extra.value} - R$${extra.getAttribute("data-price")}\n`;
        totalPrice += parseFloat(extra.getAttribute("data-price"));
    });

    // Adicionar bebidas
    const drinks = document.querySelectorAll(".drink:checked");
    drinks.forEach(drink => {
        pedido += `+ Bebida: ${drink.value} - R$${drink.getAttribute("data-price")}\n`;
        totalPrice += parseFloat(drink.getAttribute("data-price"));
    });

    // Taxa de entrega
    totalPrice += 5;
    pedido += `\nTaxa de entrega: R$5,00\n`;
    pedido += `Total: R$${totalPrice.toFixed(2)}`;

    // Dados do cliente
    const name = document.getElementById("name").value;
    const whatsapp = document.getElementById("whatsapp").value;
    const mensagem = encodeURIComponent(
        `Pedido de: ${name}\nWhatsApp: ${whatsapp}\n\n${pedido}`
    );

    // Enviar pedido para o WhatsApp
    window.open(`https://wa.me/48991758488?text=${mensagem}`, "_blank");
}
