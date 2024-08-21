import { useEffect, useState } from 'react'

const Dexterity = ({charForm, setCharForm}) => {
    const [ points, setPoints ] = useState(0);
    const [ talentPoints, setTalentPoints ] = useState(0);
    const [ lightRangedWeapons, setLightRangedWeapons ] = useState(0);
    const [ fineWeapons, setFineWeapons ] = useState(0);
    const [ acrobatics, setAcrobatics ] = useState(0);
    const [ stealth, setStealth ] = useState(0);
    const [ tricks, setTricks ] = useState(0);
    const [ agileDefense, setAgileDefense ] = useState(0);
    
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
        total -= lightRangedWeapons + fineWeapons + acrobatics + stealth + tricks + agileDefense;

        setTalentPoints(total);
        const form = {
            points,
            talents: {lightRangedWeapons, fineWeapons, acrobatics, stealth, tricks, agileDefense}
        };
        setCharForm({...charForm, dexterity: form})
    }, [points, lightRangedWeapons, fineWeapons, acrobatics, stealth, tricks, agileDefense])

    return (
        <div className='w-full flex flex-col justify-center items-center my-2'>
            <div className='border-b w-full border-white my-2' />

            <div className='flex flex-row text-white text-lg'>

                <button onClick={handleRemovePoints}>-</button>
                
                <p className='mx-5'>Dexterity ({points})</p>

                <button onClick={handleAddPoints}>+</button>
            </div>
            <div className='flex flex-col w-full items-center justify-center'>
                <h2 className='w-full text-center text-white'>Talents ({talentPoints})</h2>

                <div className='flex flex-row text-white text-lg'>

                    <button onClick={() => setLightRangedWeapons(prev =>  prev - 1 < 0 ? 0 : prev - 1)}>-</button>
                    
                    <p className='mx-5'>Light ranged weapons ({lightRangedWeapons})</p>

                    <button onClick={() => setLightRangedWeapons(prev =>  talentPoints - 1 < 0 ? prev : prev + 1)}>+</button>
                </div>

                <div className='flex flex-row text-white text-lg'>

                    <button onClick={() => setFineWeapons(prev =>  prev - 1 < 0 ? 0 : prev - 1)}>-</button>
                    
                    <p className='mx-5'>Fine weapons ({fineWeapons})</p>

                    <button onClick={() => setFineWeapons(prev =>  talentPoints - 1 < 0 ? prev : prev + 1)}>+</button>
                </div>

                <div className='flex flex-row text-white text-lg'>

                    <button onClick={() => setAcrobatics(prev =>  prev - 1 < 0 ? 0 : prev - 1)}>-</button>
                    
                    <p className='mx-5'>Acrobatics ({acrobatics})</p>

                    <button onClick={() => setAcrobatics(prev =>  talentPoints - 1 < 0 ? prev : prev + 1)}>+</button>
                </div>

                <div className='flex flex-row text-white text-lg'>

                    <button onClick={() => setStealth(prev =>  prev - 1 < 0 ? 0 : prev - 1)}>-</button>
                    
                    <p className='mx-5'>Stealth ({stealth})</p>

                    <button onClick={() => setStealth(prev =>  talentPoints - 1 < 0 ? prev : prev + 1)}>+</button>
                </div>

                <div className='flex flex-row text-white text-lg'>

                    <button onClick={() => setTricks(prev =>  prev - 1 < 0 ? 0 : prev - 1)}>-</button>
                    
                    <p className='mx-5'>Tricks ({tricks})</p>

                    <button onClick={() => setTricks(prev =>  talentPoints - 1 < 0 ? prev : prev + 1)}>+</button>
                </div>

                <div className='flex flex-row text-white text-lg'>

                    <button onClick={() => setAgileDefense(prev =>  prev - 1 < 0 ? 0 : prev - 1)}>-</button>
                    
                    <p className='mx-5'>Agile Defense ({agileDefense})</p>

                    <button onClick={() => setAgileDefense(prev =>  talentPoints - 1 < 0 ? prev : prev + 1)}>+</button>
                </div>
            </div>                
        </div>
    )
}

export default Dexterity