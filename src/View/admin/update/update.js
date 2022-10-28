const updatePizzaID = localStorage.getItem('updatePizzaID')
localStorage.removeItem('updatePizzaID')

if(updatePizzaID) updateMode(updatePizzaID)

async function updateMode(id){

    const pizzaTitle = window.document.getElementById('pizzaTitle')
    const inputPizzaName = window.document.getElementById('inputPizzaName')
    const inputPizzaSabor = window.document.getElementById('inputPizzaSabor')
    const inputPizzaPreco = window.document.getElementById('inputPizzaPreco')
    const inputPizzaIMG = window.document.getElementById('inputPizzaIMG')

    const pizza = (await getPizzas(id))[0]

    inputPizzaName.value = pizza.nome
    inputPizzaSabor.value = pizza.sabor
    inputPizzaPreco.value = pizza.preco
    inputPizzaIMG.value = pizza.img
    pizzaTitle.innerText = 'Updated Pizza'
}

const pizzaInput = window.document.getElementById('pizzaInput')

pizzaInput.addEventListener('submit',async function (event){
    event.preventDefault()
    console.log(event)

    const PizzaName = window.document.getElementById('inputPizzaName').value
    const PizzaSabor = window.document.getElementById('inputPizzaSabor').value
    const PizzaPreco = window.document.getElementById('inputPizzaPreco').value
    const PizzaIMG = window.document.getElementById('inputPizzaIMG').value

    const pizza = {
        "nome": PizzaName,
        "sabor": PizzaSabor,
        "preco": PizzaPreco,
        "img": PizzaIMG
    }

    const saved = updatePizzaID ? await updatePizza(pizza,updatePizzaID) : await createPizza(pizza)

    if(saved) exit()
})

function exit(){
    const URL = window.location.pathname.replace('/update/update.html','')
    window.location.assign(URL+'/admin.html')
}