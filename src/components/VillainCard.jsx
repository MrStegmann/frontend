

const VillainCard = ({villain}) => {
    return (
        <>
            <h2 className='font-bold text-sm lg:text-xl mb-2'>{villain.name}</h2>

            <p className='font-bold'>Health point: {""}<span className='font-normal'>{villain.hp}/{villain.maxHP}</span></p>

            <p className='font-bold'>Magic Defense: {""}<span className='font-normal'>{villain.mDef}</span></p>

            <p className='font-bold'>Physical Defense: {""}<span className='font-normal'>{villain.pDef}</span></p>

            <p className='font-bold'>Magic Attack: {""}<span className='font-normal'>{villain.mAt}</span></p>

            <p className='font-bold'>Physical Attack: {""}<span className='font-normal'>{villain.pAt}</span></p>

            <p className='font-bold'>Stunned: {""}<span className='font-normal'>{villain.stunned}</span></p>

            <p className='font-bold'>Enrage Level: {""}<span className='font-normal'>{villain.enrage}</span></p>
        </>
    )
}

export default VillainCard