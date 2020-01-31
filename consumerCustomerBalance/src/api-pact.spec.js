const path = require('path')
const { Pact } = require('@pact-foundation/pact')
const HTTP_Service = require('../http.service')

const provider = new Pact({
    consumer: 'Consumer Customer Balance',
    provider: 'CustomerService',
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    logLeve: 'warn',
    dir: path.resolve(process.cwd(), 'pacts'),
    spec: 2
})

describe('API Pact test', () => {
    beforeAll(() => {
        return provider.setup()
    })

    afterEach(async () => {
        await provider.verify()
    })

    afterAll(async () => {
        return provider.finalize()
    })

    describe('getting all customer balances', () => {
        test('customers with balances exist', async () => {
            await provider.addInteraction({
                state: 'customer balances exist',
                uponReceiving: 'get all customer balances',
                withRequest: {
                    method: 'GET',
                    path: '/customers/balances'
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: [
                        { name: "Bernd Peter", balance: 10000 },
                        { name: "Mike Walters", balance: 66635 }
                    ]
                }
            })

            const http_service = new HTTP_Service(provider.mockService.baseUrl);
            const customers = JSON.parse(await http_service.fetchCustomers());

            expect(customers).toStrictEqual([
                { name: 'Bernd Peter', balance: 10000 },
                { name: 'Mike Walters', balance: 66635 }
            ])
        })

        test('no customers with balances exist', async () => {
            await provider.addInteraction({
                state: 'no customers with balances exist',
                uponReceiving: 'get all customer balances',
                withRequest: {
                    method: 'GET',
                    path: '/customers/balances'
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: []
                }
            })

            const http_service = new HTTP_Service(provider.mockService.baseUrl);
            const customers = JSON.parse(await http_service.fetchCustomers());

            expect(customers).toStrictEqual([])
        })
    })
})