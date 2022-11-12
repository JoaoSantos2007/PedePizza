const updatePizzaID = sessionStorage.getItem('updatePizzaID')
sessionStorage.removeItem('updatePizzaID')
if(updatePizzaID) updateMode(updatePizzaID)

async function updateMode(id){
    $("header__title").val("Update Pizza")

    const pizza = await API.getPizzas(id)

    $("#inputName").val(pizza.nome)
    $("#inputSabor").val(pizza.sabor)
    $("#inputPreco").val(pizza.preco)
    $("#inputURL").val(pizza.img)
}

$("#pizzaForm").on("submit", async (event) => {
    event.preventDefault()

    const pizza = {
        "nome": $("#inputName").val(),
        "sabor": $("#inputSabor").val(),
        "preco": $("#inputPreco").val(),
        "img": $("#inputURL").val()
    }

    const saved = updatePizzaID ? await API.updatePizza(pizza,updatePizzaID) : await API.createPizza(pizza)
    if(saved) exit()
})

function exit(){
    window.location.assign(myUrl+'/admin.html')
}