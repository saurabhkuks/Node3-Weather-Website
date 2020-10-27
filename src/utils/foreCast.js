const request=require('request')

const foreCast=(longitude,latitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=d404f3633ff278e456921019d410f96c&query='+latitude+','+longitude+'&units=f'

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Some connection serivce error',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,'Current temperature is '+body.current.temperature)
        }
    })
}

module.exports=foreCast