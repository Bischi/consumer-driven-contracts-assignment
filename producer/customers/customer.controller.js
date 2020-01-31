const CustomerRepository = require('./customer.repository')

const repository = new CustomerRepository();

const getAllOverview = async (req, res) => {
    try {
        const customers = (await repository.fetchAll()).map(t => {
            return { id: t.id, name: t.name, email: t.email, status: t.status }
        });

        res.status(200).send(customers)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getContactsWithFinanceOverview = async (req, res) => {
    const customers = (await repository.fetchAll()).map(t => {
        let balance = 0;

        t.financialProducts.forEach(x => balance += x.balance)

        return { name: t.name, balance: balance }
    });

    res.send(customers);
}

module.exports = {
    repository: repository,
    getAllOverview: getAllOverview,
    getContactsWithFinanceOverview: getContactsWithFinanceOverview
}