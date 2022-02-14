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

async function getCurrentAndPageUsers(authdata, urlTag, apiUrl){
  let answer = {
    user: null,
    currentUser: null,
    err: { exist: false, solution: null },

    throwErr: function(solution){
      this.err.exist = true
      this.err.solution = solution

      return this
    },
  }

  if ( !authdata || !authdata.authkey || !authdata.tagname ){
    return answer.throwErr("redirect-/signin")
  }

  if ( !urlTag || urlTag.length == 0 ){
    return answer.throwErr(`redirect-/${ auth.tagname }`)
  }

  let res = await jsonPostRequest(`${ apiUrl }/`, authdata)

  if ( Math.floor(res.status / 100) != 2 ){
    return answer.throwErr("redirect-/signin")
  }

  res = await res.json()

  let usertype = res.type
  let user = res.user

  if ( !usertype || usertype != 'owner' ){
    return answer.throwErr("redirect-/signin")
  }

  answer.currentUser = user && user.id ? user : null

  if ( answer.currentUser && user.tagname == urlTag ){
    answer.user = user
    answer.usertype = 'owner'
    return answer
  }

  res = await jsonPostRequest(`${ apiUrl }/`, { tagname: urlTag })

  if ( Math.floor(res.status / 100) != 2 ){
    return answer.throwErr("redirect-/signin")
  }

  res = await res.json()

  if ( !res || !res.user || !res.user.id ){
    return answer.throwErr("alert-Oops! Something went wrong. We can't get this user")
  }

  answer.user = res.user
  answer.usertype = res.type
  return answer
}

export default {
  jsonPostRequest: jsonPostRequest,
  jsonBodyRequest: jsonBodyRequest,
  getCurrentAndPageUsers: getCurrentAndPageUsers,
  apiUrl: "http://localhost:3000",
}
