import React from 'react'

const SelectDropdown = ({ className, data = [], onChange, disabled = false}) => {
  return (
    <select disabled={disabled} onChange={onChange} className={className}>
      {
        data.map((curr, index) => {
          return <option key={curr.item + index} value={curr.item}>{curr.item}</option>
        })
      }
    </select>
  )
}

export default SelectDropdown