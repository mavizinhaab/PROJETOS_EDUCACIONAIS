/* =====================================================
   ASTRION
   EXPLORANDO O SISTEMA SOLAR
   ===================================================== */


/* =====================================================
   DADOS DOS PLANETAS
   ===================================================== */

const planetas = {

    mercurio: {

        nome: "Mercúrio",

        subtitulo: "O planeta mais próximo do Sol",

        icone: "☿",

        descricao:
            "Mercúrio é o menor planeta do Sistema Solar e também o mais próximo do Sol. Sua superfície é marcada por inúmeras crateras e apresenta uma enorme variação de temperatura.",

        curiosidades: [

            "Um ano em Mercúrio dura apenas 88 dias terrestres.",

            "Mercúrio é o menor planeta do Sistema Solar.",

            "Sua superfície possui muitas crateras.",

            "As temperaturas variam drasticamente entre o dia e a noite."

        ],

        caracteristicas: [

            "Planeta rochoso",

            "Não possui luas",

            "Atmosfera extremamente fina",

            "Muito próximo do Sol"

        ],

        livro:
            "Livro: 2001: Uma Odisseia no Espaço — Arthur C. Clarke.",

        filme:
            "Filme: Sunshine — uma ficção científica sobre uma missão espacial em direção ao Sol."

    },


    venus: {

        nome: "Vênus",

        subtitulo: "O planeta mais quente do Sistema Solar",

        icone: "♀",

        descricao:
            "Vênus possui uma atmosfera extremamente densa, composta principalmente por dióxido de carbono. O intenso efeito estufa faz dele o planeta mais quente do Sistema Solar.",

        curiosidades: [

            "Vênus é o planeta mais quente do Sistema Solar.",

            "Gira no sentido contrário ao da maioria dos planetas.",

            "Um dia em Vênus é mais longo que um ano venusiano.",

            "Sua atmosfera exerce uma pressão enorme sobre a superfície."

        ],

        caracteristicas: [

            "Planeta rochoso",

            "Não possui luas",

            "Atmosfera muito densa",

            "Forte efeito estufa"

        ],

        livro:
            "Livro: Cosmos — Carl Sagan.",

        filme:
            "Filme: The Wandering Earth — uma ficção científica que explora desafios relacionados ao Sistema Solar."

    },


    terra: {

        nome: "Terra",

        subtitulo: "O planeta onde vivemos",

        icone: "🌍",

        descricao:
            "A Terra é o terceiro planeta a partir do Sol e, até o momento, é o único lugar conhecido que possui vida. Cerca de 71% de sua superfície é coberta por água.",

        curiosidades: [

            "É o único planeta conhecido que possui vida.",

            "A maior parte da superfície é coberta por água.",

            "A atmosfera protege a vida contra parte da radiação solar.",

            "A Lua influencia as marés dos oceanos."

        ],

        caracteristicas: [

            "Planeta rochoso",

            "Possui uma Lua",

            "Atmosfera rica em nitrogênio e oxigênio",

            "Possui água líquida em abundância"

        ],

        livro:
            "Livro: Cosmos — Carl Sagan.",

        filme:
            "Filme: Interestelar — apresenta conceitos relacionados à física, espaço e exploração."

    },


    marte: {

        nome: "Marte",

        subtitulo: "O planeta vermelho",

        icone: "♂",

        descricao:
            "Marte é conhecido como o planeta vermelho devido à presença de óxidos de ferro em sua superfície. É um dos principais alvos das pesquisas sobre a possibilidade de vida passada fora da Terra.",

        curiosidades: [

            "Marte possui duas luas: Fobos e Deimos.",

            "Existem evidências de que água líquida existiu em sua superfície no passado.",

            "Marte possui o maior vulcão conhecido do Sistema Solar.",

            "Seu solo apresenta grande quantidade de óxidos de ferro."

        ],

        caracteristicas: [

            "Planeta rochoso",

            "Possui duas luas",

            "Atmosfera fina",

            "Superfície rica em óxido de ferro"

        ],

        livro:
            "Livro: Perdido em Marte — Andy Weir.",

        filme:
            "Filme: Perdido em Marte — mostra um astronauta tentando sobreviver em Marte."

    },


    jupiter: {

        nome: "Júpiter",

        subtitulo: "O gigante do Sistema Solar",

        icone: "♃",

        descricao:
            "Júpiter é o maior planeta do Sistema Solar. É um gigante gasoso formado principalmente por hidrogênio e hélio e possui um poderoso campo magnético.",

        curiosidades: [

            "Júpiter é o maior planeta do Sistema Solar.",

            "Possui uma enorme tempestade chamada Grande Mancha Vermelha.",

            "Possui muitas luas.",

            "Seu campo magnético é extremamente poderoso."

        ],

        caracteristicas: [

            "Gigante gasoso",

            "Possui dezenas de luas",

            "Atmosfera rica em hidrogênio",

            "Não possui uma superfície sólida como a Terra"

        ],

        livro:
            "Livro: 2010: O Ano em que Faremos Contato — Arthur C. Clarke.",

        filme:
            "Filme: 2010 — O Ano em que Faremos Contato — apresenta uma exploração de Júpiter."

    },


    saturno: {

        nome: "Saturno",

        subtitulo: "O planeta dos grandes anéis",

        icone: "♄",

        descricao:
            "Saturno é um gigante gasoso famoso pelo seu impressionante sistema de anéis. Seus anéis são formados principalmente por partículas de gelo, poeira e fragmentos rochosos.",

        curiosidades: [

            "Saturno é o segundo maior planeta do Sistema Solar.",

            "Seus anéis são formados principalmente por gelo.",

            "Possui muitas luas.",

            "Saturno possui uma densidade média menor que a da água."

        ],

        caracteristicas: [

            "Gigante gasoso",

            "Possui um grande sistema de anéis",

            "Possui muitas luas",

            "Atmosfera rica em hidrogênio e hélio"

        ],

        livro:
            "Livro: Saturn — a obra de divulgação científica dedicada ao planeta.",

        filme:
            "Filme: Interstellar — apresenta uma representação de Saturno e de uma passagem próxima ao planeta."

    },


    urano: {

        nome: "Urano",

        subtitulo: "O planeta que gira praticamente de lado",

        icone: "♅",

        descricao:
            "Urano é um gigante de gelo conhecido por sua coloração azul-esverdeada. Sua principal característica é a enorme inclinação de seu eixo de rotação.",

        curiosidades: [

            "Urano possui uma inclinação de aproximadamente 98 graus.",

            "Por isso, ele parece girar praticamente deitado.",

            "Sua atmosfera contém metano.",

            "Possui anéis e várias luas."

        ],

        caracteristicas: [

            "Gigante de gelo",

            "Possui anéis",

            "Possui várias luas",

            "Atmosfera rica em hidrogênio, hélio e metano"

        ],

        livro:
            "Livro: Uma Breve História do Tempo — Stephen Hawking.",

        filme:
            "Filme: Voyager — histórias de exploração espacial ajudam a compreender a descoberta dos planetas externos."

    },


    netuno: {

        nome: "Netuno",

        subtitulo: "O planeta mais distante do Sol",

        icone: "♆",

        descricao:
            "Netuno é o planeta mais distante do Sol. É um gigante de gelo conhecido por sua intensa coloração azul e pelos ventos extremamente rápidos de sua atmosfera.",

        curiosidades: [

            "Netuno é o planeta mais distante do Sol.",

            "Possui alguns dos ventos mais rápidos do Sistema Solar.",

            "Foi previsto matematicamente antes de ser observado diretamente.",

            "Possui anéis muito tênues."

        ],

        caracteristicas: [

            "Gigante de gelo",

            "Possui várias luas",

            "Atmosfera rica em hidrogênio e hélio",

            "Possui ventos extremamente rápidos"

        ],

        livro:
            "Livro: O Guia do Mochileiro das Galáxias — Douglas Adams.",

        filme:
            "Filme: Interestelar — uma obra de ficção científica para explorar conceitos relacionados ao espaço."

    }

};


