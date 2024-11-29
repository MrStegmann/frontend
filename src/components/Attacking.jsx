
const Attacking = ({ onCancel, handleAttack, cardToPlay, setPlayer, villain, setVillain}) => {
    
    return (
        <div className='p-5 flex flex-col gap-2'>

            { ((cardToPlay.type === "ally" && cardToPlay.pAt > cardToPlay.mAt) || cardToPlay.type === "character") && 
                <button type='button' className='px-5 py-2 border border-indigo-500 rounded-xl hover:bg-indigo-500 hover:text-white' onClick={() => handleAttack(cardToPlay, villain, setPlayer, setVillain, false)}>Atacar físicamente</button>
            }
                
            { ((cardToPlay.type === "ally" && cardToPlay.mAt > cardToPlay.pAt) || cardToPlay.type === "character") && 
                <button type='button' className='px-5 py-2 border border-indigo-500 rounded-xl hover:bg-indigo-500 hover:text-white' onClick={() => handleAttack(cardToPlay, villain, setPlayer, setVillain, true)}>Atacar mágicamente</button>
            }
                

            <button type='button' className='px-5 py-2 border border-indigo-500 rounded-xl hover:bg-indigo-500 hover:text-white' onClick={onCancel}>Cancelar</button>
        </div>
    )
}

export default Attacking