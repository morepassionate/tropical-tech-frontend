export interface HotelInfoProps {
  city: string
  country: string
  image: string
  name: string
  from: string
  to: string
}

export interface OccupanciesProps {
  rooms: number
  adults: number
  children: number
}

export interface FilterQueryProps {
  stay: {
    checkIn: string
    checkOut: string
  }
  occupancies: Array<OccupanciesProps>
  destination: string
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
