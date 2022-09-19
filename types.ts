export interface User {
  creditCard: CreditCard[]
  favoritesList: FavoritesList[]
}

export interface CreditCard {
  cardNumber: string
  expiry: string
  cvv: number
  postcode: string
}

export interface FavoritesList {
  listName: string
}
