
export async function getDisneyCharacters(){
const response = await fetch("https://api.disneyapi.dev/character")
const data = response.json()
return data
}

