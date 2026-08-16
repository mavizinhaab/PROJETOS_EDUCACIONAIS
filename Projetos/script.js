/* =====================================================
   VARIÁVEIS
===================================================== */

let expressaoAtual = "";
let resultadoAtual = "0";

let modo = "DEG";


/* =====================================================
   ATUALIZAR DISPLAY
===================================================== */

function atualizarDisplay() {

    document.getElementById("expressao").textContent =
        expressaoAtual || "0";

    document.getElementById("resultado").textContent =
        resultadoAtual;
}


/* =====================================================
   ADICIONAR NÚMERO / OPERADOR
===================================================== */

function adicionar(valor) {

    /*
        Se a calculadora estava mostrando erro,
        começamos uma nova expressão.
    */

    if (resultadoAtual === "Erro") {

        expressaoAtual = "";

        resultadoAtual = "0";
    }


    /*
        Se acabamos de calcular e o usuário
        começa digitando um número, começamos
        uma nova conta.
    */

    if (
        resultadoAtual !== "0" &&
        expressaoAtual === ""
    ) {

        resultadoAtual = "0";
    }


    expressaoAtual += valor;

    atualizarDisplay();
}


/* =====================================================
   LIMPAR
===================================================== */

function limpar() {

    expressaoAtual = "";

    resultadoAtual = "0";

    atualizarDisplay();

    mostrarInicio();
}


/* =====================================================
   APAGAR ÚLTIMO
===================================================== */

function apagarUltimo() {

    expressaoAtual =
        expressaoAtual.slice(0, -1);

    resultadoAtual = "0";

    atualizarDisplay();
}


/* =====================================================
   DEG / RAD
===================================================== */

function alternarModo() {

    if (modo === "DEG") {

        modo = "RAD";

    } else {

        modo = "DEG";
    }


    document.getElementById("modo").textContent =
        modo;
}


/* =====================================================
   CONVERTER ÂNGULO
===================================================== */

function converterAngulo(numero) {

    if (modo === "DEG") {

        return numero * Math.PI / 180;
    }

    return numero;
}


/* =====================================================
   AVALIAR EXPRESSÃO MATEMÁTICA
===================================================== */

function avaliarExpressao(expressao) {

    /*
        Substituições matemáticas.
    */

    expressao = expressao
        .replace(/π/g, "Math.PI")
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/e/g, "Math.E");


    /*
        Segurança básica:
        somente números, operadores,
        parênteses e Math.
    */

    if (
        !/^[0-9+\-*/().\sMathPIE]+$/.test(
            expressao
        )
    ) {

        throw new Error("Expressão inválida");
    }


    return Function(
        '"use strict"; return (' +
        expressao +
        ')'
    )();
}


/* =====================================================
   CALCULAR
===================================================== */

function calcular() {

    if (!expressaoAtual) {

        return;
    }


    try {

        let expressao =
            expressaoAtual;


        /*
            Corrige operadores.
        */

        expressao =
            expressao.replace(/×/g, "*");

        expressao =
            expressao.replace(/÷/g, "/");


        /*
            Fecha parênteses automaticamente.
        */

        let abertos =
            (expressao.match(/\(/g) || []).length;

        let fechados =
            (expressao.match(/\)/g) || []).length;


        while (fechados < abertos) {

            expressao += ")";

            fechados++;
        }


        /*
            POTÊNCIA AO QUADRADO
        */

        expressao =
            expressao.replace(
                /(\([^()]+\)|\d+(?:\.\d+)?)²/g,
                "($1)**2"
            );


        /*
            POTENCIAÇÃO xʸ
        */

        expressao =
            expressao.replace(
                /(\([^()]+\)|\d+(?:\.\d+)?)\^(\([^()]+\)|\d+(?:\.\d+)?)/g,
                "($1)**($2)"
            );


        /*
            PROCESSAR FUNÇÕES
        */

        expressao =
            processarFuncoes(expressao);


        /*
            PI
        */

        expressao =
            expressao.replace(
                /π/g,
                "Math.PI"
            );


        /*
            E
        */

        expressao =
            expressao.replace(
                /(^|[^a-zA-Z])e([^a-zA-Z]|$)/g,
                "$1Math.E$2"
            );


        /*
            CALCULAR
        */

        let resultado =
            Function(
                '"use strict"; return (' +
                expressao +
                ')'
            )();


        /*
            Verificar resultado.
        */

        if (
            typeof resultado !== "number" ||
            !Number.isFinite(resultado)
        ) {

            throw new Error();
        }


        resultadoAtual =
            formatarNumero(resultado);


        atualizarDisplay();

    } catch (erro) {

        console.error(erro);

        resultadoAtual = "Erro";

        atualizarDisplay();
    }
}


