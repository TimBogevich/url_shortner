import store from './store'

export default function (req, res, next) {
  const urls = store.getAllUrl()
  res.end(JSON.stringify(urls));
  next()
}