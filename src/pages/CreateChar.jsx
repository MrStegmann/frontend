import React, { useEffect, useState } from 'react'
import Input from '../framework/Input'
import Select from '../framework/Select';
import Stats from '../components/Stats';

const CreateChar = () => {
    const [ step, setStep ] = useState(0);
    const [ charForm, setCharForm ] = useState({
        name: "", class: "", deckHand: 0, level: 1, atributes: 5, 
        charisma: {
            points: 0,
            talents: {persuasion: 0, diplomacy: 0, trade: 0, provocation: 0, seduction: 0}
        },
        constitution: {
            points: 0,
            talents: {health: 0, mana: 0, resistancePoisonsDiseases: 0, stunResistance: 0, knockdownsResistance: 0, coldResistance: 0, heatResistance: 0, fortitude: 0}
        },
        dexterity: {
            points: 0,
            talents: {lightRangedWeapons: 0, fineWeapons: 0, acrobatics: 0, stealth: 0, tricks: 0, agileDefense: 0}
        },
        intelligence: {
            points: 0,
            talents: {arcane: 0, nature: 0, shadows: 0, astral: 0, necromancer: 0}
        },
        strength: {
            points: 0,
            talents: {heavyRangedWeapon: 0, oneHandedWheapon: 0, twoHandedWheapon: 0, athletics: 0, brutality: 0, robustDefense: 0}
        },
        willpower: {
            points: 0,
            talents: {magicalResistance: 0, lossControlResistance: 0, faith: 0, elementalConnection: 0, ki: 0, manaRegeneration: 0}
        },
        wisdom: {
            points: 0,
            talents: {professions: 0, animalsConnection: 0, natureConnection: 0, survival: 0, perception: 0}
        }
    });

    useEffect(() => {
        console.log(charForm)
    }, [charForm]);

    useEffect(() => {
        setCharForm({...charForm, deckHand: 4})
    }, [charForm.class])
    
    return (
        <div className='w-full px-5 flex flex-col justify-center'>
            {step === 0 && <>
                <Input title={"Name"} name={"name"} type={"text"} value={charForm?.name} onChange={e => setCharForm({...charForm, [e.target.name]: e.target.value})} />

                <Select title={"Class"} name={"class"} value={charForm?.class} onChange={e => setCharForm({...charForm, [e.target.name]: e.target.value})} options={<>
                    <option value={""}>Empty</option>
                    <option value={"warrior"}>Warrior</option>
                </>} />
            </>}

            {step === 1 && <>
                <div className='w-full flex flex-row'>
                    <p className='text-white font-bold mr-2'>Name:</p>
                    <p className='text-white'>{charForm.name}</p>
                </div>
                <div className='w-full flex flex-row'>
                    <p className='text-white font-bold mr-2'>Class:</p>
                    <p className='text-white'>{charForm.class}</p>
                </div>
                <div className='w-full flex flex-row'>
                    <p className='text-white font-bold mr-2'>Level:</p>
                    <p className='text-white'>{charForm.level}</p>
                </div>
                <div className='w-full flex flex-row'>
                    <p className='text-white font-bold mr-2'>Deck Hand:</p>
                    <p className='text-white'>{charForm.deckHand}</p>
                </div>
                <div className='w-full flex flex-row'>
                    <p className='text-white font-bold mr-2'>Atributes:</p>
                    <p className='text-white'>{charForm.atributes}</p>
                </div>

                <Stats charForm={charForm} setCharForm={setCharForm} step={step} />
            </>}

            {step === 2 && <>
                <div className='w-full flex flex-row'>
                    <p className='text-white font-bold mr-2'>Name:</p>
                    <p className='text-white'>{charForm.name}</p>
                </div>
                <div className='w-full flex flex-row'>
                    <p className='text-white font-bold mr-2'>Class:</p>
                    <p className='text-white'>{charForm.class}</p>
                </div>
                <div className='w-full flex flex-row'>
                    <p className='text-white font-bold mr-2'>Level:</p>
                    <p className='text-white'>{charForm.level}</p>
                </div>
                <div className='w-full flex flex-row'>
                    <p className='text-white font-bold mr-2'>Deck Hand:</p>
                    <p className='text-white'>{charForm.deckHand}</p>
                </div>
                <div className='w-full flex flex-row'>
                    <p className='text-white font-bold mr-2'>Atributes:</p>
                    <p className='text-white'>{charForm.atributes}</p>
                </div>

                
            </>}
            
            <div className='w-full flex flex-row items-center justify-center'>
                {step > 0 && <button className='bg-indigo-600 border border-indigo-500 rounded-xl p-2 hover:bg-indigo-700 text-white mr-5' onClick={() => setStep(prev => prev - 1)}>Back</button>}
                <button className='bg-indigo-600 border border-indigo-500 rounded-xl p-2 hover:bg-indigo-700 text-white' onClick={() => setStep(prev => prev + 1)}>Next</button>
            </div>
            
        </div>
    )
}

export default CreateChar