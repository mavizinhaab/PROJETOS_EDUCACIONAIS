/* =========================================================
   O ÚLTIMO EXPERIMENTO
   JAVASCRIPT — FUNCIONAMENTO DO JOGO
========================================================= */


/* =========================================================
   VARIÁVEIS
========================================================= */

let tempo = 600;

let intervalo = null;

let pistasEncontradas = 0;

let dicasUsadas = 0;

let inventario = [];

let computadorResolvido = false;

let fisicaResolvida = false;

let sequenciaResolvida = false;

let cofreAberto = false;


/* =========================================================
   INICIAR JOGO
========================================================= */

function iniciarJogo() {

    const inicio =
        document.getElementById("inicio");

    const jogo =
        document.getElementById("jogo");


    if (inicio) {
        inicio.classList.add("escondido");
    }

    if (jogo) {
        jogo.classList.remove("escondido");
    }


    iniciarCronometro();
}


/* =========================================================
   CRONÔMETRO
========================================================= */

function iniciarCronometro() {

    intervalo = setInterval(() => {

        tempo--;

        atualizarCronometro();


        if (tempo <= 0) {

            clearInterval(intervalo);

            tempoEsgotado();
        }

    }, 1000);
}


function atualizarCronometro() {

    const cronometro =
        document.getElementById("cronometro");


    if (!cronometro) {
        return;
    }


    const minutos =
        Math.floor(tempo / 60);

    const segundos =
        tempo % 60;


    cronometro.textContent =
        `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
}


/* =========================================================
   TEMPO ESGOTADO
========================================================= */

function tempoEsgotado() {

    abrirModal(`

        <h2>⏱️ TEMPO ESGOTADO</h2>

        <p>
            O sistema de segurança foi reiniciado.
        </p>

        <p>
            Você não conseguiu escapar do laboratório.
        </p>

        <br>

        <button
            class="botao-iniciar"
            onclick="location.reload()">

            TENTAR NOVAMENTE

        </button>

    `);
}


/* =========================================================
   ABRIR OBJETOS
========================================================= */

function abrirObjeto(objeto) {


    /* =====================================================
       PORTA
    ===================================================== */

    if (objeto === "porta") {

        abrirModal(`

            <h2>🚪 PORTA DE SEGURANÇA</h2>

            <p>
                A porta está bloqueada.
            </p>

            <p>
                Um código de quatro dígitos
                é necessário.
            </p>

            <div class="resposta">

                <input
                    id="codigoPorta"
                    maxlength="4"
                    inputmode="numeric"
                    placeholder="____">

                <button
                    onclick="verificarPorta()">

                    ABRIR

                </button>

            </div>

            <p id="mensagemPorta"></p>

        `);

        return;
    }


    /* =====================================================
       ESTANTE
    ===================================================== */

    if (objeto === "estante") {

        if (!inventario.includes("📄 Papel misterioso")) {

            adicionarItem("📄 Papel misterioso");

            adicionarPista();
        }


        abrirModal(`

            <h2>📚 ESTANTE</h2>

            <p>
                Entre os livros existe um papel antigo.
            </p>

            <p>
                Ele diz:
            </p>

            <p>
                <strong>
                    "A resposta está onde o tempo não para."
                </strong>
            </p>

            <p>
                Talvez seja uma pista relacionada
                ao relógio.
            </p>

        `);

        return;
    }


    /* =====================================================
       RELÓGIO
    ===================================================== */

    if (objeto === "relogio") {

        adicionarPista();

        abrirModal(`

            <h2>🕐 RELÓGIO</h2>

            <p>
                O relógio está parado.
            </p>

            <h2
                style="
                text-align:center;
                color:#55ddff;
                ">

                07:25

            </h2>

            <p>
                Atrás dele existe uma pequena inscrição:
            </p>

            <p>
                <strong>
                    "Nem todo número deve ser usado."
                </strong>
            </p>

        `);

        return;
    }


    /* =====================================================
       COMPUTADOR
    ===================================================== */

    if (objeto === "computador") {

        abrirModal(`

            <h2>💻 COMPUTADOR</h2>

            <p>
                O sistema está bloqueado.
            </p>

            <p>
                Uma operação aparece na tela:
            </p>

            <h2
                style="
                text-align:center;
                color:#9b6dff;
                ">

                2 + 5 × 3 = ?

            </h2>

            <p>
                Lembre-se:
                a multiplicação vem primeiro.
            </p>

            <div class="resposta">

                <input
                    id="respostaComputador"
                    inputmode="numeric"
                    placeholder="Resposta">

                <button
                    onclick="verificarComputador()">

                    ENVIAR

                </button>

            </div>

            <p id="mensagemComputador"></p>

        `);

        return;
    }


    /* =====================================================
       QUADRO DE FÍSICA
    ===================================================== */

    if (objeto === "quadro") {

        abrirModal(`

            <h2>⚛️ EQUAÇÃO DA FORÇA</h2>

            <p>
                O quadro apresenta:
            </p>

            <h2
                style="
                text-align:center;
                color:#55ddff;
                ">

                F = m × a

            </h2>

            <p>
                Massa = <strong>5 kg</strong>
            </p>

            <p>
                Força = <strong>20 N</strong>
            </p>

            <p>
                Qual é a aceleração?
            </p>

            <div class="resposta">

                <input
                    id="respostaFisica"
                    inputmode="decimal"
                    placeholder="m/s²">

                <button
                    onclick="verificarFisica()">

                    CALCULAR

                </button>

            </div>

            <p id="mensagemFisica"></p>

        `);

        return;
    }


    /* =====================================================
       FRASCO
    ===================================================== */

    if (objeto === "frasco") {

        adicionarPista();

        abrirModal(`

            <h2>🧪 FRASCO</h2>

            <p>
                Existe uma etiqueta no frasco.
            </p>

            <h2
                style="
                text-align:center;
                color:#9b6dff;
                ">

                T = 300 K

            </h2>

            <p>
                Embaixo está escrito:
            </p>

            <p>
                <strong>
                    "A temperatura também pode
                    esconder números."
                </strong>
            </p>

        `);

        return;
    }


    /* =====================================================
       PAPEL
    ===================================================== */

    if (objeto === "papel") {

        adicionarPista();

        abrirModal(`

            <h2>📄 ANOTAÇÃO</h2>

            <p>
                Uma sequência está escrita:
            </p>

            <h2
                style="
                text-align:center;
                color:#9b6dff;
                ">

                2 — 4 — 8 — 16 — ?

            </h2>

            <p>
                Qual é o próximo número?
            </p>

            <div class="resposta">

                <input
                    id="respostaSequencia"
                    inputmode="numeric"
                    placeholder="Resposta">

                <button
                    onclick="verificarSequencia()">

                    RESPONDER

                </button>

            </div>

            <p id="mensagemSequencia"></p>

        `);

        return;
    }


    /* =====================================================
       COFRE
    ===================================================== */

    if (objeto === "cofre") {

        abrirModal(`

            <h2>🔐 COFRE</h2>

            <p>
                Um pequeno teclado numérico
                está instalado no cofre.
            </p>

            <p>
                O código possui quatro dígitos.
            </p>

            <div class="resposta">

                <input
                    id="codigoCofre"
                    maxlength="4"
                    inputmode="numeric"
                    placeholder="____">

                <button
                    onclick="verificarCofre()">

                    DESBLOQUEAR

                </button>

            </div>

            <p id="mensagemCofre"></p>

        `);

    }
}


/* =========================================================
   COMPUTADOR
========================================================= */

function verificarComputador() {

    const campo =
        document.getElementById(
            "respostaComputador"
        );


    const mensagem =
        document.getElementById(
            "mensagemComputador"
        );


    const resposta =
        campo.value.trim();


    if (resposta === "17") {

        computadorResolvido = true;


        adicionarItem(
            "💻 Computador desbloqueado"
        );


        adicionarPista();


        atualizarMissao("missao1");


        mensagem.className = "sucesso";


        mensagem.innerHTML = `
            ✓ CORRETO!
            <br><br>
            O computador foi desbloqueado.
            <br>
            Uma nova pista foi encontrada.
        `;

    } else {

        mensagem.className = "erro";

        mensagem.textContent =
            "✗ Resposta incorreta.";
    }
}


/* =========================================================
   FÍSICA
========================================================= */

function verificarFisica() {

    const campo =
        document.getElementById(
            "respostaFisica"
        );


    const mensagem =
        document.getElementById(
            "mensagemFisica"
        );


    const resposta =
        campo.value.trim();


    if (resposta === "4") {

        fisicaResolvida = true;


        adicionarItem(
            "⚛️ Pista encontrada: 4"
        );


        adicionarPista();


        atualizarMissao("missao2");


        mensagem.className = "sucesso";


        mensagem.innerHTML = `
            ✓ CORRETO!
            <br><br>
            F = m × a
            <br>
            20 = 5 × a
            <br>
            a = 4 m/s²
        `;

    } else {

        mensagem.className = "erro";

        mensagem.textContent =
            "✗ Resposta incorreta.";
    }
}


/* =========================================================
   SEQUÊNCIA
========================================================= */

function verificarSequencia() {

    const campo =
        document.getElementById(
            "respostaSequencia"
        );


    const mensagem =
        document.getElementById(
            "mensagemSequencia"
        );


    const resposta =
        campo.value.trim();


    if (resposta === "32") {

        sequenciaResolvida = true;


        adicionarItem(
            "🔢 Sequência resolvida"
        );


        adicionarPista();


        mensagem.className = "sucesso";


        mensagem.innerHTML = `
            ✓ CORRETO!
            <br><br>
            Cada número é multiplicado por 2.
        `;

    } else {

        mensagem.className = "erro";

        mensagem.textContent =
            "✗ Observe novamente a sequência.";
    }
}


/* =========================================================
   COFRE
========================================================= */

function verificarCofre() {

    const campo =
        document.getElementById(
            "codigoCofre"
        );


    const mensagem =
        document.getElementById(
            "mensagemCofre"
        );


    const codigo =
        campo.value.trim();


    if (codigo === "4729") {

        cofreAberto = true;


        adicionarItem(
            "🔓 Cofre desbloqueado"
        );


        atualizarMissao("missao3");


        mensagem.className = "sucesso";


        mensagem.textContent =
            "✓ COFRE DESBLOQUEADO!";


    } else {

        mensagem.className = "erro";

        mensagem.textContent =
            "✗ Código incorreto.";
    }
}


/* =========================================================
   PORTA
========================================================= */

function verificarPorta() {

    const campo =
        document.getElementById(
            "codigoPorta"
        );


    const mensagem =
        document.getElementById(
            "mensagemPorta"
        );


    const codigo =
        campo.value.trim();


    if (codigo === "4729") {

        mensagem.className = "sucesso";


        mensagem.innerHTML = `
            ✓ CÓDIGO CORRETO!
            <br><br>
            Sistema de segurança desativado.
        `;


        setTimeout(() => {

            vencer();

        }, 1500);

    } else {

        mensagem.className = "erro";

        mensagem.textContent =
            "✗ Código incorreto.";
    }
}


/* =========================================================
   INVENTÁRIO
========================================================= */

function adicionarItem(item) {

    if (inventario.includes(item)) {
        return;
    }


    inventario.push(item);


    const area =
        document.getElementById(
            "inventario"
        );


    if (!area) {
        return;
    }


    const vazio =
        area.querySelector(".vazio");


    if (vazio) {
        vazio.remove();
    }


    const novoItem =
        document.createElement("div");


    novoItem.className = "item";

    novoItem.textContent = item;


    area.appendChild(novoItem);
}


/* =========================================================
   CONTADOR DE PISTAS
========================================================= */

function adicionarPista() {

    pistasEncontradas++;


    const contador =
        document.getElementById(
            "contadorPistas"
        );


    if (contador) {

        contador.textContent =
            pistasEncontradas;
    }
}


/* =========================================================
   MISSÕES
========================================================= */

function atualizarMissao(id) {

    const missao =
        document.getElementById(id);


    if (!missao) {
        return;
    }


    missao.classList.add("concluida");


    missao.textContent =
        missao.textContent
        .replace("○", "✓");
}


/* =========================================================
   SISTEMA DE DICAS
========================================================= */

function mostrarDica() {

    dicasUsadas++;


    let dica;


    if (!computadorResolvido) {

        dica = `
            Comece observando o computador.
            <br><br>
            A operação na tela possui
            uma regra matemática importante.
        `;

    }

    else if (!fisicaResolvida) {

        dica = `
            Observe o quadro.
            <br><br>
            A fórmula é:
            <br><br>
            <strong>F = m × a</strong>
        `;

    }

    else if (!sequenciaResolvida) {

        dica = `
            Observe:
            <br><br>
            2 → 4 → 8 → 16
            <br><br>
            Existe um padrão.
        `;

    }

    else {

        dica = `
            Você já encontrou várias pistas.
            <br><br>
            Reúna os números descobertos
            e pense no código final.
        `;
    }


    abrirModal(`

        <h2>💡 PISTA</h2>

        <p>
            ${dica}
        </p>

    `);
}


/* =========================================================
   MODAL
========================================================= */

function abrirModal(conteudo) {

    const modal =
        document.getElementById(
            "modal"
        );


    const texto =
        document.getElementById(
            "modalTexto"
        );


    if (!modal || !texto) {
        return;
    }


    texto.innerHTML = conteudo;


    modal.classList.remove(
        "escondido"
    );
}


function fecharModal() {

    const modal =
        document.getElementById(
            "modal"
        );


    if (modal) {

        modal.classList.add(
            "escondido"
        );
    }
}


/* =========================================================
   TECLA ESC
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            fecharModal();
        }
    }
);


/* =========================================================
   VITÓRIA
========================================================= */

function vencer() {

    clearInterval(intervalo);


    fecharModal();


    const jogo =
        document.getElementById(
            "jogo"
        );


    const vitoria =
        document.getElementById(
            "vitoria"
        );


    if (jogo) {

        jogo.classList.add(
            "escondido"
        );
    }


    if (vitoria) {

        vitoria.classList.remove(
            "escondido"
        );
    }


    const minutos =
        Math.floor(tempo / 60);


    const segundos =
        tempo % 60;


    const tempoFinal =
        document.getElementById(
            "tempoFinal"
        );


    const pistasFinal =
        document.getElementById(
            "pistasFinal"
        );


    if (tempoFinal) {

        tempoFinal.textContent =
            `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
    }


    if (pistasFinal) {

        pistasFinal.textContent =
            pistasEncontradas;
    }
}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "🌌 O Último Experimento carregado."
        );

        console.log(
            "⚛️ Sistema de Física online."
        );

    }
);