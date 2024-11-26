import React from 'react'

const ImproveCards = ({card}) => {
    return (
        <>
            <p>{card.name}</p>
            <p>{card.type}</p>
            <p>{card.cost}</p>
            <p>{card.subType}: {card[card.subType]}</p>
        </>
    )
}

export default ImproveCards