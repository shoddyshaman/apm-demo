const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')

const rollbar = new Rollbar({
    accessToken: 'd0cb15f19f2b404f9cb5e35fbd8b845a',
    captureUncaught: true,
    captureUnhandledRejections:true
})

const app = express()

app.use(express.json())

app.use('/style', express.static(path.join(__dirname,'./public/styles.css')))

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

let students = []

app.post('/api/student', (req,res) => {
    let { name } = req.body
    name = name.trim()

    const index = students.findIndex(studentName => studentName = name)

    if(index === -1 && name != ''){
        students.push(name)
        rollbar.log('Student added successfully', {author:'Dj',type:'manual entry'})
        res.status(200).send(students)
    } else if (name === ''){
        rollbar.error('No name given')
        res.status(400).send('please provide a name.')
    } else {
        rollbar.error('student already exists')
        res.status(400).send('this student already exists')
    }
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4400


app.listen(port, () => console.log(`server up and running on ${port}!`))