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
            document.getElementById("titulo-lanche").innerText = "Personalizar CHAMA Clássico";
            conteudoLanche.innerHTML = `
                <p><strong>Escolha o Tipo:</strong></p>
                <label><input type="radio" name="tipo" value="Simples" data-price="26" checked> Simples - R$26,00</label>
                <label><input type="radio" name="tipo" value="Duplo" data-price="33"> Duplo - R$33,00</label>
                <p><strong>Pão:</strong></p>
                <label><input type="radio" name="pao" value="Brioche" checked> Brioche</label>
                <label><input type="radio" name="pao" value="Parmesão"> Parmesão</label>
                <p><strong>Quais Ingredientes Deseja?</strong></p>
                <div class="ingredientes">
                    <label><input type="checkbox" name="ingrediente" value="Queijo mussarela" checked> Queijo mussarela</label>
                    <label><input type="checkbox" name="ingrediente" value="Cebola roxa" checked> Cebola roxa</label>
                    <label><input type="checkbox" name="ingrediente" value="Alface" checked> Alface</label>
                    <label><input type="checkbox" name="ingrediente" value="Tomate" checked> Tomate</label>
                    <label><input type="checkbox" name="ingrediente" value="Maionese" checked> Maionese</label>
                </div>
            `;
        } else if (tipo === "bacon") {
            document.getElementById("titulo-lanche").innerText = "Personalizar CHAMA Bacon";
            conteudoLanche.innerHTML = `
                <p><strong>Escolha o Tipo:</strong></p>
                <label><input type="radio" name="tipo" value="Simples" data-price="30" checked> Simples - R$30,00</label>
                <label><input type="radio" name="tipo" value="Duplo" data-price="37"> Duplo - R$37,00</label>
                <p><strong>Pão:</strong></p>
                <label><input type="radio" name="pao" value="Brioche" checked> Brioche</label>
                <label><input type="radio" name="pao" value="Parmesão"> Parmesão</label>
                <p><strong>Quais Ingredientes Deseja?</strong></p>
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
            document.getElementById("titulo-lanche").innerText = "Personalizar CHAMA Kids";
            conteudoLanche.innerHTML = `
                <p class="preco">R$19,00</p>
                <p><strong>Ingredientes:</strong></p>
                <div class="ingredientes">
                    <label><input type="checkbox" name="ingrediente" value="Pão Kids (Brioche)" checked> Pão Kids (Brioche)</label>
                    <label><input type="checkbox" name="ingrediente" value="Hambúrguer 80g" checked> Hambúrguer 80g</label>
                    <label><input type="checkbox" name="ingrediente" value="Queijo mussarela" checked> Queijo mussarela</label>
                    <label><input type="checkbox" name="ingrediente" value="Maionese" checked> Maionese</label>
                </div>
            `;
        }
    };

    // Função para adicionar o lanche ao carrinho
    window.adicionarAoCarrinho = function() {
        let pedido = "";
        let total = parseFloat(document.querySelector("#personalizar-lanche input[name='tipo']:checked")?.dataset.price || 19);

        // Nome do lanche e tipo (Simples/Duplo)
        const tipoLanche = document.querySelector("#personalizar-lanche input[name='tipo']:checked").value;
        const nomeLanche = document.getElementById("titulo-lanche").innerText;
        pedido += `${nomeLanche} (${tipoLanche})\n`;

        // Tipo de pão
        const paoEscolhido = document.querySelector("#personalizar-lanche input[name='pao']:checked").value;
        pedido += `Tipo de Pão: ${paoEscolhido}\n`;

        // Ingredientes removidos
        const ingredientesRemovidos = [];
        document.querySelectorAll("#personalizar-lanche .ingredientes input[type='checkbox']:not(:checked)").forEach(ingrediente => {
            ingredientesRemovidos.push(ingrediente.value);
        });
        if (ingredientesRemovidos.length > 0) {
            pedido += `Ingredientes que retirou: ${ingredientesRemovidos.join(", ")}\n`;
        }

        // Adicionais
        const adicionaisEscolhidos = [];
        document.querySelectorAll("#personalizar-lanche input.extra:checked").forEach(adicional => {
            adicionaisEscolhidos.push(adicional.value);
            total += parseFloat(adicional.getAttribute("data-price"));
        });
        if (adicionaisEscolhidos.length > 0) {
            pedido += `Adicionais: ${adicionaisEscolhidos.join(", ")}\n`;
        }

        // Bebida
        const bebidaEscolhida = [];
        document.querySelectorAll("#personalizar-lanche input.drink:checked").forEach(bebida => {
            bebidaEscolhida.push(bebida.value);
            total += parseFloat(bebida.getAttribute("data-price"));
        });
        if (bebidaEscolhida.length > 0) {
            pedido += `Bebida: ${bebidaEscolhida.join(", ")}\n`;
        }

        // Adiciona o total do lanche, mas só mostra ao final se houver mais de um lanche
        carrinho.push({ pedido, total });
        totalCarrinho += total;

        atualizarCarrinho();
        alert("Item adicionado ao carrinho!");

        // Zerar os campos adicionais e bebidas para o próximo lanche
        document.querySelectorAll("#personalizar-lanche input[type='checkbox']").forEach(input => input.checked = false);
        document.getElementById("personalizar-lanche").style.display = "none";
        document.getElementById("lanches-menu").style.display = "block";
    };

    // Atualiza o carrinho em tempo real
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

    // Função para visualizar o carrinho completo
    window.verCarrinho = function() {
        carrinhoCompletoDiv.innerHTML = ""; // Limpa o carrinho completo anterior

        carrinho.forEach(item => {
            const p = document.createElement("p");
            p.innerText = item.pedido;
            carrinhoCompletoDiv.appendChild(p);
        });

        const totalFinal = document.createElement("p");
        totalFinal.innerText = `Total Final: R$${(totalCarrinho + taxaEntrega).toFixed(2)}`;
        totalFinal.style.fontWeight = "bold";
        carrinhoCompletoDiv.appendChild(totalFinal);

        carrinhoCompletoDiv.style.display = "block"; // Exibe a div do carrinho completo
    };

    window.finalizarPedido = function() {
        let pedido = "Pedido:\n";
        carrinho.forEach(item => {
            pedido += `${item.pedido}\n`;
        });
        pedido += `\nTotal: R$${totalCarrinho.toFixed(2)}`;
        pedido += `\nTaxa de Entrega: R$${taxaEntrega.toFixed(2)}`;
        pedido += `\nTotal Final: R$${(totalCarrinho + taxaEntrega).toFixed(2)}`;

        const name = document.getElementById("name").value;
        const whatsapp = document.getElementById("whatsapp").value;
        const mensagem = encodeURIComponent(`Pedido de: ${name}\nWhatsApp: ${whatsapp}\n\n${pedido}`);
        
        window.open(`https://wa.me/48991758488?text=${mensagem}`, "_blank");
    };
});
