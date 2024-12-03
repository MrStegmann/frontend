import React from 'react'

const VillainCards = ({card}) => {
    return (
        <>
            <p>{card.name}</p>
            <p>{card.resource}</p>
            <p>{card.value}</p>
        </>
    )
}

export default VillainCards