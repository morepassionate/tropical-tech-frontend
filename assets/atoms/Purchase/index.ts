import { atom } from 'recoil'

export type PurchaseProps = {
  transactionName: string
  outValue: number
  day: string
  type: 'OUT'
}

const PurchaseAtom = atom<PurchaseProps[] | null>({
  key: 'Purchase',
  default: null
})

export default PurchaseAtom
