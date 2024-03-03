function showRecord() {
    const chutesText = document.querySelector('.chutes')
    const usertext = document.querySelector('.user')
    const chutes = localStorage.getItem('recorde')

    if (!chutes) {
        chutesText.textContent = 'Chutes: Não estabelecido'
        usertext.textContent = 'Jogador: Não estabelecido'
        return 
    }

    const numero = Object(JSON.parse(chutes)).number
    const nome = Object(JSON.parse(chutes)).user

    chutesText.textContent = `Chutes: ${numero}`
    usertext.textContent = `Jogador: ${nome}`
}

function resetRecord() {
    const buttonReset = document.querySelector('.buttonReset')

    buttonReset.addEventListener('click', (ev) => {

        const status = document.querySelector('.getStats')

        if (!localStorage.getItem('recorde')) {
            status.classList.add('status', 'red')
            status.textContent = 'Não um há recorde para resetar!'

            setTimeout(() => {
                if (status.textContent.includes('Não')) {
                    status.classList.remove('status', 'red', 'green')
                    status.textContent = ''
                }
            }, 5000)

            return

        }

        const sure = confirm('Você tem certeza que deseja resetar o recorde?\nEste dado não poderá ser recuperado!')

        if (sure) {
            if (!localStorage.getItem('recorde')) {
                status.classList.add('status', 'red')
                status.textContent = 'Não um há recorde para resetar!'
    
                setTimeout(() => {
                    if (status.textContent.includes('Não')) {
                        status.classList.remove('status', 'red', 'green')
                        status.textContent = ''
                    }
                }, 5000)
    
            } else {
                status.classList.add('status', 'green')
                status.textContent = 'Recorde resetado!'
    
                setTimeout(() => {
                    if (status.textContent === 'Recorde resetado!') {
                        status.classList.remove('status', 'green', 'red')
                        status.textContent = ''
                    }
                }, 5000)
    
                localStorage.removeItem('recorde')
            }
    
            showRecord()
        }
    })
}

function main() {
    const buttonStart = document.querySelector('.buttonWelcome')
    
    buttonStart.addEventListener('click', (ev) => {
        location.replace('../welcome/index.html')
    })

    showRecord()
    resetRecord()
}

document.addEventListener('DOMContentLoaded', (ev) => {
    main()
})