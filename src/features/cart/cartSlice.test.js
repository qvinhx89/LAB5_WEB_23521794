import cartReducer, {
  addItem,
  clearCart,
  removeItem,
  selectCartTax,
  selectTotalAmount
} from './cartSlice'

const laptop = { id: '1', name: 'Laptop', price: 1000 }

describe('cartSlice reducers', () => {
  it('adds and increments items, updating totals', () => {
    const state = cartReducer(undefined, addItem(laptop))
    expect(state.items[0].quantity).toBe(1)
    expect(state.totalAmount).toBe(1000)

    const state2 = cartReducer(state, addItem(laptop))
    expect(state2.items[0].quantity).toBe(2)
    expect(state2.totalAmount).toBe(2000)
  })

  it('removes quantity and item', () => {
    const initial = {
      items: [{ ...laptop, quantity: 2 }],
      totalAmount: 2000
    }
    const state = cartReducer(initial, removeItem(laptop.id))
    expect(state.items[0].quantity).toBe(1)
    expect(state.totalAmount).toBe(1000)

    const cleared = cartReducer(state, removeItem(laptop.id))
    expect(cleared.items).toHaveLength(0)
    expect(cleared.totalAmount).toBe(0)
  })

  it('clears cart', () => {
    const initial = {
      items: [{ ...laptop, quantity: 2 }],
      totalAmount: 2000
    }
    const state = cartReducer(initial, clearCart())
    expect(state.items).toEqual([])
    expect(state.totalAmount).toBe(0)
  })
})

describe('cart selectors', () => {
  it('computes tax only when total changes', () => {
    const state = { cart: { items: [], totalAmount: 100 } }
    const first = selectCartTax(state)
    expect(first).toBe(10)

    // same reference, should memoize
    const second = selectCartTax(state)
    expect(second).toBe(10)
    expect(selectCartTax.recomputations()).toBe(1)

    const next = { cart: { items: [], totalAmount: 200 } }
    const third = selectCartTax(next)
    expect(third).toBe(20)
    expect(selectCartTax.recomputations()).toBe(2)
  })

  it('selects total amount', () => {
    const state = { cart: { items: [], totalAmount: 150 } }
    expect(selectTotalAmount(state)).toBe(150)
  })
})
