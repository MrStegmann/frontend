import { useEffect, useState } from 'react'

const Constitution = ({setCharForm, charForm}) => {
    const [ points, setPoints ] = useState(0);
    const [ talentPoints, setTalentPoints ] = useState(0);
    const [ health, setHealth ] = useState(0);
    const [ mana, setMana ] = useState(0);
    const [ resistancePoisonsDiseases, setResistancePoisonsDiseases ] = useState(0);
    const [ stunResistance, setStunResistance ] = useState(0);
    const [ knockdownsResistance, setKnockdownsResistance ] = useState(0);
    const [ coldResistance, setColdResistance ] = useState(0);
    const [ heatResistance, setHeatResistance ] = useState(0);
    const [ fortitude, setFortitude ] = useState(0);
    
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
        total -= health + mana + resistancePoisonsDiseases + stunResistance + knockdownsResistance + coldResistance + heatResistance + fortitude;

        setTalentPoints(total);

        const form = {
            points,
            talents: {health, mana, resistancePoisonsDiseases, stunResistance, knockdownsResistance, coldResistance, heatResistance, fortitude}
        };
        setCharForm({...charForm, constitution: form})
    }, [points, health, mana, resistancePoisonsDiseases, stunResistance, knockdownsResistance, coldResistance, heatResistance, fortitude])

    return (
        <div className='w-full flex flex-col justify-center items-center my-2'>
            <div className='border-b w-full border-white my-2' />

            <div className='flex flex-row text-white text-lg'>

                <button onClick={handleRemovePoints}>-</button>
                
                <p className='mx-5'>Constitution ({points})</p>

                <button onClick={handleAddPoints}>+</button>
            </div>
            <div className='flex flex-col w-full items-center justify-center'>
                <h2 className='w-full text-center text-white'>Talents ({talentPoints})</h2>

                <div className='flex flex-row text-white text-lg'>

                    <button onClick={() => setHealth(prev =>  prev - 1 < 0 ? 0 : prev - 1)}>-</button>
                    
                    <p className='mx-5'>Health ({health})</p>

                    <button onClick={() => setHealth(prev =>  talentPoints - 1 < 0 ? prev : prev + 1)}>+</button>
                </div>

                <div className='flex flex-row text-white text-lg'>

                    <button onClick={() => setMana(prev =>  prev - 1 < 0 ? 0 : prev - 1)}>-</button>
                    
                    <p className='mx-5'>Mana ({mana})</p>

                    <button onClick={() => setMana(prev =>  talentPoints - 1 < 0 ? prev : prev + 1)}>+</button>
                </div>

                <div className='flex flex-row text-white text-lg'>

                    <button onClick={() => setResistancePoisonsDiseases(prev =>  prev - 1 < 0 ? 0 : prev - 1)}>-</button>
                    
                    <p className='mx-5'>Resistance to Poisons and Diseases ({resistancePoisonsDiseases})</p>

                    <button onClick={() => setResistancePoisonsDiseases(prev =>  talentPoints - 1 < 0 ? prev : prev + 1)}>+</button>
                </div>

                <div className='flex flex-row text-white text-lg'>

                    <button onClick={() => setStunResistance(prev =>  prev - 1 < 0 ? 0 : prev - 1)}>-</button>
                    
                    <p className='mx-5'>Stun Resistance ({stunResistance})</p>

                    <button onClick={() => setStunResistance(prev =>  talentPoints - 1 < 0 ? prev : prev + 1)}>+</button>
                </div>

                <div className='flex flex-row text-white text-lg'>

                    <button onClick={() => setKnockdownsResistance(prev =>  prev - 1 < 0 ? 0 : prev - 1)}>-</button>
                    
                    <p className='mx-5'>Knockdowns Resistance ({knockdownsResistance})</p>

                    <button onClick={() => setKnockdownsResistance(prev =>  talentPoints - 1 < 0 ? prev : prev + 1)}>+</button>
                </div>

                <div className='flex flex-row text-white text-lg'>

                    <button onClick={() => setColdResistance(prev =>  prev - 1 < 0 ? 0 : prev - 1)}>-</button>
                    
                    <p className='mx-5'>Cold resistance ({coldResistance})</p>

                    <button onClick={() => setColdResistance(prev =>  talentPoints - 1 < 0 ? prev : prev + 1)}>+</button>
                </div>

                <div className='flex flex-row text-white text-lg'>

                    <button onClick={() => setHeatResistance(prev =>  prev - 1 < 0 ? 0 : prev - 1)}>-</button>
                    
                    <p className='mx-5'>Heat resistance ({heatResistance})</p>

                    <button onClick={() => setHeatResistance(prev =>  talentPoints - 1 < 0 ? prev : prev + 1)}>+</button>
                </div>

                <div className='flex flex-row text-white text-lg'>

                    <button onClick={() => setFortitude(prev =>  prev - 1 < 0 ? 0 : prev - 1)}>-</button>
                    
                    <p className='mx-5'>Fortitude ({fortitude})</p>

                    <button onClick={() => setFortitude(prev =>  talentPoints - 1 < 0 ? prev : prev + 1)}>+</button>
                </div>
            </div>                
        </div>
    )
}

export default Constitution