// grab elements
let myList = []
const inputEl = document.getElementById("input-el")
const saveBtn = document.getElementById("save-btn")
const olEl = document.getElementById("ol-el")
const talkBtn = document.querySelector(".talk")

// initialise speech recognition

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; 

const recognition = new SpeechRecognition()

// speech button

talkBtn.addEventListener("click", () => {
    // on start
    recognition.onstart = () => {
        console.log("Voice Activated");
    }
    
    // on result
    recognition.onresult = (e) => {
        const current = e.resultIndex;
    
        const transcript = e.results[current][0].transcript
    
        myList.push(transcript)
    
    }
  

    // renderList()
})


// speech button on start

talkBtn.addEventListener("click", () => {
    recognition.start()
})