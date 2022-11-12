let mode = "login"

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

    console.log(user)

    if(mode === 'create'){
        const created = await API.createUser(user)
        if(created) window.location.reload()
    }else if(mode === 'login'){
        const authenticated = (await API.login(user)).authenticated
        if(authenticated) window.location.assign(myUrl + "/index.html")
    } 


})

const changeFormMode = () => {
    if(mode === 'login'){
        mode = 'create'

        $('#changeModeBTN').text('Already have a account? Login')
        $('#submitBTN').attr("value","Create")
        $('#nameInput').toggleClass("createForm")
    }else{
        window.location.reload()
    }
}