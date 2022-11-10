const request = require('request')

const getWeatherDetails = (location,callbackfn)=>{
    const URL = `http://api.weatherstack.com/current?access_key=aae738b5c8fcd82e3d362b98dfdb4a15&query=${location.lat},${location.long}`;
    request({uri:URL},(error,response)=>{
        const resData = JSON.parse(response.body)
        if(error){
            callbackfn("unable to connect..." , undefined)
        }else if(resData.error){
            callbackfn("Invalid lat and long" , undefined)
        }else{
            const {city = resData.location.name,
                   temp = resData.current.temperature,
                   type = resData.current.weather_descriptions[0] } = resData;
            callbackfn(undefined , {
                city : city,
                temperature : temp,
                weatherType : type,
            })  
        }
    
    })
}

module.exports = getWeatherDetails