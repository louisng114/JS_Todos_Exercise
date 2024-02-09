const form = document.querySelector("form");
const todoInput = document.querySelector("input[type='text']");
const ul = document.querySelector("ul");
const todoObject = {};

if (localStorage.getItem("todoObject") !== null){
    todoJSON = JSON.parse(localStorage.getItem("todoObject"))
    for (let item in todoJSON){
        todoObject[item] = todoJSON[item];
        const li = document.createElement("li");
        li.innerText = item + " ";
        if (todoObject[item] === false){
            li.classList.toggle("done")
        }
        const btn = document.createElement("button");
        btn.innerText = "REMOVE";
        li.appendChild(btn);
        ul.appendChild(li);
        }
}

form.addEventListener("submit",function(event){
    event.preventDefault();
    if (todoInput.value.trim() !== "" && todoObject[todoInput.value] === undefined){
        todoObject[todoInput.value] = true;
        localStorage.setItem("todoObject",JSON.stringify(todoObject));
        const li = document.createElement("li");
        li.innerText = todoInput.value + " ";
        const btn = document.createElement("button");
        btn.innerText = "REMOVE";
        li.appendChild(btn);
        ul.appendChild(li);
        todoInput.value = null;
    }
})

ul.addEventListener("click",function(event){
    if (event.target.tagName === "LI"){
        event.target.classList.toggle("done");
        todoObject[event.target.innerText.slice(0,-7)] = false; //-7 accounts for " REMOVE"
        localStorage.setItem("todoObject",JSON.stringify(todoObject));
    }
})

ul.addEventListener("click",function(event){
    if (event.target.tagName === "BUTTON"){
        console.log(event.target.parentElement.innerText.slice(0,-7));
        delete todoObject[event.target.parentElement.innerText.slice(0,-7)] //-7 accounts for " REMOVE"
        localStorage.setItem("todoObject",JSON.stringify(todoObject));
        event.target.parentElement.remove();
        }
})