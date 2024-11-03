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
                <label><input type="radio" name="ponto" value="Mal Passado" checked> Mal Passado</label>
                <label><input type="radio" name="ponto" value="Ao Ponto"> Ao Ponto</label>
                <label><input type="radio" name="ponto" value="Bem Passado"> Bem Passado</label>
                <p><strong>Quais Ingredientes Deseja? (desmarque o que você quer retirar)</strong></p>
                <div class="ingredientes">
                    <label><input type="checkbox" name="ingrediente" value="Queijo mussarela" checked> Queijo mussarela</label>
                    <label><input type="checkbox" name="ingrediente" value="Cebola roxa" checked> Cebola roxa</label>
                    <label><input type="checkbox" name="ingrediente" value="Alface" checked> Alface</label>
                    <label><input type="checkbox" name="ingrediente" value="Tomate" checked> Tomate</label>
                    <label><input type="checkbox" name="ingrediente" value="Maionese" checked> Maionese</label>
                </div>
                <p><strong>Turbine o seu lanche com nosso adicionais:</strong></p>
                <div class="adicionais">
                    <label><input type="checkbox" name="adicional" value="Bacon" data-price="5"> Bacon - R$5,00</label>
                    <label><input type="checkbox" name="adicional" value="Cheddar cremoso" data-price="4"> Cheddar cremoso - R$4,00</label>
                    <label><input type="checkbox" name="adicional" value="Maionese da casa" data-price="2"> Maionese da casa - R$2,00</label>
                </div>
                <p><strong>Vai uma Bebida para Fechar o Combo?</strong></p>
                <div class="bebidas">
                    <label><input type="checkbox" name="bebida" value="Coca Cola 310ml" data-price="6"> Coca Cola 310ml - R$6,00</label>
                    <label><input type="checkbox" name="bebida" value="Guaraná Antártica 310ml" data-price="6"> Guaraná Antártica 310ml - R$6,00</label>
                    <label><input type="checkbox" name="bebida" value="Água com Gás" data-price="3"> Água com Gás - R$3,00</label>
                </div>
            `;
        } else if (tipo === "bacon") {
            document.getElementById("titulo-lanche").innerText = "CHAMA Bacon";
            conteudoLanche.innerHTML = `
                <p><strong>Escolha o Tipo:</strong></p>
                <label><input type="radio" name="tipo" value="Simples" data-price="30" checked> Simples - R$30,00</label>
                <label><input type="radio" name="tipo" value="Duplo" data-price="37"> Duplo - R$37,00</label>
                <p><strong>Ponto da Carne:</strong></p>
                <label><input type="radio" name="ponto" value="Mal Passado" checked> Mal Passado</label>
                <label><input type="radio" name="ponto" value="Ao Ponto"> Ao Ponto</label>
                <label><input type="radio" name="ponto" value="Bem Passado"> Bem Passado</label>
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
                <p><strong>Turbine o seu lanche com nosso adicionais:</strong></p>
                <div class="adicionais">
                    <label><input type="checkbox" name="adicional" value="Bacon" data-price="5"> Bacon - R$5,00</label>
                    <label><input type="checkbox" name="adicional" value="Cheddar cremoso" data-price="4"> Cheddar cremoso - R$4,00</label>
                    <label><input type="checkbox" name="adicional" value="Maionese da casa" data-price="2"> Maionese da casa - R$2,00</label>
                </div>
                <p><strong>Vai uma Bebida para Fechar o Combo?</strong></p>
                <div class="bebidas">
                    <label><input type="checkbox" name="bebida" value="Coca Cola 310ml" data-price="6"> Coca Cola 310ml - R$6,00</label>
                    <label><input type="checkbox" name="bebida" value="Guaraná Antártica 310ml" data-price="6"> Guaraná Antártica 310ml - R$6,00</label>
                    <label><input type="checkbox" name="bebida" value="Água com Gás" data-price="3"> Água com Gás - R$3,00</label>
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
                <p><strong>Adicionais:</strong></p>
                <div class="adicionais">
                    <label><input type="checkbox" name="adicional" value="Bacon" data-price="5"> Bacon - R$5,00</label>
                    <label><input type="checkbox" name="adicional" value="Cheddar cremoso" data-price="4"> Cheddar cremoso - R$4,00</label>
                    <label><input type="checkbox" name="adicional" value="Maionese da casa" data-price="2"> Maionese da casa - R$2,00</label>
                </div>
                <p><strong>Vai uma Bebida para Fechar o Combo?</strong></p>
                <div class="bebidas">
                    <label><input type="checkbox" name="bebida" value="Coca Cola 310ml" data-price="6"> Coca Cola 310ml - R$6,00</label>
                    <label><input type="checkbox" name="bebida" value="Guaraná Antártica 310ml" data-price="6"> Guaraná Antártica 310ml - R$6,00</label>
                    <label><input type="checkbox" name="bebida" value="Água com Gás" data-price="3"> Água com Gás - R$3,00</label>
                </div>
            `;
        }

        conteudoLanche.innerHTML += `
            <p><strong>Quem vai comer esse lanche?</strong></p>
            <input type="text" id="nome-pessoa" placeholder="Nome da pessoa">
        `;
    };
  
    window.adicionarAoCarrinho = function() {
    let pedido = "";
    let total = 0;
    const tipoLanche = document.getElementById("titulo-lanche").innerText;

    const tipo = document.querySelector("#personalizar-lanche input[name='tipo']:checked");
    if (tipo) {
        total = parseFloat(tipo.dataset.price || 0);
        pedido += `${tipoLanche} (${tipo.value})\n`;
    } else {
        total = 19; // Preço fixo para CHAMA Kids
        pedido += `${tipoLanche}\n`;
    }

    const pontoCarne = document.querySelector("#personalizar-lanche input[name='ponto']:checked");
    if (pontoCarne) {
        pedido += `Ponto da Carne: ${pontoCarne.value}\n`;
    }

    const paoEscolhido = document.querySelector("#personalizar-lanche input[name='pao']:checked");
    if (paoEscolhido) pedido += `Tipo de Pão: ${paoEscolhido.value}\n`;

    const ingredientesRemovidos = [];
    document.querySelectorAll("#personalizar-lanche .ingredientes input[type='checkbox']:not(:checked)").forEach(ingrediente => {
        ingredientesRemovidos.push(ingrediente.value);
    });
    if (ingredientesRemovidos.length > 0) pedido += `Ingredientes que retirou: ${ingredientesRemovidos.join(", ")}\n`;

    const adicionaisSelecionados = [];
    document.querySelectorAll("#personalizar-lanche .adicionais input[type='checkbox']:checked").forEach(adicional => {
        adicionaisSelecionados.push(adicional.value);
        total += parseFloat(adicional.dataset.price || 0);
    });
    if (adicionaisSelecionados.length > 0) pedido += `Adicionais: ${adicionaisSelecionados.join(", ")}\n`;

    const bebidasSelecionadas = [];
    document.querySelectorAll("#personalizar-lanche .bebidas input[type='checkbox']:checked").forEach(bebida => {
        bebidasSelecionadas.push(bebida.value);
        total += parseFloat(bebida.dataset.price || 0);
    });
    if (bebidasSelecionadas.length > 0) pedido += `Bebidas: ${bebidasSelecionadas.join(", ")}\n`;

    const nomePessoa = document.getElementById("nome-pessoa").value;
    if (nomePessoa) pedido += `Para: ${nomePessoa}\n`;

    carrinho.push({ nomeLanche: tipoLanche, pedido, total });
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
        li.innerHTML = `<strong>${item.nomeLanche}</strong> - R$${item.total.toFixed(2)}<br>${item.pedido}`;
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
    const nomeCliente = document.getElementById("name").value.trim();
    const whatsappCliente = document.getElementById("whatsapp").value.trim();

    let pedido = `*Comanda Chama Burguer*\n\n`;
    pedido += `*Nome:* ${nomeCliente}\n`;
    pedido += `*WhatsApp:* ${whatsappCliente}\n\n`;

    carrinho.forEach((item, index) => {
        pedido += `*Lanche ${index + 1}*\n`;
        pedido += `*Nome do Lanche:* ${item.nomeLanche}\n`;
        pedido += `*Tipo de Pão:* ${item.paoEscolhido || 'Padrão'}\n`;
        pedido += `*Ponto da Carne:* ${item.pontoCarne || 'Não especificado'}\n`;

        if (item.ingredientesRemovidos && item.ingredientesRemovidos.length > 0) {
            pedido += `*Ingredientes para RETIRAR:* ${item.ingredientesRemovidos.join(', ')}\n`;
        }

        if (item.adicionaisSelecionados && item.adicionaisSelecionados.length > 0) {
            pedido += `*Adicionais:* ${item.adicionaisSelecionados.join(', ')}\n`;
        }

        if (item.bebidasSelecionadas && item.bebidasSelecionadas.length > 0) {
            pedido += `*Bebidas:* ${item.bebidasSelecionadas.join(', ')}\n`;
        }

        pedido += `*Esse lanche é para:* ${item.nomePessoa || 'Não especificado'}\n`;
        pedido += `*Valor:* R$${item.total.toFixed(2)}\n\n`;
    });

    pedido += `*Taxa de Entrega:* R$${taxaEntrega.toFixed(2)}\n`;
    pedido += `*Total do Pedido:* R$${(totalCarrinho + taxaEntrega).toFixed(2)}\n\n`;
    pedido += `Agradecemos por escolher o Chama Burguer!`;

    const mensagem = encodeURIComponent(pedido);
    window.open(`https://wa.me/48991758488?text=${mensagem}`, "_blank");
};