/* =====================================================
   MOSTRAR PLANETA
   ===================================================== */

function mostrarPlaneta(nome) {

    const planeta = planetas[nome];

    const conteudo =
        document.getElementById("conteudo-planeta");


    if (!planeta || !conteudo) {

        return;

    }


    conteudo.innerHTML = `

        <div class="info-planeta">

            <div class="info-topo">

                <div class="info-planeta-icone">
                    ${planeta.icone}
                </div>

                <div>

                    <h3>
                        ${planeta.nome}
                    </h3>

                    <div class="subtitulo">
                        ${planeta.subtitulo}
                    </div>

                </div>

            </div>


            <p>
                ${planeta.descricao}
            </p>


            <div class="info-grid">


                <div class="info-caixa">

                    <h4>
                        ✦ Curiosidades
                    </h4>

                    <ul>

                        ${planeta.curiosidades
                            .map(
                                curiosidade =>
                                `<li>${curiosidade}</li>`
                            )
                            .join("")
                        }

                    </ul>

                </div>


                <div class="info-caixa">

                    <h4>
                        ✦ Características
                    </h4>

                    <ul>

                        ${planeta.caracteristicas
                            .map(
                                caracteristica =>
                                `<li>${caracteristica}</li>`
                            )
                            .join("")
                        }

                    </ul>

                </div>

            </div>


            <div class="obras">


                <div class="obra">

                    <h4>
                        📚 Livro
                    </h4>

                    <p>
                        ${planeta.livro}
                    </p>

                </div>


                <div class="obra">

                    <h4>
                        🎬 Filme
                    </h4>

                    <p>
                        ${planeta.filme}
                    </p>

                </div>


            </div>

        </div>

    `;


    /*
        Leva o usuário suavemente
        até as informações.
    */

    document
        .getElementById("conteudo-planeta")
        .scrollIntoView({

            behavior: "smooth",

            block: "center"

        });

}


/* =====================================================
   EFEITO DE CLIQUE
   ===================================================== */

document
    .querySelectorAll(".orbita")
    .forEach(botao => {

        botao.addEventListener(
            "click",
            function () {

                this.blur();

            }
        );

    });


/* =====================================================
   PARAR ANIMAÇÃO AO PASSAR O MOUSE
   ===================================================== */

document
    .querySelectorAll(".orbita")
    .forEach(orbita => {

        orbita.addEventListener(
            "mouseenter",
            function () {

                this.style.animationPlayState =
                    "paused";

            }
        );


        orbita.addEventListener(
            "mouseleave",
            function () {

                this.style.animationPlayState =
                    "running";

            }
        );

    });