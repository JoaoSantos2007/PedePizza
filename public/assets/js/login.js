import { createUser, setCreateUserMode } from "./create-user.js"
import { navigate, requestInit, url } from "./script.js"

let formMode = "login"

$("#changeFormMode").click(() => {
    if(formMode === "login"){
        formMode = "create"
        setCreateUserMode()
    } else if(formMode === "create"){
        window.location.reload()
    }
})

$("#loginForm").on("submit", async (event) => {
    event.preventDefault()
    
    const name = $("#nameInput").val()
    const email = $("#emailInput").val()
    const password = window.document.getElementById("pwdInput").value

    const user = {
        email,
        name,
        password
    }

    if(formMode === "create"){
        createUser(user)
    }else if(formMode === "login"){
        login(user)
    }
})

function login(user){
    const myUrl = url + "/login"
    const myInit = new requestInit("POST", user)

    fetch(myUrl,myInit)
        .then((res) => {
            res.json()
                .then((data) => {
                    if(data.authenticated) navigate("/index.html")
                })
                .catch((err) => {
                    console.error(err)
                })
        })
        .catch((err) => {
            console.error(err)
        })
}