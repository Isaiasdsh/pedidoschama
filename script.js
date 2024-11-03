document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-button");
    const carrinhoLista = document.getElementById("carrinho-lista");
    const carrinhoSubtotal = document.getElementById("carrinho-subtotal");
    const carrinhoTotal = document.getElementById("carrinho-total");
    const carrinhoCompletoDiv = document.getElementById("carrinho-completo");
    let carrinho = [];
    let totalCarrinho = 0;
    const taxaEntrega = 5;

    startButton.addEventListener("click", function(e) {
        e.preventDefault();
        const nome = document.getElementById("name").value.trim();
        const whatsapp = document.getElementById("whatsapp").value.trim();

        if (!nome || !whatsapp) {
            alert("Por favor, preencha seu nome e WhatsApp para iniciar o atendimento.");
            return;
        }
        
        document.querySelector(".welcome-screen").style.display = "none";
        document.getElementById("lanches-menu").style.display = "block";
    });

    window.escolherLanche = function(tipo) {
        document.getElementById("lanches-menu").style.display = "none";
        document.getElementById("personalizar-lanche").style.display = "block";
        const conteudoLanche = document.getElementById("conteudo-lanche");
        let htmlContent = "";

        if (tipo === "classico") {
            htmlContent = `<p><strong>CHAMA Clássico</strong></p>`;
        } else if (tipo === "bacon") {
            htmlContent = `<p><strong>CHAMA Bacon</strong></p>`;
        }
        conteudoLanche.innerHTML = htmlContent;
    };

    window.adicionarAoCarrinho = function() {
        let pedido = "Detalhes do pedido";
        carrinho.push({ pedido, total: 10 });
        totalCarrinho += 10;
        atualizarCarrinho();
    };

    function atualizarCarrinho() {
        carrinhoLista.innerHTML = "";
        carrinho.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item.pedido;
            carrinhoLista.appendChild(li);
        });
        carrinhoSubtotal.textContent = totalCarrinho.toFixed(2);
        carrinhoTotal.textContent = (totalCarrinho + taxaEntrega).toFixed(2);
    }

    window.finalizarPedido = function() {
        let mensagem = "Detalhes completos do pedido";
        window.open(`https://wa.me/48991758488?text=${encodeURIComponent(mensagem)}`);
    };
});

