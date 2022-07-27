import axios from 'axios'
import request from 'request'


export async function forecast (latitude, longitude, callback) {
    const params = {
        access_key: '8f1a9a8017e99b3191ab1961500dcc8d',
        query: latitude+','+longitude
      }
      const url = 'http://api.weatherstack.com/current?access_key=' + params.access_key + '&query=' + params.query
      request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body)
        }
    })
        
}