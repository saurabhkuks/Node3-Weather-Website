const request=require('request')

const foreCast=(longitude,latitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=d404f3633ff278e456921019d410f96c&query='+latitude+','+longitude+'&units=f'

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Some connection serivce error',undefined)
        }else if(body.error){
            callback('Unable to find the given location....Please try other One',undefined)
        }else{
            callback(undefined,'Current temperature of the place is '+body.current.temperature +' Fahrenheit')
        }
    })
}

module.exports=foreCast