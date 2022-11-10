const path = require('path')
const getLatLong = require('./utils/geoCode')
const getWeather = require('./utils/weatherByLatLong')
const express = require('express')
const hbs = require('hbs')
const port = process.env.PORT || 3000

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.city){
        return res.send({
            error : "Must provide city name in URL"
        })
    }
    //getLatLongdemo
    getLatLong(req.query.city,(error,location)=>{
        if(error){
            return res.send({
                error : "Unable to connect location API"
            })
        }else if(location.error){
            return res.send({
                error : "Something went wrong with location API"
            })
        }else{
            getWeather(location,(error,weather)=>{
                if(error){
                    return res.send({
                        error : "Unable to connect Weather API"
                    })
                }else if(weather.error){
                    return res.send({
                        error : "Something went wrong with weather API"
                    })
                }else{
                    console.log(weather)
                    res.send({
                        weather
                    })
                }
            })
        }
    })

})

app.get('/donate',(req,res)=>{
    if(!req.query.payment){
        return res.send({
            error : "must provide query in the URL"
        })
    }
    
    console.log(req.query)

    res.send({
        message : "Thank you for donating "+req.query.payment+" rs"
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})