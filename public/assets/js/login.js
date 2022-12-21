import { navigate, requestInit, url } from "./script.js"

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

    login(user)
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