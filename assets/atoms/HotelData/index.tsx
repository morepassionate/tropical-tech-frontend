import { atom } from 'recoil'

export interface IsLoadingType {
  isLoading: boolean
}

export const hotelData = atom({
  key: 'HotelDataState',
  default: []
})

export const IsLoading = atom<IsLoadingType>({
  key: 'isLoadingState',
  default: {
    isLoading: true
  }
})
