async function renderPizzas(){
    
    const pizzas = await API.getPizzas()

    pizzas.map((pizza) => {
        const id = pizza.id

        const item = $("<div>").addClass("item")

        const itemHeader = $("<div>").addClass("item__header")
        const pizzaIMG = $("<img>").attr("src",pizza.img)
        pizzaIMG.addClass("pizza__img")
        itemHeader.append(pizzaIMG)
        item.append(itemHeader)

        const itemMain = $("<div>").addClass("item__main")
        const itemName = $("<p>").addClass("item__name").text(pizza.nome)
        itemMain.append(itemName)
        item.append(itemMain)

        const itemFooter = $("<div>").addClass("item__footer")
        const itemPrice = $("<p>").addClass("item__price").text("R$ "+pizza.preco)
        itemFooter.append(itemPrice)
        item.append(itemFooter)
    
        $("#content").append(item)
    })
}

renderPizzas()