import { api, navigate } from "./script.js"

$("documento").ready(() => {
    api("/user","GET",null,(user) => {
        if(user.email) renderUserData(user)
        else navigate("/login.html")
    })
})

$("#logoutBTN").click(() => {
    api("/logout","POST",null,(data) => {
        if(data.left) navigate("/login.html")
    })
})

$("#deleteBTN").click(() => {
    const confirmDeleteUser = window.confirm("Você deseja apagar esta conta?")

    if(!confirmDeleteUser) return

    api("/user","DELETE",null,(data) => {
        if(data.deleted) navigate("/login.html")
    })
})

function renderUserData(user){
    $("#userName").text(user.name)
    $("#userEmail").text(user.email)
    $("#userID").text(user.id)

    if(user.img){
        $("#userImg").attr("src",user.img)
    }
}