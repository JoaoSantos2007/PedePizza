import { navigate, requestInit, url } from "./script.js"

$("#loginForm").on("submit", async (event) => {
    event.preventDefault()

    const user = {
        "email": $("#emailInput").val(),
        "name": $("#nameInput").val(),
        "password": (window.document.getElementById("pwdInput")).value
    }

    login(user)
})

function login(user){
    const myUrl = url + "/login"
    const myInit = new requestInit("POST", user)

    fetch(myUrl,myInit)
        .then((res) => {
            res.json()
                .then((data) => {
                    if(data.authenticated) exit
                })
                .catch((err) => {
                    console.error(err)
                })
        })
        .catch((err) => {
            console.error(err)
        })
}

function exit(){
    navigate("/index.html")
}

$("#navigateToHome").click(() => {
    exit()
})

export {login}