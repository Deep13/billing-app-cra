import React from 'react'

const SelectDropdown = ({ className, data = [], onChange, disabled = false, value }) => {
  return (
    <select value={value} disabled={disabled} onChange={onChange} className={className}>

      {
        data.map((curr, index) => {
          return <option key={curr.id} value={curr.item}>{curr.item}</option>
        })
      }
      <option key={0} disabled selected value=""></option>
    </select>
  )
}

export default SelectDropdown