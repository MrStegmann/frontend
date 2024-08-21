import { useEffect, useState } from 'react'

const Intelligence = ({setCharForm, charForm}) => {
    const [ points, setPoints ] = useState(0);
    const [ talentPoints, setTalentPoints ] = useState(0);
    const [ arcane, setArcane ] = useState(0);
    const [ nature, setNature ] = useState(0);
    const [ shadows, setShadows ] = useState(0);
    const [ astral, setAstral ] = useState(0);
    const [ necromancer, setNecromancer ] = useState(0);
    
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
        total -= arcane + nature + shadows + astral + necromancer;

        setTalentPoints(total);
        const form = {
            points,
            talents: {arcane, nature, shadows, astral, necromancer}
        };
        setCharForm({...charForm, intelligence: form})
    }, [points, arcane, nature, shadows, astral, necromancer])

    return (
        <div className='w-full flex flex-col justify-center items-center my-2'>
            <div className='border-b w-full border-white my-2' />

            <div className='flex flex-row text-white text-lg'>

                <button onClick={handleRemovePoints}>-</button>
                
                <p className='mx-5'>Intelligence ({points})</p>

                <button onClick={handleAddPoints}>+</button>
            </div>
            <div className='flex flex-col w-full items-center justify-center'>
                <h2 className='w-full text-center text-white'>Talents ({talentPoints})</h2>

                <div className='flex flex-row text-white text-lg'>

                    <button onClick={() => setArcane(prev =>  prev - 1 < 0 ? 0 : prev - 1)}>-</button>
                    
                    <p className='mx-5'>Arcane ({arcane})</p>

                    <button onClick={() => setArcane(prev =>  talentPoints - 1 < 0 ? prev : prev + 1)}>+</button>
                </div>

                <div className='flex flex-row text-white text-lg'>

                    <button onClick={() => setNature(prev =>  prev - 1 < 0 ? 0 : prev - 1)}>-</button>
                    
                    <p className='mx-5'>Nature ({nature})</p>

                    <button onClick={() => setNature(prev =>  talentPoints - 1 < 0 ? prev : prev + 1)}>+</button>
                </div>

                <div className='flex flex-row text-white text-lg'>

                    <button onClick={() => setShadows(prev =>  prev - 1 < 0 ? 0 : prev - 1)}>-</button>
                    
                    <p className='mx-5'>Shadows ({shadows})</p>

                    <button onClick={() => setShadows(prev =>  talentPoints - 1 < 0 ? prev : prev + 1)}>+</button>
                </div>

                <div className='flex flex-row text-white text-lg'>

                    <button onClick={() => setAstral(prev =>  prev - 1 < 0 ? 0 : prev - 1)}>-</button>
                    
                    <p className='mx-5'>Astral ({astral})</p>

                    <button onClick={() => setAstral(prev =>  talentPoints - 1 < 0 ? prev : prev + 1)}>+</button>
                </div>

                <div className='flex flex-row text-white text-lg'>

                    <button onClick={() => setNecromancer(prev =>  prev - 1 < 0 ? 0 : prev - 1)}>-</button>
                    
                    <p className='mx-5'>Necromancer ({necromancer})</p>

                    <button onClick={() => setNecromancer(prev =>  talentPoints - 1 < 0 ? prev : prev + 1)}>+</button>
                </div>
            </div>                
        </div>
    )
}

export default Intelligence