/* =====================================================
   PROCESSAR FUNÇÕES
===================================================== */

function processarFuncoes(expressao) {


    /*
        SIN
    */

    expressao =
        expressao.replace(
            /sin\(([^()]*)\)/g,
            function (_, valor) {

                const numero =
                    avaliarExpressao(valor);

                const angulo =
                    converterAngulo(numero);

                return Math.sin(angulo);
            }
        );


    /*
        COS
    */

    expressao =
        expressao.replace(
            /cos\(([^()]*)\)/g,
            function (_, valor) {

                const numero =
                    avaliarExpressao(valor);

                const angulo =
                    converterAngulo(numero);

                return Math.cos(angulo);
            }
        );


    /*
        TAN
    */

    expressao =
        expressao.replace(
            /tan\(([^()]*)\)/g,
            function (_, valor) {

                const numero =
                    avaliarExpressao(valor);

                const angulo =
                    converterAngulo(numero);

                const resultado =
                    Math.tan(angulo);


                /*
                    Evita valores absurdamente
                    grandes perto de 90°.
                */

                if (
                    Math.abs(resultado) >
                    1e10
                ) {

                    throw new Error();
                }


                return resultado;
            }
        );


    /*
        RAIZ
    */

    expressao =
        expressao.replace(
            /sqrt\(([^()]*)\)/g,
            function (_, valor) {

                const numero =
                    avaliarExpressao(valor);


                if (numero < 0) {

                    throw new Error();
                }


                return Math.sqrt(numero);
            }
        );


    /*
        LOG
    */

    expressao =
        expressao.replace(
            /log\(([^()]*)\)/g,
            function (_, valor) {

                const numero =
                    avaliarExpressao(valor);


                if (numero <= 0) {

                    throw new Error();
                }


                return Math.log10(numero);
            }
        );


    /*
        LN
    */

    expressao =
        expressao.replace(
            /ln\(([^()]*)\)/g,
            function (_, valor) {

                const numero =
                    avaliarExpressao(valor);


                if (numero <= 0) {

                    throw new Error();
                }


                return Math.log(numero);
            }
        );


    return expressao;
}


/* =====================================================
   FORMATAR NÚMERO
===================================================== */

function formatarNumero(numero) {

    /*
        Corrigir números muito próximos de zero.
    */

    if (
        Math.abs(numero) <
        0.0000000001
    ) {

        numero = 0;
    }


    /*
        Inteiros.
    */

    if (
        Number.isInteger(numero)
    ) {

        return numero.toString();
    }


    /*
        Limitar casas decimais.
    */

    return parseFloat(
        numero.toFixed(10)
    ).toString();
}


/* =====================================================
   USAR FUNÇÃO
===================================================== */

function usarFuncao(nome) {


    /*
        MOSTRAR INFORMAÇÃO
    */

    mostrarInformacao(nome);


    /*
        Se não existe número,
        criamos a função vazia.
    */

    if (!expressaoAtual) {

        if (nome === "sqrt") {

            expressaoAtual =
                "sqrt(";

        } else {

            expressaoAtual =
                nome + "(";
        }

        resultadoAtual = "0";

        atualizarDisplay();

        return;
    }


    /*
        Se já existe uma expressão,
        colocamos a função em volta dela.
    */

    if (nome === "sqrt") {

        expressaoAtual =
            "sqrt(" +
            expressaoAtual +
            ")";

    }

    else if (nome === "square") {

        expressaoAtual =
            "(" +
            expressaoAtual +
            ")²";

    }

    else {

        expressaoAtual =
            nome +
            "(" +
            expressaoAtual +
            ")";
    }


    resultadoAtual = "0";

    atualizarDisplay();
}


/* =====================================================
   POTÊNCIA
===================================================== */

function inserirPotencia() {

    mostrarInformacao("potencia");


    if (!expressaoAtual) {

        return;
    }


    expressaoAtual += "^";

    resultadoAtual = "0";

    atualizarDisplay();
}


/* =====================================================
   PI
===================================================== */

function inserirPi() {

    mostrarInformacao("pi");


    if (
        resultadoAtual !== "0" &&
        expressaoAtual === ""
    ) {

        resultadoAtual = "0";
    }


    expressaoAtual += "π";

    atualizarDisplay();
}


/* =====================================================
   NÚMERO E
===================================================== */

