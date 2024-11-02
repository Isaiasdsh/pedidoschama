document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-button");
    const carrinhoLista = document.getElementById("carrinho-lista");
    const carrinhoTotal = document.getElementById("carrinho-total");
    let carrinho = [];
    let totalCarrinho = 0;

    startButton.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(".welcome-screen").style.display = "none";
        document.getElementById("lanches-menu").style.display = "block";
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
        let pedido = "Lanche: ";
        document.querySelectorAll("#personalizar-lanche input:checked").forEach(item => {
            pedido += `${item.value}, `;
        });
        let total = parseFloat(document.querySelector("#personalizar-lanche input[name='tipo']:checked")?.dataset.price || 19);
        totalCarrinho += total;
        carrinho.push({ pedido, total });

        alert("Item adicionado ao carrinho!");
        document.getElementById("personalizar-lanche").style.display = "none";
        document.getElementById("lanches-menu").style.display = "block";
    };

    window.finalizarPedido = function() {
        // Código de finalização de pedido para WhatsApp
    };
});

