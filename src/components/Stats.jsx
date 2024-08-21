import React, { useEffect, useState } from 'react'
import Strength from './StatsComponents/Strength';
import Dexterity from './StatsComponents/Dexterity';
import Intelligence from './StatsComponents/Intelligence';
import Constitution from './StatsComponents/Constitution';
import Willpower from './StatsComponents/Willpower';
import Wisdom from './StatsComponents/Wisdom';
import Charisma from './StatsComponents/Charisma';

const Stats = ({charForm, setCharForm }) => {
    return (
        <div className='w-full flex flex-col mt-5'>
            <Strength charForm={charForm} setCharForm={setCharForm} />
            <Dexterity charForm={charForm} setCharForm={setCharForm} />
            <Intelligence charForm={charForm} setCharForm={setCharForm} />
            <Constitution charForm={charForm} setCharForm={setCharForm} />
            <Willpower charForm={charForm} setCharForm={setCharForm} />
            <Wisdom charForm={charForm} setCharForm={setCharForm} />
            <Charisma charForm={charForm} setCharForm={setCharForm} />
        </div>
    )
}

export default Stats