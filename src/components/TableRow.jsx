import React from 'react'
import $ from 'jquery'
const TableRow = ({
    tableData,
    handleOnEnterAnyData,
    getStockData
}) => {






    return (
        <>
            <td>
                <input onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                        getStockData(e.target.value)
                    }
                }} className='form-control text-sm'
                    value={tableData.huid} type="text" />
            </td>
            <td>
                <input className='form-control p-2'
                    value={tableData.orm_desc}
                    onChange={handleOnEnterAnyData} type="text" />
            </td>
            <td>
                <input className='form-control'
                    value={tableData.quantity}
                    onChange={handleOnEnterAnyData} type="text" />
            </td>
            <td>
                <input className='form-control'
                    value={tableData.gross_wt}
                    onChange={handleOnEnterAnyData} type="text" />
            </td>
            <td>
                <input className='form-control'
                    value={tableData.net_wt}
                    onChange={handleOnEnterAnyData} type="text" />
            </td>
            <td>
                <input className='form-control'
                    value={tableData.net_wt}
                    onChange={handleOnEnterAnyData} type="text" />
            </td>
            <td>
                <input className='form-control'
                    onChange={handleOnEnterAnyData} type="text" />
            </td>
            <td>
                <input className='form-control'
                    value={tableData.stone_wt}
                    onChange={handleOnEnterAnyData} type="text" />
            </td>
            <td>
                <input className='form-control'
                    onChange={handleOnEnterAnyData} type="text" />
            </td>
            <td>
                <input className='form-control'
                    onChange={handleOnEnterAnyData} type="text" />
            </td>
            <td>
                <input className='form-control'
                    onChange={handleOnEnterAnyData} type="text" />
            </td>
        </>
    )
}

export default TableRow