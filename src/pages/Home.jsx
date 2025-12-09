import { useState } from 'react'
import Modal from '../components/modal/Modal'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div
      className="page"
      onClick={() => {
        // verifies React synthetic events bubble from portal content
        console.log('Parent container clicked')
      }}
    >
      <h2>Welcome</h2>
      <p>Click the button to open a portal-based modal. Clicks inside still bubble to this parent.</p>
      <button onClick={() => setIsModalOpen(true)}>Open modal</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>Trapdoor Modal</h3>
        <p>Rendered via createPortal to document.body.</p>
      </Modal>
    </div>
  )
}
