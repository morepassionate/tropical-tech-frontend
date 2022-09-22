import { atom } from 'recoil'

interface IsLoadingType {
  isLoading: boolean
}

export const mostPopularHotelData = atom({
  key: 'MostPopularHotelDataState',
  default: []
})

export const IsMostPopularLoading = atom<IsLoadingType>({
  key: 'isMostPopularLoading',
  default: {
    isLoading: true
  }
})
