import React from 'react'

const CharCard = ({char}) => {
    return (
        <>
            <h2 className='font-bold text-normal mb-2'>{char.name}</h2>

            <p className='font-bold text-[0.625rem] leading-3'>Health point: {""}<span className='font-normal'>{char.hp}/{char.maxHP}</span></p>

            <p className='font-bold text-[0.625rem] leading-3'>Magic Defense: {""}<span className='font-normal'>{char.mDef}</span></p>

            <p className='font-bold text-[0.625rem] leading-3'>Physical Defense: {""}<span className='font-normal'>{char.pDef}</span></p>

            <p className='font-bold text-[0.625rem] leading-3'>Magic Attack: {""}<span className='font-normal'>{char.mAt}</span></p>

            <p className='font-bold text-[0.625rem] leading-3'>Physical Attack: {""}<span className='font-normal'>{char.pAt}</span></p>

            <p className='font-bold text-[0.625rem] leading-3'>Stunned: {""}<span className='font-normal'>{char.stunned}</span></p>

            <p className='font-bold text-[0.625rem] leading-3'>Exhausted: {""}<span className='font-normal'>{char.exhausted}</span></p>

            <p className='font-bold text-[0.625rem] leading-3'>Deck: {""}<span className='font-normal'>{char.deck.length}</span></p>

            <p className='font-bold text-[0.625rem] leading-3'>Hand: {""}<span className='font-normal'>{char.hand.length}</span></p>

            <p className='font-bold text-[0.625rem] leading-3'>Discards: {""}<span className='font-normal'>{char.discards.length}</span></p>
        </>
    )
}

export default CharCard