import React, { useEffect, useState } from 'react'

const Strength = ({charForm, setCharForm}) => {
    const [ points, setPoints ] = useState(0);
    const [ talentPoints, setTalentPoints ] = useState(0);
    const [ heavyRangedWeapon, setHeavyRangedWeapon ] = useState(0);
    const [ oneHandedWheapon, setOneHandedWheapon ] = useState(0);
    const [ twoHandedWheapon, setTwoHandedWheapon ] = useState(0);
    const [ athletics, setAthletics ] = useState(0);
    const [ brutality, setBrutality ] = useState(0);
    const [ robustDefense, setRobustDefense ] = useState(0);
    
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
        total -= heavyRangedWeapon + oneHandedWheapon + twoHandedWheapon + athletics + brutality + robustDefense;

        setTalentPoints(total);
        const form = {
            points,
            talents: {heavyRangedWeapon, oneHandedWheapon, twoHandedWheapon, athletics, brutality, robustDefense}
        };
        setCharForm({...charForm, strength: form})
    }, [points, heavyRangedWeapon, oneHandedWheapon, twoHandedWheapon, athletics, brutality, robustDefense])

    return (
        <div className='w-full flex flex-col justify-center items-center my-2'>
            <div className='border-b w-full border-white my-2' />

            <div className='flex flex-row text-white text-lg'>

                <button onClick={handleRemovePoints}>-</button>
                
                <p className='mx-5'>Strength ({points})</p>

                <button onClick={handleAddPoints}>+</button>
            </div>
            <div className='flex flex-col w-full items-center justify-center'>
                <h2 className='w-full text-center text-white'>Talents ({talentPoints})</h2>

                <div className='flex flex-row text-white text-lg'>

                    <button onClick={() => setHeavyRangedWeapon(prev =>  prev - 1 < 0 ? 0 : prev - 1)}>-</button>
                    
                    <p className='mx-5'>Heavy ranged weapon ({heavyRangedWeapon})</p>

                    <button onClick={() => setHeavyRangedWeapon(prev =>  talentPoints - 1 < 0 ? prev : prev + 1)}>+</button>
                </div>

                <div className='flex flex-row text-white text-lg'>

                    <button onClick={() => setOneHandedWheapon(prev =>  prev - 1 < 0 ? 0 : prev - 1)}>-</button>
                    
                    <p className='mx-5'>One-handed weapon ({oneHandedWheapon})</p>

                    <button onClick={() => setOneHandedWheapon(prev =>  talentPoints - 1 < 0 ? prev : prev + 1)}>+</button>
                </div>

                <div className='flex flex-row text-white text-lg'>

                    <button onClick={() => setTwoHandedWheapon(prev =>  prev - 1 < 0 ? 0 : prev - 1)}>-</button>
                    
                    <p className='mx-5'>Two-handed weapon ({twoHandedWheapon})</p>

                    <button onClick={() => setTwoHandedWheapon(prev =>  talentPoints - 1 < 0 ? prev : prev + 1)}>+</button>
                </div>

                <div className='flex flex-row text-white text-lg'>

                    <button onClick={() => setAthletics(prev =>  prev - 1 < 0 ? 0 : prev - 1)}>-</button>
                    
                    <p className='mx-5'>Athletics ({athletics})</p>

                    <button onClick={() => setAthletics(prev =>  talentPoints - 1 < 0 ? prev : prev + 1)}>+</button>
                </div>

                <div className='flex flex-row text-white text-lg'>

                    <button onClick={() => setBrutality(prev =>  prev - 1 < 0 ? 0 : prev - 1)}>-</button>
                    
                    <p className='mx-5'>Brutality ({brutality})</p>

                    <button onClick={() => setBrutality(prev =>  talentPoints - 1 < 0 ? prev : prev + 1)}>+</button>
                </div>

                <div className='flex flex-row text-white text-lg'>

                    <button onClick={() => setRobustDefense(prev =>  prev - 1 < 0 ? 0 : prev - 1)}>-</button>
                    
                    <p className='mx-5'>Robust defense ({robustDefense})</p>

                    <button onClick={() => setRobustDefense(prev =>  talentPoints - 1 < 0 ? prev : prev + 1)}>+</button>
                </div>
            </div>                
        </div>
    )
}

export default Strength