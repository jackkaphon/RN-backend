const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors')

const con = mysql.createConnection({
    host: '159.89.206.43',
    user: 'jack',
    password: '123456',
    database: 'wannabedev'
})

con.connect()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello')
})

app.get('/getData', (req, res) => {
    con.query('SELECT * FROM user', (err, result) => {
        if (err) throw err

        res.send(result)
    })
})

app.post('/login', (req, res) => {
    res.send(req.body)
})

app.post('/register', (req, res) => {
    const {email, password} = req.body

    const createUserQuery = "INSERT INTO user (email, password) VALUES (?,?)"
    const params = [email, password]

    con.query(createUserQuery, params, (err, result) => {
        if (err) throw err

        res.send('Register Success')
    })
})

app.put('/updateUser', (req, res) => {
    const {email, password, id} = req.body

    const createUserQuery = "UPDATE user SET email = ? , password = ? WHERE id = ?"
    const params = [email, password, id]

    con.query(createUserQuery, params, (err, result) => {
        if (err) throw err
        res.send('Update Success')
    })
})

app.delete('/deleteUser', (req, res) => {
    const {id} = req.body

    const createUserQuery = "DELETE FROM user WHERE id = ?"
    const params = [id]

    con.query(createUserQuery, params, (err, result) => {
        if (err) throw err
        res.send('Delete Success')
    })
})

app.listen(port)