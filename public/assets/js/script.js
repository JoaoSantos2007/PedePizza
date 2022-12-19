const url = `${window.location.protocol}//${window.location.host}`

function navigate(path){
    const newUrl = url + path

    window.location.assign(newUrl)
}

class requestInit{
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

export {url, navigate, requestInit}