const Customer = require('./customer');
const Address = require('./address');
const FinancialProduct = require('../financial_products/financial_product')

const customerOne = new Customer(1, 'Bernd Peter', new Date(1996, 5, 5), 'bernd.peter@cdc.com', 'active');
const customerOneAddress = new Address(1, "Dresdner-Straße", 107, 1200, 'Vienna');
customerOne.setAddress(customerOneAddress)

const customerOneFinancialProduct = new FinancialProduct(1, 'Sparbuch', 1000, 111, 1);
customerOne.addFinancialProduct(customerOneFinancialProduct);

const customerTwo = new Customer(2, 'Mike Walters', new Date(1992, 5, 5), 'mike.walters@cdc.com', 'not active');
const customerTwoAddress = new Address(2, "Main Street", 212, 2222, 'Mooncity');
customerTwo.setAddress(customerTwoAddress)

const customerTwoFinancialProduct = new FinancialProduct(2, 'Savings', 66635, 222, 2);
customerTwo.addFinancialProduct(customerTwoFinancialProduct);

class CustomerRepository {
    constructor() {
        this.customers = new Map([
            ["09", customerOne],
            ["10", customerTwo]
        ]);
    }

    async fetchAll() {
        return [...this.customers.values()];
    }
}

module.exports = CustomerRepository