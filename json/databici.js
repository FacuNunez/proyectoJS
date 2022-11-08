export const databicis = async() =>{
    const response = await fetch("./json/databici.js")
    const data = await response.json()
    return data
} 