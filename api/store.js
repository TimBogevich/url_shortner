const store = {}

const setUrl = (id, url) => {
  store[id] = url 
}

const getUrl = (id) => {
  return store[id]
}


export default {
  setUrl,
  getUrl,
}
