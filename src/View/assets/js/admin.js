$("document").ready(async () => {
    const pizzas = await API.getPizzas()
    if(pizzas) renderPizzas(pizzas)
})

async function renderPizzas(pizzas){
    pizzas.map(pizza => {
        const pizzaLi = $("<li>").addClass("pizza")

        const pizzaImg = $("<img>").addClass("pizza__img").attr("src",pizza.img)
        pizzaLi.append(pizzaImg)

        const pizzaInfo = $("<div>").addClass("pizza__info")
        const pizzaName = $("<p>").addClass("pizza__name").text(pizza.nome)
        pizzaInfo.append(pizzaName)
        const pizzaPreco = $("<p>").addClass("pizza__price").text("R$ "+pizza.preco)
        pizzaInfo.append(pizzaPreco)
        pizzaLi.append(pizzaInfo)

        const pizzaControls = $("<div>").addClass("pizza__controls")
        const editPizza = $("<img>").attr("src","assets/img/edit.png").click(()=> {
            sessionStorage.setItem('updatePizzaID',pizza.id)

            window.location.assign(myUrl+'/manage.html')
        })
        pizzaControls.append(editPizza)
        const deletedPizza = $("<img>").attr("src","assets/img/delete.png").click(async () => {
            const verifDelete = window.confirm('Você realmente deseja apagar esse registro')
            if(verifDelete){
                const deletedPizza = await API.deletePizza(pizza.id)
                if(deletedPizza.deleted){
                    window.location.reload()
                }
            }
        })
        pizzaControls.append(deletedPizza)
        pizzaLi.append(pizzaControls)

        $("#pizzaList").append(pizzaLi)
    })
}