import { atom } from 'recoil'
import { FilterQueryProps } from '../../../Constants/data'

export interface IsLoadingType {
  isLoading: boolean
}

export type SearchItemType = {
  name: string
  ratings: number
  reviewsCount: number
  image: string
  country: string
  city: string
  address: string
  coordinates: {
    longitude: number
    latitude: number
  }
  cancellationPolicies: {
    amount: string
    from: string
  }
  code: number
  distance: number
  currency: string
  roomType: string
  freeCancellation: boolean
  price: number
  noprepaymentneeded: boolean
  bedType: string
  rateKey: string
  rateType: string
  taxes: string
  from: string
  to: string
}

export const searched = atom({
  key: 'searchedhoteldata',
  default: [] as Array<SearchItemType>
})

export const isLoadingSearched = atom<IsLoadingType>({
  key: 'isLoadingSearched',
  default: {
    isLoading: false
  }
})

export const mostpopular = atom({
  key: 'mostpopularhoteldata',
  default: []
})

export const isLoadingMostPopular = atom<IsLoadingType>({
  key: 'isLoadingMostPopular',
  default: {
    isLoading: false
  }
})

export const recentsearches = atom({
  key: 'recentsearcheshoteldata',
  default: []
})

export const isLoadingRecentSearches = atom<IsLoadingType>({
  key: 'isLoadingRecentSearches',
  default: {
    isLoading: false
  }
})

export const destinationideas = atom({
  key: 'destinationideashoteldata',
  default: []
})

export const isLoadingDestinationIdeas = atom({
  key: 'isLoadingDestinationIdeas',
  default: {
    isLoading: false
  }
})

export const bestdeals = atom({
  key: 'bestdealshoteldata',
  default: []
})

export const isLoadingBestDeals = atom({
  key: 'isLoadingBestDeals',
  default: {
    isLoading: false
  }
})

export const filterQueryForSearch = atom<FilterQueryProps>({
  key: 'filterQueryForSearch',
  default: {} as FilterQueryProps
})
