import React from 'react'

const VillainOnPlayed = ({card}) => {
    return (
        <>
            <p className='text-sm'>{card.name}</p>
            <p>{card.type}</p>
            <p>{card.description}</p>
        </>
    )
}

export default VillainOnPlayed