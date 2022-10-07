import randomstring from 'randomstring'
const store = {}

export default function (req, res, next) {
  const { urlOrig } = req.body;
  const encodedURL = randomstring.generate(8);
  store[encodedURL] = urlOrig
  res.end(encodedURL);
  next()
}