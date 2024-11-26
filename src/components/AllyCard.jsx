import React from 'react'

const AllyCard = ({card}) => {
    return (
        <>
            <p className='text-sm'>{card.name}</p>
            <p>{card.type}</p>
            <p>{card.cost}</p>
            <p className='font-bold text-sm'>HP: {""}<span className='font-normal'>{card.hp}/{card.maxHP}</span></p>
            <p className='font-bold text-sm'>M. Def: {""}<span className='font-normal'>{card.mDef}</span></p>
            <p className='font-bold text-sm'>P. Def: {""}<span className='font-normal'>{card.pDef}</span></p>
            <p className='font-bold text-sm'>M. At: {""}<span className='font-normal'>{card.mAt}</span></p>
            <p className='font-bold text-sm'>P. At: {""}<span className='font-normal'>{card.pAt}</span></p>
        </>
    )
}

export default AllyCard