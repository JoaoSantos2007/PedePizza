import { navigate, requestInit, url } from "./script.js"

function setCreateUserMode(){
    $('#changeFormMode').text('Already have a account? Login')
    $('#submitBTN').attr("value","Create")
    $('#nameInput').css("display","block")
}

function createUser(user){
    const myUrl = url + "/user"
    const myInit = new requestInit("POST", user)

    fetch(myUrl,myInit)
        .then((res) => {
            res.json()
                .then((data) => {
                    if(data.created) navigate("/index.html")
                })
                .catch((err) => {
                    console.error(err)
                })
        })
        .catch((err) => {
            console.error(err)
        })
}

export {setCreateUserMode,createUser}