import React from 'react'

const SelectDropdown = ({ className, data = [], onChange, disabled = false}) => {
  return (
    <select disabled={disabled} onChange={onChange} className={className}>
      {
        data.map((curr, index) => {
          return <option key={curr.text + index} value={curr.text}>{curr.text}</option>
        })
      }
    </select>
  )
}

export default SelectDropdown