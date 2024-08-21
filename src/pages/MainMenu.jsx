import React, { useEffect, useState } from 'react'
import useData from '../hooks/useData';
import MainCharCard from '../components/MainCharCard';
import { Link, useNavigate } from 'react-router-dom';

const MainMenu = () => {
    const { getCharacters } = useData();
    const [ charLimit, setCharLimit ] = useState(3);
    const [ canCreate, setCanCreate ] = useState(false);
    const [ chars, setChars ] = useState([]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const characters = getCharacters();
            if (characters.length < charLimit)  setCanCreate(true);
            setChars(characters)
        }, 25);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className='text-white'>
            {chars.map((d, i) => <MainCharCard key={i} />)}
            {canCreate ? 
                <Link className='bg-indigo-600 border border-indigo-500 rounded-xl p-2 hover:bg-indigo-700' to={"/ui/new-character"}>Crear nuevo personaje</Link>
            : null}
        </div>
    )
}

export default MainMenu