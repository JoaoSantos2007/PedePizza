$("documento").ready(async () => {
    const user = await API.getUser()

    if(!user){
        isAnonymous()
        return
    }
    if(user.admin) isAdmin()

    loadUser(user)
})

const isAdmin = () => {
    $("#adminBTN").addClass("displayAdminBTN").click(()=>{
        window.location.assign(myUrl+"/admin.html")
    })
}

const isAnonymous = () => {
    $("#loginBTN").toggleClass("displayLoginBTN")
}

async function loadUser(user){
    $("#userName").text(user.name)
    $("#userEmail").text(user.email)
    $("#userID").text(user.id)

    if(user.img){
        $("#userImg").attr("src",user.img)
    }
}

$("#loginBTN").click(() => {
    window.location.assign(myUrl + "/login.html")
})

$("#logoutBTN").click(async () => {
    const res = await API.logout()
    if(res.left) window.location.reload()
})