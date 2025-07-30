import React from 'react'
import './Loader.scss'

const Loader: React.FC = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-circle" />
    </div>
  )
}

export default Loader