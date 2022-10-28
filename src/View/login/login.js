import API from '../assets/API.js'
let mode = 'login'

const loginForm = window.document.getElementById('loginForm')

loginForm.addEventListener('submit',async function (event){
    event.preventDefault()
    const name = window.document.getElementById('nameInput').value
    const email = window.document.getElementById('emailInput').value
    const password = window.document.getElementById('pswdInput').value

    const user = {
        "nome": name,
        "email": email,
        "password": password
    }

    if(mode === 'create') await createUser(user)

    const authenticated = (await API.login(user)).authenticated

    console.log(authenticated)

    if(!authenticated){
        const URL = window.location.pathname.replace('/login/login.html','')
        window.location.assign(URL+'/index.html')
    }
    
})

const changeFormMode = () => {
    if(mode === 'login'){
        mode = 'create'

        const loginForm = window.document.getElementById('loginForm')
        loginForm.style.height = '70%'

        const changeModeBTN = window.document.getElementById('changeModeBTN')
        changeModeBTN.innerText = 'Already have a account? Login'

        const submitBTN = window.document.getElementById('submitBTN')
        submitBTN.setAttribute('value','Create')

        const nameInput = window.document.getElementById('nameInput')
        nameInput.style.display = 'block'
    }else{
        window.location.reload()
    }
}