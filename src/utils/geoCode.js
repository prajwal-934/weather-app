
const request = require('request')
const getGeoCode = (ip,callbackfun)=>{
    const ipURL = `https://ipinfo.io/${ip}?token=a5598ef9d5cea4`;
    request({uri:ipURL},(error,response)=>{
        const resData = JSON.parse(response.body)
        if(error){
            callbackfun("Unable to connect ipInfo...", undefined)
        }else if(resData.error){
            callbackfun("Incorrect IP Address", undefined)
        }
        else{
            const loc = resData.loc.split(',');
            callbackfun(undefined , {
                lat : loc[0],
                long : loc[1]
            })
        }
    
    })
}

module.exports = getGeoCode