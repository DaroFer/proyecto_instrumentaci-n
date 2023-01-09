const mqtt = require('mqtt')
const express = require('express')
const app = express()
const port = 3000 || process.env.port

let minumun_temperature = 20
let maximun_temperature = 25

let minumun_humidity = 20
let maximun_humidity = 25

const startMqttCLient = () => {
    const url = 'wss://io.adafruit.com'
    const options = {
        // Clean session
        clean: true,
        connectTimeout: 4000,
        // Authentication
        clientId: '0F6YVCKSE7NEQPTNPJW6RVA55P',
        username: 'shalizxdxd',
        password: 'aio_QhhE371lsZXUILtQYs6WC6vip0oh',
        reconnectPeriod: 1000
    }

    const client = mqtt.connect(url, options)

    client.on('connect', function () {
        console.log('Connected')
        // Subscribe to a topic
        client.subscribe('shalizxdxd/feeds/humedad', function (err) {
            if (err) {
                console.log(err)
            }
        })

        client.subscribe('shalizxdxd/feeds/temperatura', function (err) {
            if (err) {
                console.log(err)
            }
        })
    })

    client.on('message', function (topic, message) {
        console.log(topic, message.toString())
    })
}

app.post('/change/max-temp', (req, res) => {
    const { value } = req.body
    maximun_temperature = value
    return res.json({})
})
app.post('/change/min-temp', (req, res) => {
    const { value } = req.body
    minumun_temperature = value
    return res.json({})
})
app.post('/change/max-h', (req, res) => {
    const { value } = req.body
    maximun_humidity = value
    return res.json({})
})
app.post('/change/min-h', (req, res) => {
    const { value } = req.body
    minumun_humidity = value
    return res.json({})
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    startMqttCLient()
})