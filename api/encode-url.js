import randomstring from 'randomstring'
import store from './store'

export default function (req, res, next) {
  const { urlOrig } = req.body;
  const encodedURL = randomstring.generate(8);
  store.setUrl(encodedURL,urlOrig)
  res.end(encodedURL);
  next()
}