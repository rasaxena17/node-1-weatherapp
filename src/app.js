const path = require('path')
const express = require('express')
const app = express()
const hbs=require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Defive paths for Express config
const publicDirectoryPath =path.join(__dirname, '../public')
const viewsPath=path.join(__dirname, '../templates/views')
const partialsPath=path.join(__dirname, '../templates/partials')

//Setup handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{

    res.render('index', {

        title: 'Weather',
        name: 'Rashmi'

    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Rashmi'

    })
})

app.get('/help', (req,res)=>{

    res.render('help', {

        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Rashmi'
    })
})

app.get('/weather', (req,res)=>{

    if (!req.query.address){

        return res.send({

            error: 'Address must be entered'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={}) =>{
        if (error) {

            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {

                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })  
   
})

app.get('/products', (req,res)=>{
    console.log(req.query.search)

    if (!req.query.search) {

       return res.send({
            error: 'You must provide a search term'
        })
       

    }
    res.send({

        products: []
    })
})

app.get('/help/*', (req,res)=>{

    res.render('404', {
        title: '404',
        name: 'Rashmi',
        errorMessage: 'Help article not found.'
    
       })
})

app.get('*', (req,res)=>{

   res.render('404', {
    title: '404',
    name: 'Rashmi',
    errorMessage: 'Page not found.'

   })
})


app.listen(3000, () =>{

    console.log('Server is up on port 3000.')
})
