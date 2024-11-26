import React from 'react'
import AllyCard from './AllyCard'

const Attacking = ({ onCancel, handleAttack, player, setPlayer, villain, setVillain}) => {
    return (
        <div className='p-5 flex flex-col gap-2'>
            <div className='w-full flex'>
                {player.allies.map(card => 
                    <button className='px-2 py-1 h-32 w-1/5 border hover:border-2 border-indigo-600 rounded-lg text-sm' key={card._id} onClick={() => handleAttack(card, villain, setPlayer, setVillain, card.isMagic)}>
                        <AllyCard card={card} />
                    </button>
                )}
            </div>

            <button type='button' className='px-5 py-2 border border-indigo-500 rounded-xl hover:bg-indigo-500 hover:text-white' onClick={() => handleAttack(player, villain, setPlayer, setVillain, false)}>Atacar físicamente</button>

            <button type='button' className='px-5 py-2 border border-indigo-500 rounded-xl hover:bg-indigo-500 hover:text-white' onClick={() => handleAttack(player, villain, setPlayer, setVillain, true)}>Atacar mágicamente</button>

            <button type='button' className='px-5 py-2 border border-indigo-500 rounded-xl hover:bg-indigo-500 hover:text-white' onClick={onCancel}>Cancelar</button>
        </div>
    )
}

export default Attacking