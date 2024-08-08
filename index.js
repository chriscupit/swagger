const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json');

var vehicles = [{id:0,name:"Toyota"},{id:1,name:"Ford"}, {id:2,name:"Chevrolet"}, {id:3,name:"Dodge"}, {id:4,name:"Nissan"}]

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))



app.get("/vehicles", (req,res)=>{
    res.send(vehicles);
})
app.post("/vehicle",(req,res)=>{
    vehicles.push({id:req.body.id, name:req.body.name})
    res.send(`${JSON.stringify(vehicles)} created`)
})
app.delete("/vehicle/:id", (req,res)=>{
    console.log('delete:id:'+req.params.id)
    vehicles = vehicles.filter(item=> item.id != req.params.id)
    res.send("rvehicles left:"+JSON.stringify(vehicles));
})

app.listen(4000,()=>console.log('Listening on 4000'))