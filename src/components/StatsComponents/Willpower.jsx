import { useEffect, useState } from 'react'

const Willpower = ({setCharForm, charForm}) => {
    const [ points, setPoints ] = useState(0);
    const [ talentPoints, setTalentPoints ] = useState(0);
    const [ magicalResistance, setMagicalResistance ] = useState(0);
    const [ lossControlResistance, setLossControlResistance ] = useState(0);
    const [ faith, setFaith ] = useState(0);
    const [ elementalConnection, setElementalConnection ] = useState(0);
    const [ ki, setKi ] = useState(0);
    const [ manaRegeneration, setManaRegeneration ] = useState(0);
    
    const handleAddPoints = () => {
        if (charForm.atributes > -1) {
            setPoints(prev => prev + 1);
            setCharForm({...charForm, atributes: charForm.atributes - 1});
        };
    };

    const handleRemovePoints = () => {
        if (points > -1) {
            setPoints(prev => prev - 1);
            setCharForm({...charForm, atributes: charForm.atributes + 1});
        };
    };

    useEffect(() => {
        let total = points * 2;
        total -= magicalResistance + lossControlResistance + faith + elementalConnection + ki + manaRegeneration;

        setTalentPoints(total);

        const form = {
            points,
            talents: {magicalResistance, lossControlResistance, faith, elementalConnection, ki, manaRegeneration}
        };
        setCharForm({...charForm, willpower: form})
    }, [points, magicalResistance, lossControlResistance, faith, elementalConnection, ki, manaRegeneration])

    return (
        <div className='w-full flex flex-col justify-center items-center my-2'>
            <div className='border-b w-full border-white my-2' />

            <div className='flex flex-row text-white text-lg'>

                <button onClick={handleRemovePoints}>-</button>
                
                <p className='mx-5'>Willpower ({points})</p>

                <button onClick={handleAddPoints}>+</button>
            </div>
            <div className='flex flex-col w-full items-center justify-center'>
                <h2 className='w-full text-center text-white'>Talents ({talentPoints})</h2>

                <div className='flex flex-row text-white text-lg'>

                    <button onClick={() => setMagicalResistance(prev =>  prev - 1 < 0 ? 0 : prev - 1)}>-</button>
                    
                    <p className='mx-5'>Magical resistance ({magicalResistance})</p>

                    <button onClick={() => setMagicalResistance(prev =>  talentPoints - 1 < 0 ? prev : prev + 1)}>+</button>
                </div>

                <div className='flex flex-row text-white text-lg'>

                    <button onClick={() => setLossControlResistance(prev =>  prev - 1 < 0 ? 0 : prev - 1)}>-</button>
                    
                    <p className='mx-5'>Loss of control resistance ({lossControlResistance})</p>

                    <button onClick={() => setLossControlResistance(prev =>  talentPoints - 1 < 0 ? prev : prev + 1)}>+</button>
                </div>

                <div className='flex flex-row text-white text-lg'>

                    <button onClick={() => setFaith(prev =>  prev - 1 < 0 ? 0 : prev - 1)}>-</button>
                    
                    <p className='mx-5'>Faith ({faith})</p>

                    <button onClick={() => setFaith(prev =>  talentPoints - 1 < 0 ? prev : prev + 1)}>+</button>
                </div>

                <div className='flex flex-row text-white text-lg'>

                    <button onClick={() => setElementalConnection(prev =>  prev - 1 < 0 ? 0 : prev - 1)}>-</button>
                    
                    <p className='mx-5'>Elemental connection ({elementalConnection})</p>

                    <button onClick={() => setElementalConnection(prev =>  talentPoints - 1 < 0 ? prev : prev + 1)}>+</button>
                </div>

                <div className='flex flex-row text-white text-lg'>

                    <button onClick={() => setKi(prev =>  prev - 1 < 0 ? 0 : prev - 1)}>-</button>
                    
                    <p className='mx-5'>Ki ({ki})</p>

                    <button onClick={() => setKi(prev =>  talentPoints - 1 < 0 ? prev : prev + 1)}>+</button>
                </div>

                <div className='flex flex-row text-white text-lg'>

                    <button onClick={() => setManaRegeneration(prev =>  prev - 1 < 0 ? 0 : prev - 1)}>-</button>
                    
                    <p className='mx-5'>Mana regeneration ({manaRegeneration})</p>

                    <button onClick={() => setManaRegeneration(prev =>  talentPoints - 1 < 0 ? prev : prev + 1)}>+</button>
                </div>
            </div>                
        </div>
    )
}

export default Willpower