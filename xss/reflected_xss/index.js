const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const port = 3001

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.post('/post', (req, res, next) => {
    const { username, password } = req.body
    if (username != '' && password != '') {
        const cookie = `${username}-cookie`
        res.cookie('cookie', cookie).redirect(`/home`)
    }
})

app.get('/home', (req, res) => {
    res.send('Login successfully!')
})

app.get('/search', (req, res) => {
    // // defend
    // req.query.query = req.query.query.replaceAll('<script>', '')
    // req.query.query = req.query.query.replaceAll('</script>', '')
    // req.query.query = req.query.query.replaceAll('script', '')

    res.send(`
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>

    <body>
        <div>Result: Crepe sầu riêng miễn phí ${req.query.query}</div>
        <div>
            <img src="https://cdn.tgdd.vn/Files/2020/05/07/1254024/cach-lam-banh-crepe-la-dua-nhan-kem-sau-rieng-thom-5.jpg" alt=""/>
        </div>
    </body>

    </html>`)
})

app.get('/hack', (req, res) => {
    console.log(req.query);
    return res.redirect('/search?query=crepe');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})