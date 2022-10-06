export interface HotelInfoProps {
  city: string
  country: string
  image: string
  name: string
  from: string
  to: string
  code: number
  price: number
  currency: string
  ratings: number
  reviewsCount: number
  rateKey: string
  rateType: string
  taxes: string
  cancellationPolicies: {
    amount: string
    from: string
  }
  coordinates: {
    longitude: number
    latitude: number
  }
}

export interface OccupanciesProps {
  rooms: number
  adults: number
  children: number
  paxes: { type: string; age: number }[]
}

export interface FilterQueryProps {
  stay?: {
    checkIn: string
    checkOut: string
  }
  occupancies?: Array<OccupanciesProps>
  destination?: {
    destination: string
  }
  currentLocation?: {
    latitude: number
    longitude: number
  }
  rooms?: {
    included: boolean
    room: string[]
  }
  limit?: number
  page?: number
}

export interface ReviewProps {
  type: string
  minRate: number
  maxRate: number
  minReviewCount: number
}

export interface FilterQueryMostPopularProps {
  stay: {
    checkIn: string
    checkOut: string
  }
  occupancies: Array<OccupanciesProps>
  reviews: ReviewProps[]
}