function inserirE() {

    expressaoAtual += "e";

    resultadoAtual = "0";

    atualizarDisplay();
}


/* =====================================================
   INFORMAÇÕES
===================================================== */

const informacoes = {


    sin: {

        titulo: "Seno — sin",

        icone: "sin",

        descricao:
            "O seno é uma função trigonométrica que relaciona um ângulo aos lados de um triângulo retângulo.",

        exemplo:
            "sin(30°) = 0,5",

        como:
            "Digite o ângulo, pressione sin e depois pressione =."
    },


    cos: {

        titulo: "Cosseno — cos",

        icone: "cos",

        descricao:
            "O cosseno é uma função trigonométrica que relaciona um ângulo aos lados de um triângulo retângulo.",

        exemplo:
            "cos(60°) = 0,5",

        como:
            "Digite o ângulo, pressione cos e depois pressione =."
    },


    tan: {

        titulo: "Tangente — tan",

        icone: "tan",

        descricao:
            "A tangente representa a razão entre o cateto oposto e o cateto adjacente de um triângulo retângulo.",

        exemplo:
            "tan(45°) = 1",

        como:
            "Digite o ângulo, pressione tan e depois pressione =."
    },


    pi: {

        titulo: "Número Pi — π",

        icone: "π",

        descricao:
            "O número π é uma constante matemática aproximadamente igual a 3,14159. Ele aparece frequentemente em cálculos envolvendo círculos.",

        exemplo:
            "π ≈ 3,14159265",

        como:
            "Pressione π para inserir o número Pi na expressão."
    },


    sqrt: {

        titulo: "Raiz quadrada — √",

        icone: "√",

        descricao:
            "A raiz quadrada de um número é o valor que, multiplicado por ele mesmo, produz o número original.",

        exemplo:
            "√25 = 5",

        como:
            "Digite o número, pressione √ e depois pressione =."
    },


    square: {

        titulo: "Potência ao quadrado — x²",

        icone: "x²",

        descricao:
            "Essa função eleva um número ao expoente 2.",

        exemplo:
            "5² = 25",

        como:
            "Digite o número, pressione x² e depois pressione =."
    },


    potencia: {

        titulo: "Potenciação — xʸ",

        icone: "xʸ",

        descricao:
            "A potenciação representa uma multiplicação repetida de uma base por ela mesma.",

        exemplo:
            "2³ = 8",

        como:
            "Digite a base, pressione xʸ, digite o expoente e pressione =."
    },


    log: {

        titulo: "Logaritmo — log",

        icone: "log",

        descricao:
            "O logaritmo decimal representa o expoente ao qual a base 10 deve ser elevada para produzir determinado número.",

        exemplo:
            "log(100) = 2",

        como:
            "Digite o número, pressione log e depois pressione =."
    },


    ln: {

        titulo: "Logaritmo natural — ln",

        icone: "ln",

        descricao:
            "O logaritmo natural utiliza como base o número de Euler, representado pela letra e.",

        exemplo:
            "ln(e) = 1",

        como:
            "Digite o número, pressione ln e depois pressione =."
    }

};


/* =====================================================
   MOSTRAR INFORMAÇÃO
===================================================== */

function mostrarInformacao(tipo) {

    const info =
        informacoes[tipo];


    if (!info) {

        return;
    }


    document.getElementById(
        "informacao"
    ).innerHTML = `

        <div class="info-conteudo">

            <div class="info-icone">
                ${info.icone}
            </div>

            <h3>
                ${info.titulo}
            </h3>

            <p>
                ${info.descricao}
            </p>

            <div class="exemplo">

                <strong>
                    Exemplo
                </strong>

                <code>
                    ${info.exemplo}
                </code>

            </div>

            <div class="como-usar">

                <strong>
                    Como usar
                </strong>

                <ol>

                    <li>
                        ${info.como}
                    </li>

                </ol>

            </div>

        </div>

    `;
}


/* =====================================================
   TELA INICIAL
===================================================== */

function mostrarInicio() {

    document.getElementById(
        "informacao"
    ).innerHTML = `

        <div class="boas-vindas">

            <div class="flor">
                🌸
            </div>

            <h3>
                Bem-vindo!
            </h3>

            <p>
                A ROSACAL foi criada para
                calcular e, ao mesmo tempo,
                ajudar você a compreender
                conceitos da matemática.
            </p>

            <p>
                <strong>
                    Clique em uma função
                </strong>
                para aprender como ela funciona.
            </p>

        </div>

    `;
}


/* =====================================================
   INICIAR DISPLAY
===================================================== */

atualizarDisplay();