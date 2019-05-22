const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/db1fb57352b95a54fda3dc21e85b05a5/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si'
    request({url, json:true}, (error, {body}) =>{
        if (error) {
            callback('Unable to connect to location services', undefined)
        }
        else if (body.error){
            callback('Unable to find location', undefined)
        }

       else {
              
        callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. The temperature high is ' + body.daily.data[0].temperatureHigh + ' and low is ' + body.daily.data[0].temperatureLow +   '. There is a chance of ' + body.currently.precipProbability + '% rains.'
           )
       }

    })


}

module.exports = forecast