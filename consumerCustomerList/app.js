const HTTP_SERVICE = require('./http.service')

const httpService = new HTTP_SERVICE();

httpService.fetchCustomers().then(data => {
    console.log('Data received: ', data)
}).catch(error => {
    console.log('Error: ', error)
})