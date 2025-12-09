import { useDispatch, useSelector } from 'react-redux'
import { addItem, clearCart, removeItem, selectCartItems, selectCartTax, selectTotalAmount } from '../features/cart/cartSlice'

const demoProducts = [
  { id: 'sku-1', name: 'Laptop', price: 1200 },
  { id: 'sku-2', name: 'Headphones', price: 200 },
  { id: 'sku-3', name: 'Backpack', price: 90 }
]

export default function Cart() {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const total = useSelector(selectTotalAmount)
  const tax = useSelector(selectCartTax)

  return (
    <div className="page">
      <h2>Cart</h2>
      <div className="product-grid">
        {demoProducts.map((product) => (
          <div className="card" key={product.id}>
            <h4>{product.name}</h4>
            <p>${product.price}</p>
            <button onClick={() => dispatch(addItem(product))}>Add to cart</button>
          </div>
        ))}
      </div>

      <div className="panel">
        <h3>Items</h3>
        {items.length === 0 && <p>No items yet.</p>}
        <ul>
          {items.map((item) => (
            <li key={item.id} className="list-item">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>${item.price * item.quantity}</span>
              <div className="button-row">
                <button onClick={() => dispatch(removeItem(item.id))}>-</button>
                <button onClick={() => dispatch(addItem(item))}>+</button>
              </div>
            </li>
          ))}
        </ul>
        <p>Total: ${total.toFixed(2)}</p>
        <p>Tax (10%): ${tax.toFixed(2)}</p>
        <button onClick={() => dispatch(clearCart())}>Clear cart</button>
      </div>
    </div>
  )
}
