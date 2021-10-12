const express = require('express')
const path = require('path')
const rollbar = new Rollbar({
    accessToken: 'd0cb15f19f2b404f9cb5e35fbd8b845a',
    captureUncaught: true,
    captureUnhandledRejections:true
})

const app = express()

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

const port = process.env.PORT || 4400


app.listen(port, () => console.log(`server up and running on ${port}!`))