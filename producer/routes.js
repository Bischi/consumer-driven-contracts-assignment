const router = require('express').Router();
const customerController = require('./customers/customer.controller')

router.get('/customers/overview', customerController.getAllOverview)
router.get('/customers/balances', customerController.getContactsWithFinanceOverview)

//provide error page for every other route
router.get('*', (req, res) => {
    res.send('endpoint was not found')
})

module.exports = router