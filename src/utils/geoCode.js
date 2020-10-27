const request=require('request')

const geoCode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2F1cmFiaDE5OTQiLCJhIjoiY2tnb3ZoeDY1MTF6eDJ4cDl3ZTJmZm40aiJ9.TDQvC0kMQrqMv4JIAoAP4Q&limit=1'

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect with service',undefined)
        }else if(body.features.length===0){
            callback('Unable to find loacation',undefined)
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports=geoCode