const api = `http://localhost:3030`

class INIT{
    constructor(method,body=null){
        this.method = method,
        this.body = body ? JSON.stringify(body) : null,
        this.headers = {
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        },
        this.mode = 'cors',
        this.caches = 'defaut',
        this.credentials = 'include'
    }
}

class API {
    /*
    =================================
               Pizza Requests
    =================================
    */


    //Create pizza
    static async createPizza(pizza){
        const myInit = new INIT("POST",pizza)
        const url = api + '/pizza'
        
        return await (await fetch(url,myInit)).json()
    }

    //Read pizzas
    static async getPizzas(pizzaID){
        const myInit = new INIT("GET")
        const url = !pizzaID ? api + '/pizza' : api + `/pizza/${pizzaID}`

        return await (await fetch(url,myInit)).json()
    }

    //Update pizza
    static async updatePizza(pizza,pizzaID){
        const myInit = new INIT("PUT",pizza)
        const url = api+`/pizza/${pizzaID}`

        return await (await fetch(url,myInit)).json()
    }

    //Delete pizza
    static async deletePizza(pizzaID){
        const myInit = new INIT("DELETE")
        const url = api + `/pizza/${pizzaID}`

        return await (await fetch(url,myInit)).json()
    }


    /*
    =============================
            User Requests
    =============================
    */

    static async getUser(){
        const myInit = new INIT("GET")
        const url = api + '/user'

        return await (await fetch(url,myInit)).json()
    }

    static async login(user){
        const myInit = new INIT("POST",user)
        const url = api + '/login'

        return await (await fetch(url,myInit)).json()
    }

    static async logout(){
        const myInit = new INIT("POST")
        const url = api + '/logout'

        return await (await fetch(url,myInit)).json()
    }
    
}

export default API