const express = require('express')
const bodyParser = require("body-parser")
const { resolve } = require('path')
const { findUser } = require('./service/user')
const { errors } = require('./config/error')
const { ACCESS_KEY, REFRESH_KEY } = require('./config/key')
const { generateToken } = require('./util/jwt')
const { getProducts } = require('./service/product')
const { checkAuth } = require('./middleware/token')


const app = express()
app.use(bodyParser.json())


app.get('/page/login', (req, res) => {
  res.sendFile(resolve(__dirname, 'public/login.html'))
})

app.get("/page/home", (req, res) => {
  res.sendFile(resolve(__dirname, "public/index.html"));
});

app.post("/logins", (req, res) => {
  const { mobile, password } = req.body;

  const user = findUser(mobile)

  if (!user) {
    // Bad request
    return res.status(403).json(errors.MOBILE_NOT_EXISTS)
  }

  if (password !== user.password) {
    return res.status(403).json(errors.WRONG_PASSWORD)
  }

  const payload = {
    user_id: user.id,
    nickname: user.nickname,
    role: user.role
  }

  const accessToken = generateToken(payload, ACCESS_KEY, 60);
  const refreshToken = generateToken(payload, REFRESH_KEY, 120)

  res.status(200).json({
    code: 0,
    msg: 'ok',
    data: {
      access_token: accessToken,
      refresh_token: refreshToken
    }
  })
});


app.get('/products', checkAuth(ACCESS_KEY),  (req, res) => {
  
  const products = getProducts();

  res.status(200).json({
    code: 0,
    msg: "ok",
    data: products
  });
})

app.get('/refresh_token', checkAuth(REFRESH_KEY), (req, res) => {
  const { claim } = req
  console.log(req);
  console.log(claim);

  const payload = {
    user_id: claim.id,
    nickname: claim.nickname,
    role: claim.role
  }

  const accessToken = generateToken(payload, ACCESS_KEY, 60)
  res.status(200).json({
    code: 0,
    msg: "ok",
    data: {
      access_token: accessToken,
    },
  });
})




app.listen(8080, (req, res) => {
  console.log('Server is running on PORT 8080');
})