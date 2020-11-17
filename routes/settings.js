const aesjs = require('aes-js');
const auth = require('../middleware/auth')
const _ = require('lodash')
const axios = require('axios')

const express = require('express');
const router = express.Router();


router.post('/', [auth], async (req, res) => {

    const bodyReq = JSON.stringify(req.body)
    const textBytes = aesjs.utils.utf8.toBytes(bodyReq);

    try {
        const dataRes = await axios.post('http://localhost:3001/settings', textBytes)
        const decryptedText = aesjs.utils.utf8.fromBytes(dataRes);
        res.status(200).send(JSON.parse(decryptedText))
    } catch (e) {
        res.status(400).send('ERROR')
    }

});
router.get('/:id', [auth], async (req, res) => {

    const id = JSON.stringify(req.params.id)

    const textBytes = aesjs.utils.utf8.toBytes(id);

    try {
        const dataRes = await axios.get(`http://localhost:3001/settings/${textBytes}` )
        const decryptedText = aesjs.utils.utf8.fromBytes(dataRes);
        res.status(200).send(JSON.parse(decryptedText))
    } catch (e) {
        res.status(400).send('ERROR')
    }

});
router.patch('/', [auth], async (req, res) => {


    const bodyReq = JSON.stringify(req.body)

    const textBytes = aesjs.utils.utf8.toBytes(bodyReq);

    try {
        const res = await axios.post('http://localhost:3001/settings', textBytes)
    } catch (e) {
        res.status(400).send('ERROR')
    }

    const decryptedText = aesjs.utils.utf8.fromBytes(res);

    res.status(200).send(JSON.parse(decryptedText))


});
router.delete('/:id', [auth], async (req, res) => {

    const id = JSON.stringify(req.params.id)
    const textBytes = aesjs.utils.utf8.toBytes(id);
    try {
        const dataRes = await axios.get(`http://localhost:3001/settings/${textBytes}` )
        const decryptedData = aesjs.utils.utf8.fromBytes(dataRes);
        res.status(200).send(JSON.parse(decryptedData))
    } catch (e) {
        res.status(400).send('ERROR')
    }

});

module.exports = router;
