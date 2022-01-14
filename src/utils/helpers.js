async function jsonPostRequest(url, data){
  return await jsonBodyRequest(url, "POST", data)
}

async function jsonBodyRequest(url, method, data){
  try {
    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers:{ 'Content-Type': 'application/json;charset=utf-8' },
    })

    return response
  } catch (error) {
    console.log("Error: ", error)
    return null
  }
}

export default {
  jsonPostRequest: jsonPostRequest,
  jsonBodyRequest: jsonBodyRequest,
  apiUrl: "http://localhost:3000",
}
