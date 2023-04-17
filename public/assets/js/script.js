const url = `${window.location.protocol}//${window.location.host}`

function navigate(path){
    const newUrl = url + path

    window.location.assign(newUrl)
}

async function api(route, method,body=null,callback){
    const myUrl = url + route

    const myInit = {
        method,
        body: body ? JSON.stringify(body) : null,
        headers: {
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        },
        mode: "cors",
        caches: "defaut",
        credentials: "include"
    }

    try{
        const res = await fetch(myUrl,myInit)
        const data = await res.json()
        
        callback(data)
    }catch(err) {
        if(res.status === 401) return navigate("/login.html")
        
        error(err)
    }
}

function error(err){
    const errorSection = $("<section>").addClass("popup__error")

    const closeError = $("<img>").attr("src","assets/icon/close.svg").attr("alt","close error pop up").addClass("popup__error-close")

    closeError.click(() => {
        errorSection.remove()
    })

    const messageError = $("<p>").text(`${err.name}: ${err.message}`).addClass("popup__error-message")
    
    errorSection.append(closeError)
    errorSection.append(messageError)

    $("body").append(errorSection)

}

export {url, api, navigate, error}