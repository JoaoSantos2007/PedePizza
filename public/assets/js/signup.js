import { login } from "./login.js"
import {api, navigate} from "./script.js"

$("#cancelBTN").click(() => {
    navigate("/login.html")
})

$("#signupForm").submit((event) => {
    event.preventDefault()

    createUser({
        "name": $("#inputName").val(),
        "email": $("#inputEmail").val(),
        "password": (window.document.getElementById("inputPassword")).value,
        "img": $("inputUserIMG").val()
    })
})

function createUser(user){
    api("/user","POST",user,(data) => {
        if(data.created) login(user)
    })
}