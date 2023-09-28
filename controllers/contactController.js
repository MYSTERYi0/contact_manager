const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel");
const { param } = require("../routes/contactRoutes");

const getContact = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id }); // New variable 'contact' which will store the value of querying the variable Contact.
    if(!contacts){
        res.status(404)
        throw new Error("Contact not found");
    }
    res.status(200).json(contacts)
});


const createContact = asyncHandler(async(req, res) => {
    console.log("The request body is: ", req.body) // Need to middleware parser to read and parse the body in req
    const {name, email, phone} = req.body
    if(!name || !email || !phone){ // Error handling
        res.status(400);
        throw new Error("All fields are mandatory")
    }

    const contact = await Contact.create(
        {
            name, // this is equivalkent to name=name like u did in Django
            email,
            phone,
            user_id: req.user.id,
        }
    );
    res.status(201).json(contact)
});
// 0.94 0.05

const updateContact = asyncHandler(async(req, res) => {
    const contacts = await Contact.findById(req.params.id)
    if(!contacts){
        res.status(404)
        throw new Error("Contact not found");
    }

    if(contacts.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error ("Can not update data of other users")
    }

    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}  // instruct mongoose to return the new version of the document (after updating)
        );
        
        res.status(200).json(updateContact);
        // res.status(200).json({message: `Updated contacts for ${req.params.id}`})
    });
    
    const deleteContact = asyncHandler(async(req, res) => {
        const contacts = await Contact.findById(req.params.id)
        if(!contacts){
            res.status(404)
            throw new Error("Contact not found");
        }

        if(contacts.user_id.toString() !== req.user.id){
            res.status(403);
            throw new Error ("Can not delete data of other users")
        }

        await Contact.findOneAndDelete();  // .remove() does not work hence used this.
        res.status(200).json(contacts)
});

module.exports = {getContact, createContact, updateContact, deleteContact}