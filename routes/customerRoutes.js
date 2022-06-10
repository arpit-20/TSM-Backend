const express = require('express');
const router = express.Router();


//  imported customerModel 
const customersData = require('../models/customers');



var nodeMail = require('../logics/blogic');

this.mailOptions={}

router.get('/', async (req, res) => {

    try {
        const consumers = await customersData.find();
        res.status(200).json(consumers);

    } catch (error) {
        console.log(" get error " + " " + error);

        res.status(400).json("Error" + " " + error);
    }

});


router.get('/:id', async (req, res) => {
    console.log('Get request by id');

    try {
        const consumer = await customersData.findById(req.params.id) //callback
        res.status(200).json(consumer);

    } catch (err) {
        console.log("get error" + err);

        res.status(400).json('error' + ' ' + error);
    }
});



router.post('/', async (req, res) => {
    console.log("body" + req.body);

    const customer = new customersData({

        name: req.body.name,
        email: req.body.email,
        purchase_form:req.body.purchase_form,
        service_form:req.body.service_form,
        contact_form:req.body.contact_form,
        team_name: req.body.team_name,
        mobile_number: req.body.mobile_number,
        shocker_brand: req.body.shocker_brand,
        number_of_pairs: req.body.number_of_pairs,
        type_of_service: req.body.type_of_service,
        type_of_shocker: req.body.type_of_shocker,
        problems_facing: req.body.problems_facing,
        part_type: req.body.part_type,
        number_of_peices: req.body.number_of_peices,
        other_requirement: req.body.other_requirement
    })

    
        console.log("post consumer" + customer);

    await customer.save().then((customerData)=>{
        res.status(201).json(customerData);
        
        }).catch(err=>{

        res.status(400).send("Error" + err)
        })

        


   

  
});



router.delete("/:id", async (req, res) => {
    try {
        console.log('consumer delete request');
        let consumerData = await customersData.findById(req.params.id)

        const deletedConsumer = await consumerData.delete();
        res.status(200).json(deletedConsumer)
    } catch (err) {
        res.send("err" + err)
    }

});


/**  put route*/

// router.put('/:id', async(req,res)=>{
//     console.log('put request');

//     try{
//     let consumerData=await consumersData.findById(req.params.id) 
//         consumerData.usn=req.body.usn;
//         consumerData.role=req.body.role;
//         consumerData.dob=req.body.dob;
//         consumerData.score=req.body.score;
//         consumerData.name=req.body.name;
//         consumerData.link=req.body.link;
//         const a1=await alien.save()
//     res.json(a1)
//     console.log(alien);

//     }catch(err){
//         console.log("hhh");

//         res.send('Error'+err)
//     }
//     })


/**  patch route*/


/**  patch route*/

router.patch('/:id', async (req, res) => {

    try {
        console.log('patch request');
        if (req.body) {

            await customersData.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((data) => {

                console.log('patch success' + data);

                return res.status(200).send(data);

                res.end();
            }).catch((err) => {

                console.log('patch error' + ' ' + err);
            });

        }
    } catch (error) {

        console.log('patch error');
        res.send("err" + error)
    }
});






module.exports = router;