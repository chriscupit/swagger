const express = require('express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

var vehicles = [{id:0,name:"Toyota"},{id:1,name:"Ford"}, {id:2,name:"Chevrolet"}, {id:3,name:"Dodge"}, {id:4,name:"Nissan"}]

const app = express();
app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Vehicles API",
            version: "1.0.0"
        }
    },
        apis: ["app.js"]
}
/**
 * @swagger
 * /vehicles:
 *  get:
 *      summary: get all vehicles
 *      produces:
 *          application/json
 *  responses:
 *      200: success
 *      description : an array of vehicles
 *      schema:
 *          $ref: "#definitions/vehicle"
 * definitions:
 *  vehicle:
 *      properties:
 *          id:
 *              type: integer
 *          name:
 *              type: string
 * 
 * 
 */


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.get("/vehicles", (req,res)=>{
    res.send(vehicles);
})

/**
 * @swagger
 * /vehicle:
 *  post:
 *      summary: add a vehicle
 *      requestBody:
 *          $ref: '#/components/requestBodies/VehicleBody'
 *      required:
 *          -id:
 *          -name:
 * responses:
 *          201:
 *              description: created vehicle
 *
 * definitions:
 *  vehicle:
 *      properties:
 *          id:
 *              type: integer
 *          name:
 *              type: string
 * components:
 *  requestBodies:
 *      VehicleBody:
 *          description: A JSON object of vehicle information
 *          required: true
 *          content:
 *              application/json:
 *              schema:
 *                  $ref: '#/definitions/vehicle'
 *       
 */


app.post("/vehicle",(req,res)=>{
    res.send(`${req.body.name} created`)
})


app.listen(4000,()=>console.log('Listening on 4000'))