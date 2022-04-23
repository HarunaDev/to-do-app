// get elements
let myList = []
const inputEl = document.getElementById("input-el")
const saveBtn = document.getElementById("save-btn")
const ulEl = document.getElementById("ul-el")
const talkBtn = document.querySelector(".talk")
const clearBtn = document.querySelector(".delete-all")

// -event handlers
document.addEventListener("DOMContentLoaded", getTodoItems)
saveBtn.addEventListener("click", saveButton)
ulEl.addEventListener("click", deleteButton)
clearBtn.addEventListener("click", () => {
    location.reload()
    localStorage.clear()
})


// initialise speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; 

const recognition = new SpeechRecognition()

// on start
recognition.onstart = () => {
    console.log("Voice Activated");
}

// on result
recognition.onresult = (e) => {
    const current = e.resultIndex;

    const transcript = e.results[current][0].transcript

    // create to do div
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")

    // create list item
    const todoList = document.createElement("li")
    todoList.innerText = transcript
    todoList.classList.add("todo-list")
    todoDiv.appendChild(todoList)

    // add items to local storage
    saveTodoItems(transcript)
    
    // delete button 
    const deleteBtn = document.createElement("button")
    deleteBtn.innerHTML = `<i class="fas fa-trash">Delete</i>`
    deleteBtn.classList.add("delete-btn")
    todoDiv.appendChild(deleteBtn);

    // append to ordered list
    ulEl.appendChild(todoDiv)
}

// -functions

// save button function
function saveButton(event){
    // if user submits an empty string
    if (inputEl.value === "") {
        return alert("can not submit empty text")
    } else {
        
    }

    // create to do div
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")

    // create list item
    const todoList = document.createElement("li")
    todoList.innerText = inputEl.value
    todoList.classList.add("todo-list")
    todoDiv.appendChild(todoList)

    // add items to local storage
    saveTodoItems(inputEl.value)
    
    // delete button 
    const deleteBtn = document.createElement("button")
    deleteBtn.innerHTML = `<i class="fas fa-trash">Delete</i>`
    deleteBtn.classList.add("delete-btn")
    todoDiv.appendChild(deleteBtn);

    // append to ordered list
    ulEl.appendChild(todoDiv)

    // clear input field after saving 
    inputEl.value = ""
}

// delete buttton function
function deleteButton(e){
    const item = e.target

    
    //delete button
    if(item.classList[0] === "delete-btn"){
        
        const task = item.parentElement
        deleteTodoItems(task)
        task.remove()
    }
}

// save items to local storage
function saveTodoItems(todo) {
    // check local storage for items
    let todos
    if(localStorage.getItem("todos") === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}

// get items from local storage
function getTodoItems(){
    // check local storage for items
    let todos
    if(localStorage.getItem("todos") === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    // loop through each item
    todos.forEach(function(todo){

    // create to do div
        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todo")

    // create list item
        const todoList = document.createElement("li")
        todoList.innerText = todo
        todoList.classList.add("todo-list")
        todoDiv.appendChild(todoList)
    
    // delete button 
        const deleteBtn = document.createElement("button")
        deleteBtn.innerHTML = `<i class="fas fa-trash">delete</i>`
        deleteBtn.classList.add("delete-btn")
        todoDiv.appendChild(deleteBtn);

    // append to ordered list
        ulEl.appendChild(todoDiv)
    })
}

// delete items from local storage
function deleteTodoItems(todo){
    // check local storage for items
    let todos
    if(localStorage.getItem("todos") === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)

    localStorage.setItem("todos", JSON.stringify(todos))
}

// speech button
talkBtn.addEventListener("click", () => {
    recognition.start()
})



