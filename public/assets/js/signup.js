import { login } from "./login.js"
import {navigate, requestInit, url} from "./script.js"

$("#cancelBTN").click(() => {
    exit()
})

$("#signupForm").submit((event) => {
    event.preventDefault()

    const user = {
        "name": $("#inputName").val(),
        "email": $("#inputEmail").val(),
        "password": (window.document.getElementById("inputPassword")).value,
        "img": $("inputUserIMG").val()
    }

    createUser(user)
})

function createUser(user){
    const myUrl = url + "/user"
    const myInit = new requestInit("POST",user)


    fetch(myUrl, myInit)
        .then((res) => {
            res.json()
                .then((data) => {
                    if(data.created) login(user)
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