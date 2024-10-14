import React from 'react'

export const MachinesGraph = () => {
    return (
        <>
            <nav className="flex justify-start border-b  ">
                <select
                    className='px-4 py-2 font-semibold text-sm transition-colors bg-white text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50'
                >
                    <option className='font-medium' value="value1" selected>Value 1</option>
                    <option className='font-medium' value="value2">Value 2</option>
                    <option className='font-medium' value="value3">Value 3</option>
                </select>
            </nav>
            <div className='flex-1 p-4 mt-4 bg-white  rounded border border-stone-300'>MachinesGraph</div>
        </>
    )
}
