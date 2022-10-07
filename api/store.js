const store = {}

const setUrl = (id, url) => {
  store[id] = url 
}

const getUrl = (id) => {
  return store[id]
}


const getAllUrl = (id) => {
  return Object.values(store)
}

export default {
  setUrl,
  getUrl,
  getAllUrl,
}
