import axios from 'axios'
import app from './../main'

let http = axios.create({
	baseURL: "endpoint_url"
})

http.interceptors.request.use(
	config => {
    app.$Progress.start() // for every request start the progress
    // config.headers['x-api-key'] = 'dhjjAsIDvG4CuClPjxrIk6FMJQTsJjsM7Z9dYKiY'
		return config
	},
	error => {
		app.$Progress.fail()
		return Promise.reject(error)
})

http.interceptors.response.use(
	response => {
		app.$Progress.finish() // finish when a response is received
		return response
	},
	error => {
		app.$Progress.fail()
		return Promise.reject(error)
})

export default http