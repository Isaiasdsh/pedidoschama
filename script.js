document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-button");
    const totalPriceEl = document.getElementById("total-price");
    let carrinho = [];
    let totalCarrinho = 0;

    startButton.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(".welcome-screen").style.display = "none";
        document.getElementById("menu").style.display = "block";
    });

    function updateTotalPrice() {
        let total = 0;

        const tipo = document.querySelector("input[name='tipo-classico']:checked") || document.querySelector("input[name='tipo-bacon']:checked");
        if (tipo) total += parseFloat(tipo.dataset.price);

        document.querySelectorAll(".extra:checked, .drink:checked").forEach(item => {
            total += parseFloat(item.getAttribute("data-price"));
        });

        totalPriceEl.textContent = total.toFixed(2);
    }

    document.getElementById("menu").addEventListener("change", updateTotalPrice);

    window.adicionarAoCarrinho = function() {
        let pedido = "Lanche: ";
        document.querySelectorAll("#menu input:checked").forEach(item => {
            pedido += `${item.value}, `;
        });
        let total = parseFloat(totalPriceEl.textContent);
        totalCarrinho += total;
        carrinho.push({ pedido, total });

        alert("Item adicionado ao carrinho!");
        document.getElementById("menu").style.display = "none";
        document.getElementById("total-price").textContent = "0.00";
    };

    window.verCarrinho = function() {
        const carrinhoLista = document.getElementById("carrinho-lista");
        carrinhoLista.innerHTML = "";
        carrinho.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.pedido} - R$${item.total.toFixed(2)}`;
            carrinhoLista.appendChild(li);
        });
        document.getElementById("carrinho-total").textContent = totalCarrinho.toFixed(2);
        document.getElementById("carrinho").style.display = "block";
    };

    window.finalizarPedido = function() {
        let pedido = "Pedido:\n";
        carrinho.forEach(item => {
            pedido += `${item.pedido} - R$${item.total.toFixed(2)}\n`;
        });
        pedido += `Total: R$${totalCarrinho.toFixed(2)}`;
        
        const name = document.getElementById("name").value;
        const whatsapp = document.getElementById("whatsapp").value;
        const mensagem = encodeURIComponent(`Pedido de: ${name}\nWhatsApp: ${whatsapp}\n\n${pedido}`);
        
        window.open(`https://wa.me/48991758488?text=${mensagem}`, "_blank");
    };
});
