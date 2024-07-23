import { custom } from "joi"





function setValueCaptialize(isCaptialized: boolean){
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor){
        const originalMethod = descriptor.value as Function

        function setStringToCaptalized(text: string): string{
            return text.toUpperCase()
        }
        function setStringToLowerCase(text: string): string{
            return text.toLowerCase()

        }

        descriptor.value = function(...args: any[]): any{
            const result = originalMethod.apply(this, args)
            if(typeof result === "string"){
                return isCaptialized === true ? setStringToCaptalized(result) : setStringToLowerCase(result)
            }
            return result
        }
        return descriptor
    }
   
}

type K = string
type V = any

interface localstorage extends Partial<Map<K,V>> {
    cache?: (key: string | symbol) => void
}

let customMap: localstorage = {
    cache: (value: string | symbol) => console.log(value)
}

let map = new Map<string, any>()
map.set("id", 1)
map.set("jwt", "sd97fyusdf0a94wrhosf0sdfhosdf")

console.log(map.get("id"))

class User {
    public user: string = "MICHAEL"
    private _id: number = 0

    @setValueCaptialize(false)
    getUser(customMessage: string): string {
        return customMessage //= descriptor.value
    }
    
    
    get getId(){
        return this._id
    }
}

let user = new User()
let message = user.getUser("This is a user....")
console.log(message)