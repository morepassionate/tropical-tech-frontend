import { atom } from 'recoil'

export interface IsLoadingType {
  isLoading: boolean
}

export const searched = atom({
  key: 'searchedhoteldata',
  default: []
})

export const isLoadingSearched = atom<IsLoadingType>({
  key: 'isLoadingSearched',
  default: {
    isLoading: true
  }
})

export const mostpopular = atom({
  key: 'mostpopularhoteldata',
  default: []
})

export const isLoadingMostPopular = atom<IsLoadingType>({
  key: 'isLoadingMostPopular',
  default: {
    isLoading: true
  }
})

export const recentsearches = atom({
  key: 'recentsearcheshoteldata',
  default: []
})

export const isLoadingRecentSearches = atom<IsLoadingType>({
  key: 'isLoadingRecentSearches',
  default: {
    isLoading: true
  }
})

export const destinationideas = atom({
  key: 'destinationideashoteldata',
  default: []
})

export const isLoadingDestinationIdeas = atom({
  key: 'isLoadingDestinationIdeas',
  default: {
    isLoading: true
  }
})

export const bestdeals = atom({
  key: 'bestdealshoteldata',
  default: []
})

export const isLoadingBestDeals = atom({
  key: 'isLoadingBestDeals',
  default: {
    isLoading: true
  }
})

// export const handleSubmitFormFunc = atom({
//   key: 'handleSubmitFormFuntion',
//   default: () => {
//     return
//   }
// })
