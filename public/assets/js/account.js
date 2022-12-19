import { navigate, requestInit, url } from "./script.js"

$("documento").ready(async () => {
    const myUrl = url + "/user"
    const myInit = new requestInit("GET")

    fetch(myUrl,myInit)
        .then((res) => {
            res.json()
                .then((user) => {
                    if(user.email) renderUserData(user)
                    else navigate("/login.html")
                })
                .catch((err) => {
                    console.error(err)
                })
        })
        .catch((err) => {
            console.error(err)
        })

    
})

async function renderUserData(user){
    $("#userName").text(user.name)
    $("#userEmail").text(user.email)
    $("#userID").text(user.id)

    if(user.img){
        $("#userImg").attr("src",user.img)
    }
}

$("#logoutBTN").click(() => {
    const myUrl = url + "/logout"
    const myInit = new requestInit("GET")

    fetch(myUrl,myInit)
        .then((res) => {
            res.json()
                .then((msg) => {
                    console.log(msg)
                    navigate("/index.html")
                })
                .catch((err) => {
                    console.error(err)
                })
        })
        .catch((err) => {
            console.error(err)
        })
})