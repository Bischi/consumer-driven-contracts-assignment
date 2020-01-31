# Pact with NodeJS 
> Martin Bischof

Die Anwendung wurde mit Node.js umgesetzt und enthält einen Producer und zwei Consumer.

## Producer

Der Producer stellt Customers über folgende API's zur Verfügung: 
- /customer/overview
    - Ergebnis: List von allen registrierten **Customers mit Name, Email und Status**
- /customer/balances
    - Ergebnis: Liste von alle registierten **Customers mit deren Balance** (= Summe von allen FinancialProduct-Balances diesen Customers)


## Consumer Customer List
Dieser Consumer verwendet die REST-API ***/consumer/overview*** des Producers.

**Pact Files**: 
- src/api-pact.spec.js
- pacts/consumer_customer_balance-customerservice.json

Starten mit: `npm run start`

## Consumer Customer Balance
Dieser Consumer verwendet die REST-API ***/consumer/balances*** des Producers.

**Pact Files**: 
- src/api-pact.spec.js
- pacts/consumer_customer_list-customerservice.json

Starten mit: `npm run start`

## Running Pact

**How to use the Pact Broker**

1. `docker-compose up` in root-folder (sollte ein file mit: docker-compose.yaml enthalten)
2. den Prozess laufen lassen!
3. Website: http://localhost:8081/

**make pact Consumer**: 

- **without** publishing to broker: `npm run test:pact`
- with publishing to broker: `PUBLISH_PACT=true npm run test:pact`

**make pact verification Provider**

- **without** publishing to broker: `npm run test:pact`
- with publishing to broker: `PACT_PUBLISH_RESULTS=true npm run test:pact`


## Results für Assignment

Die Screenshots im Verzeichnis: `./screenshots/`

**Broker-Site**

![Broker Site](/screenshots/broker-overview.png)

**Consumer Customer List Details**

![Broker Site](/screenshots/broker-customerList-details.png)

**Consumer Customer Balance Details**

![Broker Site](/screenshots/broker-customerBalance-details.png)
