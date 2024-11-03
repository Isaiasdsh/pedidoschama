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
        
        if (nome === "" || whatsapp === "") {
            alert("Por favor, preencha seu nome e WhatsApp para iniciar o atendimento.");
            return;
        }
        
        document.querySelector(".welcome-screen").style.display = "none";
        document.getElementById("lanches-menu").style.display = "block";
        document.getElementById("carrinho").style.display = "block";
    });

    // Função para exibir a tela de personalização do lanche escolhido
    window.escolherLanche = function(tipo) {
        document.getElementById("lanches-menu").style.display = "none";
        document.getElementById("personalizar-lanche").style.display = "block";
        const conteudoLanche = document.getElementById("conteudo-lanche");
        conteudoLanche.innerHTML = "";

        if (tipo === "classico") {
            document.getElementById("titulo-lanche").innerText = "CHAMA Clássico";
            conteudoLanche.innerHTML = `
                <p><strong>Escolha o Tipo:</strong></p>
                <label><input type="radio" name="tipo" value="Simples" data-price="26" checked> Simples - R$26,00</label>
                <label><input type="radio" name="tipo" value="Duplo" data-price="33"> Duplo - R$33,00</label>
                <p><strong>Ponto da Carne:</strong></p>
                <label><input type="radio" name="ponto" value="Mal Passado"> Mal Passado</label>
                <label><input type="radio" name="ponto" value="Ao Ponto" checked> Ao Ponto</label>
                <label><input type="radio" name="ponto" value="Bem Passado"> Bem Passado</label>
            `;
        }
        // Outras opções omitidas para brevidade
    };

    window.adicionarAoCarrinho = function() {
        let pedido = "";
        let total = 0;
        const tipoLanche = document.getElementById("titulo-lanche").innerText;

        const tipo = document.querySelector("#personalizar-lanche input[name='tipo']:checked");
        if (tipo) {
            total = parseFloat(tipo.dataset.price || 0);
            pedido += `${tipoLanche} (${tipo.value})\n`;
        }

        const pontoCarne = document.querySelector("#personalizar-lanche input[name='ponto']:checked").value;
        pedido += `Ponto da Carne: ${pontoCarne}\n`;

        carrinho.push({ pedido, total });
        totalCarrinho += total;
        atualizarCarrinho();
        alert("Item adicionado ao carrinho!");

        document.getElementById("personalizar-lanche").style.display = "none";
        document.getElementById("lanches-menu").style.display = "block";
    };

    function atualizarCarrinho() {
        carrinhoLista.innerHTML = "";
        carrinho.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = item.pedido;
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remover";
            removeButton.onclick = () => removerDoCarrinho(index);
            li.appendChild(removeButton);
            carrinhoLista.appendChild(li);
        });
        carrinhoSubtotal.textContent = totalCarrinho.toFixed(2);
        carrinhoTotal.textContent = (totalCarrinho + taxaEntrega).toFixed(2);
    }

    function removerDoCarrinho(index) {
        totalCarrinho -= carrinho[index].total;
        carrinho.splice(index, 1);
        atualizarCarrinho();
    }

    window.finalizarPedido = function() {
        let pedido = `Pedido de:\n`;
        carrinho.forEach(item => pedido += `${item.pedido}\n`);
        pedido += `Taxa de Entrega: R$${taxaEntrega.toFixed(2)}\nTotal Final: R$${(totalCarrinho + taxaEntrega).toFixed(2)}`;
        const mensagem = encodeURIComponent(pedido);
        window.open(`https://wa.me/48991758488?text=${mensagem}`, "_blank");
    };
});
