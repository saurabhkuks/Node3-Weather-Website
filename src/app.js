const path=require('path')
const express=require('express')
const hbs=require('hbs')


const app=express()
const port=process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

const geoCode=require('./utils/geoCode')
const forecast=require('./utils/foreCast')

//setup handlebars engine and views
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        name:'Saurabh Kukreti',
        title:'Weather'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name:'Saurabh Kukreti',
        title:'About'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:"this is some helpfultext",
        title:'Help',
        name:'Saurabh Kukreti'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Enter some address pls'
        })
    
    }else{
        const address=req.query.address
        geoCode(address,(error,{latitude,longitude,location}={})=>{
            if(error){
                return res.send({error})
            }

            forecast(longitude,latitude,(error,forecastData)=>{
                if(error){
                    return res.send({error})
                }

                    res.send({
                        forecast:forecastData,
                        location,
                        address:req.query.address
                        
                    })
                    
                })
            

        })
    }

    
    
})


app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send(
            {
                error:'You must provide a search term'
            }
        )
        
    }

    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 Page',
        message:'Help Article not found',
        name:'Saurabh Kukreti'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 Page',
        message:'Page under Construction',
        name:'Saurabh Kukreti'
    })
})



// app.get('/help',(req,res)=>{
//     res.send('Hello from the express help')
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>about</h1>')
// })


app.listen(port,()=>{
    console.log('Server is running at '+port)
})
