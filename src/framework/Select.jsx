import React from 'react'

const Select = ({title, name, value, onChange, options}) => {
    return (
        <div className='w-full justify-start flex flex-col p-5'>
            <p className='font-bold text-white text-lg'>{title}</p>
            <div className='border-b w-1/4 border-white mb-2' />
            <select className='border rounded-lg px-2 py-1' name={name} value={value} onChange={onChange}>
                {options}
            </select>
        </div>
    )
}

export default Select