const express = require("express")
const validateToken = require("../middlware/validateTokenHandler");
const router = express.Router()
const {
       getContact,
       createContact, 
       updateContact, 
       deleteContact
    } = require ("../controllers/contactController");

router.use(validateToken) // attaches middleware validateToken to all the routers
router.route('/').get(getContact).post(createContact);
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);


module.exports = router;
