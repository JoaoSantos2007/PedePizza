import {url,requestInit} from "./script.js"

function verifyUpdatePizzaMode(id){
    const updatePizzaID = sessionStorage.getItem('updatePizzaID')

    if(!updatePizzaID) return

    sessionStorage.removeItem('updatePizzaID')

    const myUrl = url + `/pizza/${updatePizzaID}`
    const myInit = new requestInit("GET")

    fetch(myUrl,myInit)
        .then((res) => {
            setPizzaUpdateMode(res.data)
        })
        .catch((err) => {
            console.error(err)
        })
}

function setPizzaUpdateMode(pizza){
    $("header__title").val("Update Pizza")

    $("#inputName").val(pizza.nome)
    $("#inputPreco").val(pizza.preco)
    $("#inputFile").val(pizza.img)
}

export {verifyUpdatePizzaMode}