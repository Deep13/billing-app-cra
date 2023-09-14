import React from 'react'

const TableRow = ({
    product,
    desc,
    pcs,
    gross,
    stWt = 2,
    stVal = 2000,
    fixed_charges = 5000,
    hsn = '01a2e',
    net,
    amount,
    making_charges,
    handleOnEnterAnyData
}) => {
    return (
        <>
            <td>
                <input className='form-control text-sm' placeholder={product} onChange={handleOnEnterAnyData} type="text" />
            </td>
            <td>
                <input className='form-control p-2' placeholder={desc} onChange={handleOnEnterAnyData} type="text" />
            </td>
            <td>
                <input className='form-control' placeholder={pcs} onChange={handleOnEnterAnyData} type="text" />
            </td>
            <td>
                <input className='form-control' placeholder={gross} onChange={handleOnEnterAnyData} type="text" />
            </td>
            <td>
                <input className='form-control' placeholder={net} onChange={handleOnEnterAnyData} type="text" />
            </td>
            <td>
                <input className='form-control' placeholder={amount} onChange={handleOnEnterAnyData} type="text" />
            </td>
            <td>
                <input className='form-control' placeholder={stWt} onChange={handleOnEnterAnyData} type="text" />
            </td>
            <td>
                <input className='form-control' placeholder={stVal} onChange={handleOnEnterAnyData} type="text" />
            </td>
            <td>
                <input className='form-control' placeholder={hsn} onChange={handleOnEnterAnyData} type="text" />
            </td>
            <td>
                <input className='form-control' placeholder={making_charges} onChange={handleOnEnterAnyData} type="text" />
            </td>
            <td>
                <input className='form-control' placeholder={making_charges} onChange={handleOnEnterAnyData} type="text" />
            </td>
        </>
    )
}

export default TableRow