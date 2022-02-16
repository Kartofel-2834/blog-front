function wordCompare(a, b){
  let one = a.toLowerCase()
  let two = b.toLowerCase()

  let iterations = one.length > two.length ? two.length : one.length
  let charNum = (c)=>{ return c.toLowerCase().charCodeAt() }

  if ( one == two ){ return -1 }

  for ( let i=0; i < iterations; i++ ){
    if ( charNum(one[i]) > charNum(two[i]) ){ return 0 }

    if ( charNum(two[i]) > charNum(one[i]) ) { return 1 }
  }

  return -1
}

function simpleBinarySearch(arr, num, key, start, end){
  if ( arr.length == 0 || !num ){ return -1 }

  let low = start ? start : 0
  let high = end ? end : arr.length
  let mid = low + Math.floor((high-low) / 2)

  let midVal = arr[mid][key] ? arr[mid][key] : arr[mid]

  if ( !midVal || low == high ){ return -1 }

  if ( midVal == num ){ return mid }

  if ( midVal > num ){
    high = mid
  } else {
    low = mid + 1
  }

  return simpleBinarySearch(arr, num, key, low, high)
}

function binarySearch(arr, word, key, start, end){
  if ( arr.length == 0 || word.length == 0 ){ return -1 }

  let low = start ? start : 0
  let high = end ? end : arr.length
  let mid = low + Math.floor((high-low) / 2)

  let midWord = arr[mid][key] ? arr[mid][key] : arr[mid]

  if ( !midWord || low == high ){ return -1 }

  let comparing = wordCompare(midWord, word)

  if ( comparing == -1 ){ return mid }

  if ( comparing == 0 ){
    high = mid
  } else if ( comparing == 1 ){
    low = mid + 1
  }

  return binarySearch(arr, word, key, low, high)
}

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
    return answer.throwErr(`strict_redirect-/${ authdata.tagname }`)
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
  wordCompare: wordCompare,
  binarySearch: binarySearch,
  simpleBinarySearch: simpleBinarySearch,

  jsonPostRequest: jsonPostRequest,
  jsonBodyRequest: jsonBodyRequest,
  getCurrentAndPageUsers: getCurrentAndPageUsers,
  apiUrl: "http://localhost:3000",
}
