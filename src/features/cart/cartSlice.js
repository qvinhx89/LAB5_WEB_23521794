import { createSelector, createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalAmount: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const incoming = action.payload
      const existing = state.items.find((item) => item.id === incoming.id)
      if (existing) {
        existing.quantity += 1
        state.totalAmount += existing.price
      } else {
        state.items.push({ ...incoming, quantity: 1 })
        state.totalAmount += incoming.price
      }
    },
    removeItem: (state, action) => {
      const id = action.payload
      const existing = state.items.find((item) => item.id === id)
      if (!existing) return

      if (existing.quantity > 1) {
        existing.quantity -= 1
        state.totalAmount -= existing.price
      } else {
        state.items = state.items.filter((item) => item.id !== id)
        state.totalAmount -= existing.price
      }
    },
    clearCart: () => initialState
  }
})

export const { addItem, removeItem, clearCart } = cartSlice.actions
export default cartSlice.reducer

export const selectCart = (state) => state.cart
export const selectTotalAmount = (state) => state.cart.totalAmount
export const selectCartItems = (state) => state.cart.items

export const selectCartTax = createSelector([selectTotalAmount], (total) => total * 0.1)
