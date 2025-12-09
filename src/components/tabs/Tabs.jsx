import { createContext, useContext, useMemo, useState } from 'react'

const TabsContext = createContext(null)

function useTabsContext() {
  const ctx = useContext(TabsContext)
  if (!ctx) {
    throw new Error('Tabs compound components must be used inside <Tabs>')
  }
  return ctx
}

function Tabs({ children, defaultIndex = 0 }) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex)
  const value = useMemo(() => ({ activeIndex, setActiveIndex }), [activeIndex])

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>
}

function TabsList({ children }) {
  return (
    <div role="tablist" className="tabs-list">
      {children}
    </div>
  )
}

function TabsTab({ index, children }) {
  const { activeIndex, setActiveIndex } = useTabsContext()
  const isActive = index === activeIndex

  const handleKeyDown = (event) => {
    if (!['ArrowRight', 'ArrowLeft'].includes(event.key)) return
    const tabs = Array.from(event.currentTarget.parentElement.querySelectorAll('[role="tab"]'))
    const currentIndex = tabs.indexOf(event.currentTarget)
    const nextIndex = event.key === 'ArrowRight' ? currentIndex + 1 : currentIndex - 1
    const target = tabs[nextIndex]
    if (target) target.focus()
  }

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${index}`}
      id={`tab-${index}`}
      tabIndex={isActive ? 0 : -1}
      className={`tab ${isActive ? 'tab-active' : ''}`}
      onClick={() => setActiveIndex(index)}
      onKeyDown={handleKeyDown}
    >
      {children}
    </button>
  )
}

function TabsPanel({ index, children }) {
  const { activeIndex } = useTabsContext()
  const isActive = index === activeIndex
  return (
    <div
      role="tabpanel"
      id={`panel-${index}`}
      aria-labelledby={`tab-${index}`}
      hidden={!isActive}
      className="tab-panel"
    >
      {isActive ? children : null}
    </div>
  )
}

Tabs.List = TabsList
Tabs.Tab = TabsTab
Tabs.Panel = TabsPanel

export default Tabs
