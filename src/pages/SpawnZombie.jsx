import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useData from '../hooks/useData';
import Alert from '../components/Alert';

const SpawnZombie = () => {
    const [ alert, setAlert ] = useState({});
    const { players, setPlayers, difficulty, setDifficulty, zombies, setZombies } = useData();

    const navigate = useNavigate();

    const handleCharacters = (e) => {
      if (isNaN(e.target.value)) {
        setAlert({msg: 'Debes introducir un número', error: true});
        return;
      };
      if (e.target.value < 0) {
        setAlert({msg: 'El número de personajes no puede ser menor que 0', error: true});
        return;
      };
      setPlayers(e.target.value);
    };

    const handleCheckbox = (e) => {
      setDifficulty(e.target.value);

      if (e.target.value === 'rookie') {
        setZombies(['walkers', 'runners', 'fats']);
      } else {
        setZombies(['walkers', 'runners', 'fats', 'abomination']);
      }
      
    };

    const handleZombies = (e) => {
      if (e.target.checked) {
        setZombies([...zombies, e.target.value]);
      } else {
        setZombies(zombies.filter(z => z !== e.target.value));
      };

    };

    const handleOnClick =() => {
      if (!players) {
        setAlert({msg: 'Debes añadir un número de personajes', error: true});
        return;
      };
      if (!difficulty) {
        setAlert({msg: 'Debes seleccionar una dificultad', error: true});
        return;
      };
      if (zombies.length === 0) {
        setAlert({msg: 'Debes seleccionar al menos 1 tipo de zombi', error: true});
        return;
      };
      navigate("/start_game");
    };

    const { msg } = alert;

  return (
    <>
      <div className='w-full border-b-4 border-red-800 mx-auto'>
        <h2 className='font-bold text-2xl'>Elige el número de personajes</h2>
      </div>

      <div className='w-full my-5'>
        <input type='number' className='border-2 border-gray-400 rounded-xl mr-2 text-center' id='nChars' value={players} onChange={handleCharacters} /><label htmlFor='nChars' className='font-bold'>Personajes</label>
      </div>

      <div className='w-full border-b-4 border-red-800 mx-auto'>
        <h2 className='font-bold text-2xl'>Elige una dificultad para las apariciones</h2>
      </div>

      <div className='w-full grid grid-rows-3 gap-5 my-5 mx-auto'>
        <div className='flex flex-row'>
          <input type='checkbox' className='mr-2' value={'rookie'} id='rookie' name='rookie' checked={difficulty === 'rookie'} onChange={handleCheckbox} /><label htmlFor='rookie'>Principiante</label>
        </div>
        <div className='flex flex-row'>
          <input type='checkbox' className='mr-2' value={'blue'} id='blue' name='blue' checked={difficulty === 'blue'} onChange={handleCheckbox} /><label htmlFor='blue'>Azul</label>
        </div>
        <div className='flex flex-row'>
          <input type='checkbox' className='mr-2' value={'yellow'} id='yellow' name='yellow' checked={difficulty === 'yellow'} onChange={handleCheckbox} /><label htmlFor='yellow'>Amarillo</label>
        </div>
        <div className='flex flex-row'>
          <input type='checkbox' className='mr-2' value={'orange'} id='orange' name='orange' checked={difficulty === 'orange'} onChange={handleCheckbox} /><label htmlFor='orange'>Naranja</label>
        </div>
        <div className='flex flex-row'>
          <input type='checkbox' className='mr-2' value={'red'} id='red' name='red' checked={difficulty === 'red'} onChange={handleCheckbox} /><label htmlFor='red'>Rojo</label>
        </div>
        <div className='flex flex-row'>
          <input type='checkbox' className='mr-2' value={'madness'} id='madness' name='madness' checked={difficulty === 'madness'} onChange={handleCheckbox} /><label htmlFor='madness'>Reza por tu vida</label>
        </div>
      </div>

      {difficulty && <>
        <div className='w-full border-b-4 border-red-800'>
          <h2 className='font-bold text-2xl'>Personaliza el tipo de zombis que aparecerán</h2>
        </div>

        <h3 className='font-bold mt-5'>Nigromantes</h3>
        <p>Los nigromantes siempre aparecerán</p>

        <h3 className='font-bold mt-5'>Normales</h3>
        <div className='w-full grid grid-cols-3 gap-5'>
          <div className='flex flex-row'>
            <input type='checkbox' className='mr-2' value={'walkers'} id='walkers' name='walkers' checked={zombies.some(z => z==='walkers')} onChange={handleZombies} /><label htmlFor='walkers'>Caminantes</label>
          </div>
          <div className='flex flex-row'>
            <input type='checkbox' className='mr-2' value={'runners'} id='runners' name='runners' checked={zombies.some(z => z==='runners')} onChange={handleZombies} /><label htmlFor='runners'>Corredores</label>
          </div>
          <div className='flex flex-row'>
            <input type='checkbox' className='mr-2' value={'fats'} id='fats' name='fats' checked={zombies.some(z => z==='fats')} onChange={handleZombies} /><label htmlFor='fats'>Gordos</label>
          </div>
          <div className='flex flex-row'>
            <input type='checkbox' className='mr-2' value={'abomination'} id='abomination' name='abomination' checked={zombies.some(z => z==='abomination')} onChange={handleZombies} disabled={difficulty === 'rookie'} /><label htmlFor='abomination'>Abominación</label>
          </div>
        </div>

        <h3 className='font-bold mt-5'>Orcos</h3>
        <div className='w-full grid grid-cols-3 gap-5 my-5'>
          <div className='flex flex-row'>
            <input type='checkbox' className='mr-2' value={'orc_walkers'} id='orc_walkers' name='orc_walkers' checked={zombies.some(z => z==='orc_walkers')} onChange={handleZombies} /><label htmlFor='orc_walkers'>Caminantes orcos</label>
          </div>
          <div className='flex flex-row'>
            <input type='checkbox' className='mr-2' value={'orc_runners'} id='orc_runners' name='orc_runners' checked={zombies.some(z => z==='orc_runners')} onChange={handleZombies} /><label htmlFor='orc_runners'>Corredores orcos</label>
          </div>
          <div className='flex flex-row'>
            <input type='checkbox' className='mr-2' value={'orc_fats'} id='orc_fats' name='orc_fats' checked={zombies.some(z => z==='orc_fats')} onChange={handleZombies} /><label htmlFor='orc_fats'>Gordos orcos</label>
          </div>
          <div className='flex flex-row'>
            <input type='checkbox' className='mr-2' value={'orc_abomination'} id='orc_abomination' name='orc_abomination' checked={zombies.some(z => z==='orc_abomination')} onChange={handleZombies} disabled={difficulty === 'rookie'} /><label htmlFor='orc_abomination'>Abominación orca</label>
          </div>
        </div>
        
        <h3 className='font-bold mt-5'>Otros</h3>
        <div className='w-full grid grid-cols-3 gap-5 my-5'>
          <div className='flex flex-row'>
            <input type='checkbox' className='mr-2' value={'abominataour'} id='abominataour' name='abominataour' checked={zombies.some(z => z==='abominataour')} onChange={handleZombies} disabled={difficulty === 'rookie'} /><label htmlFor='abominataour'>Abominataour</label>
          </div>
          <div className='flex flex-row'>
            <input type='checkbox' className='mr-2' value={'abominatroll'} id='abominatroll' name='abominatroll' checked={zombies.some(z => z==='abominatroll')} onChange={handleZombies} disabled={difficulty === 'rookie'} /><label htmlFor='abominatroll'>Abominatroll</label>
          </div>
          <div className='flex flex-row'>
            <input type='checkbox' className='mr-2' value={'ablobination'} id='ablobination' name='ablobination' checked={zombies.some(z => z==='ablobination')} onChange={handleZombies} disabled={difficulty === 'rookie'} /><label htmlFor='ablobination'>Abominatroll</label>
          </div>
        </div>
      </>}
        {msg && <Alert alert={alert} />}
        <button className='rounded-full my-5 p-5 bg-red-900 text-white font-bold hover:bg-red-950 hover:shadow-xl shadow-black' onClick={handleOnClick}>¡A por los zombies!</button>
    </>
  )
}

export default SpawnZombie