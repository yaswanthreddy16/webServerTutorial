import path from 'path'
import { fileURLToPath } from 'url'
import express, { query } from 'express'
import hbs from 'hbs'
import { forecast } from './utils/forecast.js'
import {geocode} from './utils/geocode.js'
const app = express()
const port = 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultDir = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(defaultDir));
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
  res.render('index', {
    name: 'Yaswanth',
    title: 'Weather'
  })
})

app.get('/help', (req, res) => {
    res.render('help', {
      message : 'This is the help section',
      name: 'Yaswanth',
      title: 'Help'
    })
  })

  app.get('/about', (req, res) => {
    res.render('about', {
      name: 'Yaswanth',
      title: 'About'
    })
  })

  app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
              console.log("in error")
                return res.send({ error })
            }
            console.log("not in error")
            res.send({
                forecast: forecastData.current.weather_descriptions[0],
                location,
                address: req.query.address
                
            })
        })
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})