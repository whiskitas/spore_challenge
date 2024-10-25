export default class HttpService {
    constructor() {
        this.baseURL = "http://localhost:3000";
    }
    // constructor(baseURL) {
    //   this.baseURL = baseURL;
    // }

    // Helper method for sending requests
    // eslint-disable-next-line
    async request(endpoint, method = 'GET', body = null, headers = {}) {
        const config = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
        };

        if (body) {
            // eslint-disable-next-line
            config.body = JSON.stringify(body)
        }

        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, config);
            if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
            return response.json();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // GET request
    get(endpoint, headers = {}) {
        return this.request(endpoint, 'GET', null, headers);
    }

    // POST request
    post(endpoint, body, headers = {}) {
        return this.request(endpoint, 'POST', body, headers);
    }

    // PUT request
    put(endpoint, body, headers = {}) {
        try {
            return this.request(endpoint, 'PUT', body, headers);
        } catch (error) {
            console.log(error)
        }
    }

    // DELETE request
    delete(endpoint, headers = {}) {
        return this.request(endpoint, 'DELETE', null, headers);
    }
}
