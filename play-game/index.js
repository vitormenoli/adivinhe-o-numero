const correctNumber = Math.floor(Math.random() * 1000) + 1

function toggleColor(element, toggleClass) {
    element.classList.add(toggleClass)
    setTimeout(() => {
        element.classList.remove(toggleClass)
    }, 500)
}

function buttonClick() {
    console.log(correctNumber)
    const buttonTry = document.querySelector('.buttonTry')
    
    buttonTry.addEventListener('click', (ev) => {
        
        if (buttonTry.textContent === 'Recomeçar!') {
            location.replace('../welcome/index.html')
            return
        }

        const tryNumber = document.querySelector('#tryNumber').value
        const chutes = document.querySelector('#numberChutes')
        const dica = document.querySelector('#dicaText')
        const ultimoChute = document.querySelector('#ultimoChute')

        const liChutes = document.querySelector('.liChutes')
        const liDica = document.querySelector('.liDica')
        const liUltimoChute = document.querySelector('.liUltimoChute')

        if (!tryNumber) {
            dica.textContent = 'Chute um número!'
            toggleColor(liDica, 'dica')
        }
        else if (tryNumber < 1 || tryNumber > 1000) {
            dica.textContent = 'Chute um número de 1 a 1000!'
            toggleColor(liDica, 'dica')

            document.querySelector('#tryNumber').value = ''
        }
        else if (tryNumber > correctNumber) {
            dica.textContent = 'Chute um número mais baixo!'
            toggleColor(liDica, 'dica')

            let numero = chutes.textContent
            numero++

            chutes.textContent = numero
            toggleColor(liChutes, 'chutes')

            ultimoChute.textContent = tryNumber
            toggleColor(liUltimoChute, 'ultimoChute')

            document.querySelector('#tryNumber').value = ''
        }
        else if (tryNumber < correctNumber) {
            dica.textContent = 'Chute um número mais alto!'
            toggleColor(liDica, 'dica')

            let numero = chutes.textContent
            numero++

            chutes.textContent = numero
            toggleColor(liChutes, 'chutes')

            ultimoChute.textContent = tryNumber
            toggleColor(liUltimoChute, 'ultimoChute')

            document.querySelector('#tryNumber').value = ''
        }
        else if (tryNumber == correctNumber) {

            const buttonDesistir = document.querySelector('.desistir')
            buttonDesistir.style.display = 'none'


            let numero = chutes.textContent
            numero++

            chutes.textContent = numero
            toggleColor(liChutes, 'chutes')

            const title = document.querySelector('.title')

            title.textContent = `Parabéns, você acertou o número: ${correctNumber}`

            document.querySelector('#tryNumber').classList.add('disabledInput')
            document.querySelector('#tryNumber').disabled = true

            const ul = document.querySelector('ul')

            ul.removeChild(liDica)
            ul.removeChild(liUltimoChute)

            buttonTry.textContent = 'Recomeçar!'

            setTimeout(() => {
                let recordeAtual = Object(JSON.parse(localStorage.getItem('recorde'))).number

                if (!recordeAtual || parseInt(recordeAtual) > parseInt(chutes.textContent)) {
    
                    const saveRecord = confirm('Você deseja salvar seu recorde?')
    
                    if (saveRecord) {
                        const name = prompt('Qual o seu nome?')
        
                        alert('Recorde salvo!')
    
                        localStorage.setItem('recorde', `{ "number": "${chutes.textContent}", "user": "${name}" }`)
                    }
                }
            }, 500)  
        }
    })
}

function desistir() {
    const button = document.querySelector('.desistir')

    button.addEventListener('click', (ev) => {

        const sure = confirm('Você tem certeza que deseja desistir do jogo?\nNenhum dado será salvo!')

        if (sure) {
            const buttonTry = document.querySelector('.buttonTry')
            const title = document.querySelector('.title')
    
            title.textContent = `Que pena, você estava no caminho! O número era: ${correctNumber}`
    
            document.querySelector('#tryNumber').classList.add('disabledInput')
            document.querySelector('#tryNumber').disabled = true
    
            const ul = document.querySelector('ul')
    
            const liDica = document.querySelector('.liDica')
            const liUltimoChute = document.querySelector('.liUltimoChute')
    
            ul.removeChild(liDica)
            ul.removeChild(liUltimoChute)
    
            buttonTry.textContent = 'Recomeçar!'
            buttonTry.style.margin = '10%'
    
            button.style.display = 'none'
        }

    })
}

document.addEventListener('DOMContentLoaded', (ev) => {
    buttonClick()
    desistir()
})