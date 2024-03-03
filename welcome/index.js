function main() {
    const buttonStart = document.querySelector('.buttonStart')

    const buttonRecorde = document.querySelector('.buttonRecorde')
    
    buttonStart.addEventListener('click', (ev) => {
        location.replace('../play-game/index.html')
    })

    buttonRecorde.addEventListener('click', (ev) => {
        location.replace('../recorde/index.html')
    })
}

document.addEventListener('DOMContentLoaded', (ev) => {
    main()
})