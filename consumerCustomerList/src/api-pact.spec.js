const path = require('path')
const { Pact } = require('@pact-foundation/pact')
const HTTP_Service = require('../http.service')

const provider = new Pact({
    consumer: 'Consumer Customer List',
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

    describe('getting all customers', () => {
        test('customers exist', async () => {
            await provider.addInteraction({
                state: 'customers exist',
                uponReceiving: 'get all customers',
                withRequest: {
                    method: 'GET',
                    path: '/customers/overview'
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: [
                        {
                            id: 1,
                            name: "Bernd Peter",
                            email: "bernd.peter@cdc.com",
                            status: "active"
                        },
                        {
                            id: 2,
                            name: "Mike Walters",
                            email: "mike.walters@cdc.com",
                            status: "not active"
                        }
                    ]
                }
            })

            const http_service = new HTTP_Service(provider.mockService.baseUrl);
            const customers = JSON.parse(await http_service.fetchCustomers());

            expect(customers).toStrictEqual([
                { id: 1, name: 'Bernd Peter', email: 'bernd.peter@cdc.com', status: 'active' },
                { id: 2, name: 'Mike Walters', email: 'mike.walters@cdc.com', status: 'not active' }
            ])
        })

        test('no customers exist', async () => {
            await provider.addInteraction({
                state: 'no customer exist',
                uponReceiving: 'get all customers',
                withRequest: {
                    method: 'GET',
                    path: '/customers/overview'
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