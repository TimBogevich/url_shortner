import store from './store'

export default function (req, res, next) {
  const { encodedUrl } = req.body;
  const decodedUrl = store.getUrl(encodedUrl)
  if (decodedUrl) {
    res.end(decodedUrl);
  } else {
    throw new Error('no such url')
  }
  next()
}