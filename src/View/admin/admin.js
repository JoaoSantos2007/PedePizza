import API from "../assets/API.js"

async function renderPizzas(){
    const pizzas = await API.getPizzas()

    const pizzaList = window.document.getElementById('pizzaList')
    pizzaList.innerHTML=''


    pizzas.map(pizza => {
        const br = window.document.createElement('br')


        let pizzaSection = window.document.createElement('li')

        let pizzaImg = window.document.createElement('img')
        pizzaImg.setAttribute('class','pizzaImg')
        pizzaImg.setAttribute('src',`${pizza.img}`)
        pizzaSection.appendChild(pizzaImg)

        let pizzaInfo = window.document.createElement('div')
        pizzaInfo.setAttribute('class','pizzaInfo')

        let nomePizza = window.document.createElement('p')
        nomePizza.setAttribute('class','nomePizza')
        nomePizza.innerText = pizza.nome
        pizzaInfo.appendChild(nomePizza)

        pizzaInfo.appendChild(br)

        let saborPizza = window.document.createElement('p')
        saborPizza.setAttribute('class','saborPizza')
        saborPizza.innerText = pizza.sabor
        pizzaInfo.appendChild(saborPizza)
        
        pizzaSection.appendChild(pizzaInfo)

        let pizzaControl = window.document.createElement('div')
        pizzaControl.setAttribute('class','pizzaControl')

        let editBTN = window.document.createElement('img')
        editBTN.setAttribute('class','editBTN')
        editBTN.setAttribute('src','../assets/edit.png')
        editBTN.setAttribute('onclick',`editPizza('${pizza.id}')`)
        pizzaControl.appendChild(editBTN)

        let deleteBTN = window.document.createElement('img')
        deleteBTN.setAttribute('class','deleteBTN')
        deleteBTN.setAttribute('src','../assets/delete.png')
        deleteBTN.setAttribute('onclick',`deletePizzaBTN('${pizza.id}')`)
        pizzaControl.appendChild(deleteBTN)

        pizzaSection.appendChild(pizzaControl)

        pizzaList.appendChild(pizzaSection)
    })
}

async function deletePizzaBTN(id){
    const verifReq = window.confirm('Você realmente deseja apagar esse registro')
    if(verifReq){
        const deletedPizza = await deletePizza(id)
        if(deletedPizza){
            window.location.reload()
        }
    }
}

function editPizza(id){
    localStorage.setItem('updatePizzaID',id)
    
    const URL = window.location.pathname.replace('/admin.html','')
    window.location.assign(URL+'/update/update.html')
}

renderPizzas()