const express = require('express');
const router = express.Router();


//  imported customerModel 
const customersData = require('../models/customers');



var nodeMail = require('../logics/blogic');

this.mailOptions = {}

router.get('/', async (req, res) => {

    try {
        const customers = await customersData.find();
        res.status(200).json(customers);

    } catch (error) {
        console.log(" get error " + " " + error);

        res.status(400).json("Error" + " " + error);
    }

});


router.get('/:id', async (req, res) => {
    console.log('Get request by id');

    try {
        const customer = await customersData.findById(req.params.id) //callback
        res.status(200).json(customer);

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
        purchase_form: req.body.purchase_form,
        service_form: req.body.service_form,
        contact_form: req.body.contact_form,
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


    console.log("post customer" + customer);

    await customer.save().then((customerData) => {
        if (req.body.service_form == true) {

            console.log("service form");
            this.mailOptions = {
                from: 'Mail.theshockmechanica@gmail.com',
                to: ['arpitghai20@gmail.com', 'theshockmechanica@gmail.com'],
                cc: req.body.email,
                subject: 'Test node mail',
                text: `Hi` + ' ' + `${req.body.name}` + "\n" +
                    `This is an automated mail confirming your service request for` + ' ' +
                    `${req.body.number_of_pairs}` + ` ` + `pairs of` + ` ` + `${req.body.shocker_brand}.`
                    + ` ` + `The service requested is` + ' ' + `${req.body.type_of_service}.` + "\n" +
                    'Hence,quotation for team' + ` ` + `${req.body.team_name}` + ` ` + `will be mailed to you by EOD.` + "\n" +
                    `For any further queries, please don't hesitate to get in touch with us at (theshockmechanica@gmail.com or 9068056922).` + "\n" +
                    `Sincerely,` + "\n" +
                    `Harsh Jha` + "\n" +
                    `The Shock Mechanica`

            }
        }
        else if (req.body.purchase_form == true) {
            this.mailOptions = {
                from: 'Mail.theshockmechanica@gmail.com',
                to: ['arpitghai20@gmail.com', 'theshockmechanica@gmail.com'],
                cc: req.body.email,
                subject: 'Test node mail',
                text: `Hi` + ' ' + `${req.body.name},` + "\n" +
                    `This is an automated mail confirming your interest in buying` + ' ' +
                    `${req.body.number_of_peices}` + ` ` + `peices of` + ` ` + `${req.body.part_type}` + "." + "\n" +
                    + ' ' + `Hence, quotation for team` + ` ` + `${req.body.team_name}` + ` ` + `will be mailed to you by EOD.` + ' ' +
                    `For any further queries, please don't hesitate to get in touch with us at (theshockmechanica@gmail.com or 9068056922).` + "\n" +
                    `Sincerely,` + "\n" +
                    `Harsh Jha` + "\n" +
                    `The Shock Mechanica`

            }
        } else if (req.body.contact_form == true) {
            this.mailOptions = {
                from: 'Mail.theshockmechanica@gmail.com',
                to: ['arpitghai20@gmail.com', 'theshockmechanica@gmail.com'],
                cc: req.body.email,
                subject: 'Test node mail',
                text: `Hi` + ' ' + `${req.body.name}` + "\n" +
                    `This is an automated mail considering your requirement of` + ' ' + `${req.body.other_requirement}` + "\n" +
                    `We are looking in to your requirement and will respond you in time. ` + "\n" +
                    `For any further queries, please don't hesitate to get in touch with us at (theshockmechanica@gmail.com or 9068056922).` + "\n" +
                    `Sincerely,` + "\n" +
                    `Harsh Jha` + "\n" +
                    `The Shock Mechanica`

            }
        }


        nodeMail.sendMail(this.mailOptions, function (error, Info) {
            if (error) {
                res.status(400).json(error)
                console.log(error);
                
                customerData["email_sent"]=false;
                res.status(201).json(customerData);
            } else {
                if (Info.response) {
                    customerData["email_sent"]=true;
                    res.status(201).json(customerData);
                    
                    console.log('email has been sent', Info.response);
                } else {
                    
                    customerData["email_sent"]=false;
                    console.log('email has been sent', Info.rejected);

                    res.status(201).json(customerData);
                }

            }
        })

    }).catch(err => {

        res.status(400).send("Error" + err)
    })







});



router.delete("/:id", async (req, res) => {
    try {
        console.log('customer delete request');
        let customerData = await customersData.findById(req.params.id)

        const deletedcustomer = await customerData.delete();
        res.status(200).json(deletedcustomer)
    } catch (err) {
        res.send("err" + err)
    }

});


/**  put route*/

// router.put('/:id', async(req,res)=>{
//     console.log('put request');

//     try{
//     let customerData=await customersData.findById(req.params.id) 
//         customerData.usn=req.body.usn;
//         customerData.role=req.body.role;
//         customerData.dob=req.body.dob;
//         customerData.score=req.body.score;
//         customerData.name=req.body.name;
//         customerData.link=req.body.link;
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