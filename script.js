let paisesRestantes = paises.slice()
let perguntas = [
    {
        texto: "O país fica na América do Sul?",
        campo: "continente",
        valor: "América do Sul"
    },
    {
        texto: "O país fica na América do Norte?",
        campo: "continente",
        valor: "América do Norte"
    },
    {
        texto: "O país fica na Europa?",
        campo: "continente",
        valor: "Europa"
    },
    {
        texto: "O país fica na Ásia?",
        campo: "continente",
        valor: "Ásia"
    },
    {
        texto: "O país fica na África?",
        campo: "continente",
        valor: "África"
    },
    {
        texto: "O país possui português como idioma oficial?",
        campo: "idiomas",
        valor: "português"
    },
    {
        texto: "O país possui espanhol como idioma oficial?",
        campo: "idiomas",
        valor: "espanhol"
    },
    {
        texto: "O país possui inglês como idioma oficial?",
        campo: "idiomas",
        valor: "inglês"
    },
    {
        texto: "O país possui francês como idioma oficial?",
        campo: "idiomas",
        valor: "francês"
    },
    {
        texto: "O país possui mais de 100 milhões de habitantes?",
        campo: "populacao",
        valor: true
    },
    {
        texto: "O país é uma ilha?",
        campo: "ilha",
        valor: true
    },
    {
        texto: "O país possui uma monarquia?",
        campo: "monarquia",
        valor: true
    }
]
let letras = [];
for (let i = 0; i < paises.length; i++) {
    let letra = paises[i].capital.charAt(0).toUpperCase();
    if (!letras.includes(letra)) {
        letras.push(letra)
    }
}
for (let i = 0; i < letras.length; i++) {
    perguntas.push({
        texto: "A capital do país começa com a letra " + letras[i] + "?",
        campo: "capital",
        valor: letras[i]
    })
}

let indicePergunta = 0
const pergunta = document.querySelector("#pergunta")
const sim = document.querySelector("#sim")
const nao = document.querySelector("#nao")
const resultado = document.querySelector("#resultado")

function mostrarPergunta() {
    if (paisesRestantes.length == 1) {
        pergunta.innerHTML = "O país em que você pensou é:"
        resultado.innerHTML = paisesRestantes[0].nome
        sim.style.display = "none"
        nao.style.display = "none"
        return
    }
    if (paisesRestantes.length == 0) {
        pergunta.innerHTML = "Não consegui identificar o país!"
        resultado.innerHTML = "Tente novamente."
        sim.style.display = "none"
        nao.style.display = "none"
        return
    }
    if (indicePergunta >= perguntas.length) {
        pergunta.innerHTML = "Não consegui identificar apenas um país."
        resultado.innerHTML = "Possibilidades: " +
            paisesRestantes.map(p => p.nome).join(", ")
        sim.style.display = "none"
        nao.style.display = "none"
        return
    }
    pergunta.innerHTML = perguntas[indicePergunta].texto
}

function responder(resposta) {
    let atual = perguntas[indicePergunta]
    paisesRestantes = paisesRestantes.filter(function(pais) {
        let corresponde = false
        if (atual.campo == "continente") {
            corresponde = pais.continente == atual.valor
        }
        else if (atual.campo == "idiomas") {
            corresponde = pais.idiomas.includes(atual.valor)
        }
        else if (atual.campo == "capital") {
            corresponde = pais.capital.charAt(0).toUpperCase() == atual.valor
        }
        else {
            corresponde = pais[atual.campo] == atual.valor
        }
        return corresponde == resposta
    })
    indicePergunta++
    mostrarPergunta()
}

sim.addEventListener("click", function() {
    responder(true)
})
nao.addEventListener("click", function() {
    responder(false)
})
mostrarPergunta()