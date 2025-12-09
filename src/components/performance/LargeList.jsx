import { memo, useCallback, useMemo, useState } from 'react'

function createItems(size = 5000) {
  return Array.from({ length: size }, (_, index) => ({
    id: index + 1,
    label: `Row ${index + 1}`,
    value: Math.floor(Math.random() * 1000)
  }))
}

const ListItem = memo(function ListItem({ item, onDelete }) {
  return (
    <li className="list-item">
      <span>{item.label}</span>
      <span>Score: {item.value}</span>
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </li>
  )
})

export default function LargeList() {
  const [items, setItems] = useState(() => createItems())
  const [theme, setTheme] = useState('light')

  const sortedItems = useMemo(() => {
    const clone = [...items]
    clone.sort((a, b) => a.value - b.value)
    return clone
  }, [items])

  const handleDelete = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className={`panel theme-${theme}`}>
      <div className="panel-header">
        <h3>Laggy List (optimized)</h3>
        <button onClick={handleToggleTheme}>Toggle theme</button>
      </div>
      <p>List uses useMemo for sorting and React.memo for rows to prevent re-renders on theme changes.</p>
      <ul className="list" aria-label="sorted-items">
        {sortedItems.slice(0, 200).map((item) => (
          <ListItem key={item.id} item={item} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  )
}
