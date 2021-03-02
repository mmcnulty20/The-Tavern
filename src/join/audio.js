export default () => {
    const body = document.getElementsByTagName("body")[0]
    const types = ["scroll", "keydown", "click"]
    const audio = document.getElementById("audio")
    const mute = document.getElementById("mute")
    const pause = document.getElementById("pause")
    const controls = document.getElementById("controls")
    const cb = (e) => {
        console.log(audio)
        audio.play()
        pause.innerHTML = `<i class="fas fa-pause-circle"></i>`
        types.forEach(e => {
            body.removeEventListener(e, cb)
        })
    }
    types.forEach( e => {
        body.addEventListener(e, cb)
    })
    mute.addEventListener("click", () => {
        const vol = audio.volume
        if (vol === 0) {
            audio.volume = 0.5
            mute.innerHTML = `<i class="fas fa-volume-down"></i>`
        } else if (vol === 0.5 ) {
            audio.volume = 1
            mute.innerHTML = `<i class="fas fa-volume-up"></i>`
        } else if (vol === 1) {
            audio.volume = 0
            mute.innerHTML = `<i class="fas fa-volume-mute"></i>`
        }
    })

    pause.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            pause.innerHTML = `<i class="fas fa-pause-circle"></i>`
        } else {
            audio.pause();
            pause.innerHTML = `<i class="fas fa-play-circle"></i>`
        }
    })
    const credit = document.createElement("div")
    credit.innerHTML = `Music/atmosphere Credit goes to Tim at <a href="https://tabletopaudio.com/">TableTopAudio</a> and used under a Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License`
    controls.addEventListener("hover", () => {
        controls.appendChild(credit)
    } )

}