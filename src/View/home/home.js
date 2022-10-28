import API from "../assets/API.js"

async function renderPizzas(){
    
    const pizzas = await API.getPizzas()

    pizzas.map((pizza) => {
        const id = pizza.id

        let hr = window.document.createElement('hr')

        let item = window.document.createElement('div')
        item.setAttribute('class','item')
        item.addEventListener('click', () => {
            console.log(id)
        })
        let img = window.document.createElement('img')
        img.setAttribute('src',`${pizza.img}`)
        item.appendChild(img)

        let name = window.document.createElement('p')
        name.innerText = pizza.nome
        item.appendChild(name)

        item.appendChild(hr)

        let itemFooter = window.document.createElement('div')
        itemFooter.setAttribute('class','itemFooter')

        let price = window.document.createElement('p')
        price.innerText = "R$"+`${pizza.preco.toFixed(2)}`
        itemFooter.appendChild(price)

        item.appendChild(itemFooter)     
    
        window.document.getElementById('content').appendChild(item)
    })
}

renderPizzas()