import API from "../assets/API.js.js"

const isAdmin = () => {
    const adminSection = window.document.getElementById('adminSection')
    adminSection.style.display = 'block'
}

const logout = async () => {
    const res = await API.logout()
    if(res.left) window.location.reload()
}

async function loadUserInfo(){
    const user = await API.getUser()
    if(user.email == 'admin@admin.com') isAdmin()

    const userName = window.document.getElementById('userName')
    userName.innerText = user.name

    const userEmail = window.document.getElementById('userEmail')
    userEmail.innerText = user.email

    const userID = window.document.getElementById('userID')
    userID.innerText = user.id

    let imgURL = user.img
    if(imgURL){
        const userImg = window.document.getElementById('userImg')
        userImg.setAttribute('src',imgURL)
    }
}

loadUserInfo()

window.document.getElementById("logoutBTN").addEventListener("click",logout)