async function jsonPostRequest(url, data){
  try {
    const response = await fetch(url, {
      method: 'POST',
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
  jsonPostRequest: jsonPostRequest
}
