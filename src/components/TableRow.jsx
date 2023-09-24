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
    handleOnEnterAnyData,
    // getStockData,
}) => {


    const getStockData = (huid) => {
        debugger;
        $.ajax({
            url: 'http://localhost:80/billing_api/index.php',
            type: "POST",
            data: {
                method: "getStockByHuid",
                data: JSON.stringify({ huid: huid }),
            },
            success: function (dataClient) {
                try {
                    console.log(JSON.parse(dataClient));
                } catch (e) {
                    console.log(e)
                }
                // setPurityChoices(JSON.parse(dataClient))
            },
            error: function (request, error) {
                console.log('Error')
            }
        });
    }



    return (
        <>
            <td>
                <input onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                        getStockData('10024')
                    }
                }} className='form-control text-sm' placeholder={product} onChange={handleOnEnterAnyData} type="text" />
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