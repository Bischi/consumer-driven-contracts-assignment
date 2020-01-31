class Customer {
    constructor(id, name, dateOfBirth, email, status) {
        this.id = id
        this.name = name
        this.dateOfBirth = dateOfBirth
        this.email = email
        this.status = status

        this.financialProducts = []
    }

    setAddress(address) {
        this.address = address
    }

    addFinancialProduct(financialProduct) {
        const duplicates = this.financialProducts.find(t => t.name === financialProduct.name)

        if (duplicates) {
            return console.error('New FinancialProduct is already registered')
        }

        this.financialProducts.push(financialProduct)
    }
}

module.exports = Customer