import axios from 'axios'

// const base_url = 'http://tropicaltechcom-env.eba-a5mekaip.us-east-1.elasticbeanstalk.com/api'
const base_url = 'https://tropical-backend.herokuapp.com/api'
// const base_url = 'http://192.168.115.130:7676/api'

export const getSearchedHotelAll = (filter: any) => {
  return axios.post(`${base_url}/hotels`, filter)
}

export const getMostPopularHotels = () => {
  return axios.get(`${base_url}/hotels/mostpopular`)
}

export const getRecentsearchHotels = () => {
  return axios.get(`${base_url}/hotels/recentsearch`)
}

export const getDestinationIdeaHotels = () => {
  return axios.get(`${base_url}/hotels/destinationideas`)
}

export const getBestDealHotels = () => {
  return axios.get(`${base_url}/hotels/bestdeal`)
}

export const getHotelById = (id: number) => {
  return axios.get(`${base_url}/hotels/${id}/details`)
}

export const isBookable = (rateKey: string) => {
  return axios.post(`${base_url}/hotels/isBookable`, rateKey)
}

export const booking = (query: any) => {
  return axios.post(`${base_url}/hotels/bookings`, query)
}
