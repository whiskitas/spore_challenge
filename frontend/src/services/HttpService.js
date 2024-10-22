export default class HttpService {
    baseURL = "http://localhost:3000"
    constructor() { }

    // constructor(baseURL) {
    //   this.baseURL = baseURL;
    // }

    // Helper method for sending requests
    async request(endpoint, method = 'GET', body = null, headers = {}) {
        const config = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
        };

        if (body) { config.body = JSON.stringify(body) }

        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, config);
            if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`) }
            return await response.json();
        } catch (error) {
            console.error('Request failed:', error);
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
        return this.request(endpoint, 'PUT', body, headers);
    }

    // DELETE request
    delete(endpoint, headers = {}) {
        return this.request(endpoint, 'DELETE', null, headers);
    }
}
