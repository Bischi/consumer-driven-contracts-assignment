const request = require('request')

const defaultURL = 'http://localhost:3000'

class HTTPService {
    constructor(baseURL) {
        if (baseURL) {
            this.url = baseURL
        } else {
            this.url = defaultURL
        }
    }

    fetchCustomers() {
        return new Promise(async (resolve, reject) => {
            request.get({ url: this.url + '/customers/overview' }, (error, response) => {
                if (error) {
                    reject(error)
                } else if (response.body.error) {
                    reject(error)
                } else {
                    resolve(response.body);
                }
            })
        })
    }
}

module.exports = HTTPService