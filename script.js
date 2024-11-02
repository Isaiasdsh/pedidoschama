document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-button");
    const carrinhoLista = document.getElementById("carrinho-lista");
    const carrinhoSubtotal = document.getElementById("carrinho-subtotal");
    const carrinhoTotal = document.getElementById("carrinho-total");
    const carrinhoCompletoDiv = document.getElementById("carrinho-completo"); // Div para exibir carrinho completo
    let carrinho = [];
    let totalCarrinho = 0;
    const taxaEntrega = 5;

    startButton.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(".welcome-screen").style.display = "none";
        document.getElementById("lanches-menu").style.display = "block";
        document.getElementById("carrinho").style.display = "block"; // Mostra o carrinho após iniciar o atendimento
    });

    // Função para exibir a tela de personalização do lanche escolhido
    window.escolherLanche = function(tipo) {
        document.getElementById("lanches-menu").style.display = "none";
        document.getElementById("personalizar-lanche").style.display = "block";
        const conteudoLanche = document.getElementById("conteudo-lanche");
        conteudoLanche.innerHTML = ""; // Limpar conteúdo anterior

        if (tipo === "classico") {
            document.getElementById("titulo-lanche").innerText = "CHAMA Clássico";
            conteudoLanche.innerHTML = `
                <p><strong>Escolha o Tipo:</strong></p>
                <label><input type="radio" name="tipo" value="Simples" data-price="26" checked> Simples - R$26,00</label>
                <label><input type="radio" name="tipo" value="Duplo" data-price="33"> Duplo - R$33,00</label>
                <p><strong>Pão:</strong></p>
                <label><input type="radio" name="pao" value="Brioche" checked> Brioche</label>
                <label><input type="radio" name="pao" value="Parmesão"> Parmesão</label>
                <p><strong>Quais Ingredientes Deseja? (desmarque o que você quer retirar)</strong></p>
                <div class="ingredientes">
                    <label><input type="checkbox" name="ingrediente" value="Queijo mussarela" checked> Queijo mussarela</label>
                    <label><input type="checkbox" name="ingrediente" value="Cebola roxa" checked> Cebola roxa</label>
                    <label><input type="checkbox" name="ingrediente" value="Alface" checked> Alface</label>
                    <label><input type="checkbox" name="ingrediente" value="Tomate" checked> Tomate</label>
                    <label><input type="checkbox" name="ingrediente" value="Maionese" checked> Maionese</label>
                </div>
            `;
        } else if (tipo === "bacon") {
            document.getElementById("titulo-lanche").innerText = "CHAMA Bacon";
            conteudoLanche.innerHTML = `
                <p><strong>Escolha o Tipo:</strong></p>
                <label><input type="radio" name="tipo" value="Simples" data-price="30" checked> Simples - R$30,00</label>
                <label><input type="radio" name="tipo" value="Duplo" data-price="37"> Duplo - R$37,00</label>
                <p><strong>Pão:</strong></p>
                <label><input type="radio" name="pao" value="Brioche" checked> Brioche</label>
                <label><input type="radio" name="pao" value="Parmesão"> Parmesão</label>
                <p><strong>Quais Ingredientes Deseja? (desmarque o que você quer retirar)</strong></p>
                <div class="ingredientes">
                    <label><input type="checkbox" name="ingrediente" value="Queijo mussarela" checked> Queijo mussarela</label>
                    <label><input type="checkbox" name="ingrediente" value="Cheddar cremoso" checked> Cheddar cremoso</label>
                    <label><input type="checkbox" name="ingrediente" value="Bacon em tiras" checked> Bacon em tiras</label>
                    <label><input type="checkbox" name="ingrediente" value="Cebola roxa" checked> Cebola roxa</label>
                    <label><input type="checkbox" name="ingrediente" value="Alface" checked> Alface</label>
                    <label><input type="checkbox" name="ingrediente" value="Tomate" checked> Tomate</label>
                    <label><input type="checkbox" name="ingrediente" value="Maionese" checked> Maionese</label>
                </div>
            `;
        } else if (tipo === "kids") {
            document.getElementById("titulo-lanche").innerText = "CHAMA Kids";
            conteudoLanche.innerHTML = `
                <p class="preco">R$19,00</p>
                <p><strong>Ingredientes (não removíveis):</strong></p>
                <ul>
                    <li>Pão Kids (Brioche)</li>
                    <li>Hambúrguer 80g</li>
                </ul>
                <p><strong>Quais Ingredientes deseja? (desmarque o que você quer retirar)</strong></p>
                <div class="ingredientes">
                    <label><input type="checkbox" name="ingrediente" value="Queijo mussarela" checked> Queijo mussarela</label>
                    <label><input type="checkbox" name="ingrediente" value="Maionese" checked> Maionese</label>
                </div>
            `;
        }

        // Campo para o cliente informar o nome da pessoa que vai comer o lanche
        conteudoLanche.innerHTML += `
            <p><strong>Qual o nome da pessoa que vai comer esse lanche?</strong></p>
            <input type="text" id="nome-pessoa" placeholder="Nome da pessoa">
            <button onclick="adicionarAoCarrinho()">Adicionar ao Carrinho</button>
            <button onclick="voltarParaMenu()">Voltar</button>
        `;
    };

    // Função para adicionar o lanche ao carrinho
    window.adicionarAoCarrinho = function() {
        let pedido = "";
        let total = 0;
        const tipoLanche = document.getElementById("titulo-lanche").innerText;

        const tipo = document.querySelector("#personalizar-lanche input[name='tipo']:checked");
        if (tipo) {
            total = parseFloat(tipo.dataset.price || 0);
            pedido += `${tipoLanche} (${tipo.value})\n`;
        } else {
            total = 19.00; // Preço fixo para CHAMA Kids
            pedido += `${tipoLanche}\n`;
        }

        const paoEscolhido = document.querySelector("#personalizar-lanche input[name='pao']:checked");
        if (paoEscolhido) pedido += `Tipo de Pão: ${paoEscolhido.value}\n`;

        const ingredientesRemovidos = [];
        document.querySelectorAll("#personalizar-lanche .ingredientes input[type='checkbox']:not(:checked)").forEach(ingrediente => {
            ingredientesRemovidos.push(ingrediente.value);
        });
        if (ingredientesRemovidos.length > 0) pedido += `Ingredientes que retirou: ${ingredientesRemovidos.join(", ")}\n`;

        const nomePessoa = document.getElementById("nome-pessoa").value;
        if (nomePessoa) pedido += `Para: ${nomePessoa}\n`;

        carrinho.push({ pedido, total });
        totalCarrinho += total;
        atualizarCarrinho();
        alert("Item adicionado ao carrinho!");
        
        document.getElementById("personalizar-lanche").style.display = "none";
        document.getElementById("lanches-menu").style.display = "block";
    };

    // Função para retornar ao menu de lanches
    window.voltarParaMenu = function() {
        document.getElementById("personalizar-lanche").style.display = "none";
        document.getElementById("lanches-menu").style.display = "block";
    };

    // Atualiza o carrinho em tempo real e exibe os itens com um botão de remover
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

    window.verCarrinho = function() {
        carrinhoCompletoDiv.innerHTML = "";
        carrinho.forEach(item => {
            const p = document.createElement("p");
            p.innerText = item.pedido;
            carrinhoCompletoDiv.appendChild(p);
        });
        const totalFinal = document.createElement("p");
        totalFinal.innerText = `Total Final: R$${(totalCarrinho + taxaEntrega).toFixed(2)}`;
        totalFinal.style.fontWeight = "bold";
        carrinhoCompletoDiv.appendChild(totalFinal);
        carrinhoCompletoDiv.style.display = "block";
    };

    window.finalizarPedido = function() {
        let pedido = `Pedido de:\n`;
        carrinho.forEach(item => pedido += `${item.pedido}\n`);
        pedido += `Taxa de Entrega: R$${taxaEntrega.toFixed(2)}\nTotal Final: R$${(totalCarrinho + taxaEntrega).toFixed(2)}`;
        const mensagem = encodeURIComponent(pedido);
        window.open(`https://wa.me/48991758488?text=${mensagem}`, "_blank");
    };
});
