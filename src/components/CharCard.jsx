import React from 'react'

const CharCard = ({char}) => {
    return (
        <>
            <h2 className='font-bold text-xl mb-5'>{char.name}</h2>
            <p className='font-bold'>Health point: {""}<span className='font-normal'>{char.hp}/{char.maxHP}</span></p>
            <p className='font-bold'>Magic Defense: {""}<span className='font-normal'>{char.mDef}</span></p>
            <p className='font-bold'>Physical Defense: {""}<span className='font-normal'>{char.pDef}</span></p>
            <p className='font-bold'>Magic Attack: {""}<span className='font-normal'>{char.mAt}</span></p>
            <p className='font-bold'>Physical Attack: {""}<span className='font-normal'>{char.pAt}</span></p>
            <p className='font-bold'>Stunned: {""}<span className='font-normal'>{char.stunned}</span></p>
            <p className='font-bold'>Knocked: {""}<span className='font-normal'>{char.knocked}</span></p>
            <p className='font-bold'>Exhausted: {""}<span className='font-normal'>{char.exhausted}</span></p>

            <p className='font-bold'>Deck: {""}<span className='font-normal'>{char.deck.length}</span></p>

            <p className='font-bold'>Hand: {""}<span className='font-normal'>{char.hand.length}</span></p>

            <p className='font-bold'>Discards: {""}<span className='font-normal'>{char.discards.length}</span></p>
        </>
    )
}

export default CharCard