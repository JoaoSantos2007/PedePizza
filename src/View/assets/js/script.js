const api = `${window.location.protocol}//${window.location.host}`
const myUrl = window.location.href.replace(window.location.pathname,"")

const request = async (url,myInit) => {
    const res = await fetch(url,myInit)

    if(res.ok){
        return await res.json()
    } 
    else{
        console.log(await res.json())
        return false
    } 
}

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
        
        return await request(url,myInit)
    }

    //Read pizzas
    static async getPizzas(pizzaID){
        const myInit = new INIT("GET")
        const url = !pizzaID ? api + '/pizza' : api + `/pizza/${pizzaID}`

        return await request(url,myInit)
    }

    //Update pizza
    static async updatePizza(pizza,pizzaID){
        const myInit = new INIT("PUT",pizza)
        const url = api+`/pizza/${pizzaID}`

        return await request(url,myInit)
    }

    //Delete pizza
    static async deletePizza(pizzaID){
        const myInit = new INIT("DELETE")
        const url = api + `/pizza/${pizzaID}`

        return await request(url,myInit)
    }


    /*
    =============================
            User Requests
    =============================
    */

    //Create User
    static async createUser(user){
        const myInit = new INIT("POST",user)
        const url = api + '/user'

        return await request(url,myInit)
    }

    //Read User
    static async getUser(){
        const myInit = new INIT("GET")
        const url = api + '/user'

        return await request(url,myInit)
    }

    //Login User
    static async login(user){
        const myInit = new INIT("POST",user)
        const url = api + '/login'

        return await request(url,myInit)
    }

    //Logut User
    static async logout(){
        const myInit = new INIT("POST")
        const url = api + '/logout'

        return await request(url,myInit)
    }
    
}