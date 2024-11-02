document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-button");
    const totalPriceEl = document.getElementById("total-price");

    // Iniciar atendimento e exibir o menu
    startButton.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(".welcome-screen").style.display = "none";
        document.getElementById("menu").style.display = "block";
    });

    // Atualizar preço total
    document.getElementById("menu").addEventListener("change", updateTotalPrice);

    function updateTotalPrice() {
        let total = 0;

        // Preços dos lanches
        const lancheClassico = document.querySelector("input[name='ingredientes-classico']:checked");
        const lancheBacon = document.querySelector("input[name='ingredientes-bacon']:checked");
        const lancheKids = document.querySelector("input[name='ingredientes-kids']:checked");
        
        // Soma valores dos lanches selecionados e adicionais
        if (lancheClassico) total += parseFloat(lancheClassico.dataset.price);
        if (lancheBacon) total += parseFloat(lancheBacon.dataset.price);
        if (lancheKids) total += parseFloat(lancheKids.dataset.price);

        // Adicionais
        document.querySelectorAll(".extra:checked").forEach(item => {
            total += parseFloat(item.getAttribute("data-price"));
        });

        // Bebidas
        document.querySelectorAll(".drink:checked").forEach(item => {
            total += parseFloat(item.getAttribute("data-price"));
        });

        totalPriceEl.textContent = total.toFixed(2);
    }

    // Finalizar e enviar pedido
    window.finalizarPedido = function() {
        let pedido = "Seu pedido:\n";
        document.querySelectorAll("#menu input:checked").forEach(item => {
            pedido += `- ${item.value}\n`;
        });
        pedido += `\nTotal: R$${totalPriceEl.textContent}`;

        const name = document.getElementById("name").value;
        const whatsapp = document.getElementById("whatsapp").value;
        const mensagem = encodeURIComponent(`Pedido de: ${name}\nWhatsApp: ${whatsapp}\n\n${pedido}`);

        window.open(`https://wa.me/48991758488?text=${mensagem}`, "_blank");
    };
});

