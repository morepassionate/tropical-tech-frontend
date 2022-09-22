import { atom } from 'recoil'

interface IsLoadingType {
  isLoading: boolean
}

export const SearchedHotelData = atom({
  key: 'SearchedHotelDataState',
  default: []
})

export const IsSearchLoading = atom<IsLoadingType>({
  key: 'isSearchLoadingState',
  default: {
    isLoading: true
  }
})
