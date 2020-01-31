const { Verifier } = require('@pact-foundation/pact');
const path = require('path');
const routes = require('../routes')
const Customer = require('./customer')
const FinancialProduct = require('../financial_products/financial_product')

const customerController = require('./customer.controller')

// Setup provider server to verify
const app = require('express')();
app.use(routes);
const server = app.listen("8080");

describe("Pact Verification", () => {
    it("validates the expectations of CustomerService", () => {
        let opts = {
            logLevel: "INFO",
            providerBaseUrl: "http://localhost:8080",
            provider: "CustomerService",
            providerVersion: "1.0.0",

            // using pact files: 
            // pactUrls: [
            //     path.resolve(__dirname, '../pacts/consumerone-customerservice.json')
            // ],

            //using broker:
            pactBrokerUrl: process.env.PACT_BROKER_URL || "http://localhost:8081",
            pactBrokerUsername: process.env.PACT_BROKER_USERNAME || "pact_workshop",
            pactBrokerPassword: process.env.PACT_BROKER_PASSWORD || "pact_workshop",

            stateHandlers: {
                "customers exist": () => {
                    customerController.repository.customers = new Map([
                        ["09", new Customer(1, 'Bernd Peter', new Date(1996, 5, 5), 'bernd.peter@cdc.com', 'active')],
                        ["10", new Customer(2, 'Mike Walters', new Date(1992, 5, 5), 'mike.walters@cdc.com', 'not active')]
                    ]);
                },

                "no customer exist": () => {
                    customerController.repository.customers = new Map();
                },

                "customer balances exist": () => {
                    const customerOne = new Customer(1, 'Bernd Peter', new Date(1996, 5, 5), 'bernd.peter@cdc.com', 'active')
                    const customerOneFinancialProduct = new FinancialProduct(1, 'Sparbuch', 10000, 111, 1);
                    customerOne.addFinancialProduct(customerOneFinancialProduct);

                    const customerTwo = new Customer(2, 'Mike Walters', new Date(1992, 5, 5), 'mike.walters@cdc.com', 'not active');
                    const customerTwoFinancialProduct = new FinancialProduct(2, 'Savings', 66635, 222, 2);
                    customerTwo.addFinancialProduct(customerTwoFinancialProduct);

                    customerController.repository.customers = new Map([
                        ["09", customerOne],
                        ["10", customerTwo]
                    ]);
                },

                "no customers with balances exist": () => {
                    customerController.repository.customers = new Map();
                }
            }
        }

        // add
        if (process.env.CI || process.env.PACT_PUBLISH_RESULTS) {
            Object.assign(opts, {
                publishVerificationResult: true,
            });
        }

        return new Verifier(opts).verifyProvider().finally(() => {
            server.close();
        });
    })
});