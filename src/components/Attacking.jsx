
const Attacking = ({ onCancel, handleAttack, cardToPlay, setPlayer, villain, setVillain}) => {
    
    return (
        <div className='flex flex-col gap-2'>

            { ((cardToPlay.type === "ally" && cardToPlay.pAt > cardToPlay.mAt) || cardToPlay.type === "character") && 
                <button type='button' className='px-5 py-2 border border-indigo-500 rounded-xl hover:bg-indigo-500 hover:text-white' onClick={() => handleAttack(cardToPlay, villain, setPlayer, setVillain, false)}>pAt</button>
            }
                
            { ((cardToPlay.type === "ally" && cardToPlay.mAt > cardToPlay.pAt) || cardToPlay.type === "character") && 
                <button type='button' className='px-5 py-2 border border-indigo-500 rounded-xl hover:bg-indigo-500 hover:text-white' onClick={() => handleAttack(cardToPlay, villain, setPlayer, setVillain, true)}>mAt</button>
            }
                

            <button type='button' className='px-5 py-2 border border-indigo-500 rounded-xl hover:bg-indigo-500 hover:text-white' onClick={onCancel}>X</button>
        </div>
    )
}

export default Attacking