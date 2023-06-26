import React, { useState } from 'react';
import useData from '../hooks/useData';
import walker from "../img/walker.png";
import runner from "../img/runner.png";
import fatty from "../img/fatty.png";
import abomination from "../img/abomination.png";
import allwalkers from "../img/allwalkers.png";
import allrunners from "../img/allrunners.png";
import allfatties from "../img/allfatties.png";

const Config = {
    "walkers": {
        porcent: 0.5,
        number: 3,
        label: "Caminante",
        labelAll: "Caminantes activación extra",
        rookie: {percent: 1.8, number: 0},
        blue: {percent: 1.6, number: 1},
        yellow: {percent: 1.6, number: 2},
        orange: {percent: 1.8, number: 3},
        red: {percent: 1.8, number: 4},
        madness: {percent: 2, number: 5}
    },
    "runners": {
        porcent: 0.4,
        number: 2,
        label: "Corredor",
        labelAll: "Corredores activación extra",
        rookie: {percent: 0.5, number: 0},
        blue: {percent: 1, number: 0},
        yellow: {percent: 1.2, number: 1},
        orange: {percent: 1.4, number: 2},
        red: {percent: 1.6, number: 3},
        madness: {percent: 2, number: 4}
    },
    "fats": {
        porcent: 0.2,
        number: 1,
        label: "Gordo",
        labelAll: "Gordos activación extra",
        rookie: {percent: 0.5, number: 0},
        blue: {percent: 1, number: 0},
        yellow: {percent: 1.2, number: 1},
        orange: {percent: 1.4, number: 2},
        red: {percent: 1.6, number: 3},
        madness: {percent: 2, number: 4}
    },
    "abomination": {
        porcent: 0.1,
        number: 1,
        label: "Abominación",
        rookie: {percent: 0.5, number: -1},
        blue: {percent: 1, number: 0},
        yellow: {percent: 1.2, number: 0},
        orange: {percent: 1.4, number: 0},
        red: {percent: 1.6, number: 0},
        madness: {percent: 2, number: 0}
    },
    "necromancer": {
        porcent: 0.2,
        number: 1,
        label: "Nigromante",
        rookie: {percent: 0.5, number: 0},
        blue: {percent: 1, number: 0},
        yellow: {percent: 1.2, number: 2},
        orange: {percent: 1.4, number: 3},
        red: {percent: 1.6, number: 4},
        madness: {percent: 2, number: 5}
    },
    "orc_walkers": {
        porcent: 0.7,
        number: 3,
        label: "Caminante orco",
        labelAll: "Caminantes orcos activación extra",
        rookie: {percent: 1.8, number: 0},
        blue: {percent: 1, number: 0},
        yellow: {percent: 1.2, number: 1},
        orange: {percent: 1.4, number: 2},
        red: {percent: 1.6, number: 3},
        madness: {percent: 2, number: 4}
    },
    "orc_runners": {
        porcent: 0.5,
        number: 2,
        label: "Corredor orco",
        labelAll: "Corredores orcos activación extra",
        rookie: {percent: 0.5, number: 0},
        blue: {percent: 1, number: 0},
        yellow: {percent: 1.2, number: 1},
        orange: {percent: 1.4, number: 2},
        red: {percent: 1.6, number: 3},
        madness: {percent: 2, number: 4}
    },
    "orc_fats": {
        porcent: 0.3,
        number: 1,
        label: "Gordo orco",
        labelAll: "Gordos orcos activación extra",
        rookie: {percent: 0.5, number: 0},
        blue: {percent: 1, number: 0},
        yellow: {percent: 1.2, number: 1},
        orange: {percent: 1.4, number: 2},
        red: {percent: 1.6, number: 3},
        madness: {percent: 2, number: 4}
    },
    "orc_abomination": {
        porcent: 0.1,
        number: 1,
        label: "Abominación orca",
        rookie: {percent: 0.5, number: -1},
        blue: {percent: 1, number: 0},
        yellow: {percent: 1.2, number: 0},
        orange: {percent: 1.4, number: 0},
        red: {percent: 1.6, number: 0},
        madness: {percent: 2, number: 0}
    },
    "orc_necromancer": {
        porcent: 0.2,
        number: 1,
        label: "Nigromante orco",
        rookie: {percent: 0.5, number: 0},
        blue: {percent: 1, number: 0},
        yellow: {percent: 1.2, number: 2},
        orange: {percent: 1.4, number: 3},
        red: {percent: 1.6, number: 4},
        madness: {percent: 2, number: 5}
    },
    "abominataour": {
        porcent: 0.1,
        number: 1,
        label: "Abominataour",
        rookie: {percent: 0.5, number: -1},
        blue: {percent: 1, number: 0},
        yellow: {percent: 1.2, number: 0},
        orange: {percent: 1.4, number: 0},
        red: {percent: 1.6, number: 0},
        madness: {percent: 2, number: 0}
    },
    "abominatroll": {
        porcent: 0.1,
        number: 1,
        label: "Abominatroll",
        rookie: {percent: 0.5, number: -1},
        blue: {percent: 1, number: 0},
        yellow: {percent: 1.2, number: 0},
        orange: {percent: 1.4, number: 0},
        red: {percent: 1.6, number: 0},
        madness: {percent: 2, number: 0}
    },
    "ablobination": {
        porcent: 0.1,
        number: 1,
        label: "Ablobination",
        rookie: {percent: 0.5, number: -1},
        blue: {percent: 1, number: 0},
        yellow: {percent: 1.2, number: 0},
        orange: {percent: 1.4, number: 0},
        red: {percent: 1.6, number: 0},
        madness: {percent: 2, number: 0}
    },
    double: {
        porcent: 0.1,
        number:1,
        label: "!Doble aparición!",
        rookie: {percent: 0.5, number: 0},
        blue: {percent: 1, number: 1},
        yellow: {percent: 1.2, number: 2},
        orange: {percent: 1.4, number: 3},
        red: {percent: 1.6, number: 4},
        madness: {percent: 2, number: 5}
    },
    activation: {
        porcent: 0.1,
        number:1,
        label: "!Activación extra!",
        rookie: {percent: 0, number: 0},
        blue: {percent: 1, number: 1},
        yellow: {percent: 1.2, number: 2},
        orange: {percent: 1.4, number: 3},
        red: {percent: 1.6, number: 4},
        madness: {percent: 2, number: 5}
    },
    horde: {
        porcent: 0.2,
        number:1,
        label: "!Ha llegado la horda!",
        rookie: {percent: 0, number: 0},
        blue: {percent: 1, number: 1},
        yellow: {percent: 1.2, number: 2},
        orange: {percent: 1.4, number: 3},
        red: {percent: 1.6, number: 4},
        madness: {percent: 2, number: 5}
    }
};

const ZImg = (z, all) => {
    if (all) {
        switch (z) {
            case 'walkers':
                return allwalkers;
            case 'orc_walkers':
                return allwalkers;
            case 'runners':
                return allrunners;
            case 'orc_runners':
                return allrunners;
            case 'fats':
                return allfatties;
            case 'orc_fats':
                return allfatties;
            default:
                break;
        }
    } else {
        switch (z) {
            case 'walkers':
                return walker;
            case 'orc_walkers':
                return walker;
            case 'runners':
                return runner;
            case 'orc_runners':
                return runner;
            case 'fats':
                return fatty;
            case 'orc_fats':
                return fatty;
            case 'abomination':
                return abomination;
            case 'orc_abomination':
                return abomination;
            case 'abominataour':
                return abomination;
            case 'abominatroll':
                return abomination;
            case 'ablobination':
                return abomination;
            default:
                break;
        };
    };
}

const template = (diff) => {
    switch (diff) {
        case 'rookie':
            return "Apariciones para principiantes";
        case 'blue':
            return "Apariciones fáciles";
        case 'yellow':
            return "Aparición normales";
        case 'orange':
            return "Apariciones difíciles";
        case 'red':
            return "Apariciones de locura";
        case 'madness':
            return "Bienvenido al infierno";
        default:
            break;
    }
};

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

const Game = () => {
    const { players, difficulty, zombies } = useData();
    const [ bg, setBG ] = useState("back");
    const [ uncomingZ, setUncomingZ ] = useState({});

    const handleGetCard = () => {
        setBG('back');
        const spawn = {}

        // Elige entre aparición de zombis, doble aparición o nigromante
        const whatNow = [];
        for (let i=0;i<5;i++) {
            const z = i === 0 ? "walkers" : i === 1 ? "necromancer" : i === 2 ? "double" : i === 3 ? "activation" : "horde";
            const { porcent } = Config[z];
            const D = Config[z][difficulty];
            let name = z+',';
            const newArray = name.repeat((porcent*D.percent)*10).split(',').filter(z => z);
            whatNow.push(...newArray);
        };
        const nowHappens = whatNow[randomIntFromInterval(0, whatNow.length - 1)];
        if (nowHappens === "walkers") {
            const Zs = [];
            zombies.forEach(z => {
                const { porcent } = Config[z];
                const D = Config[z][difficulty];
                let name = z+',';
                const newArray = name.repeat((porcent*D.percent)*10).split(',').filter(z => z);
                Zs.push(...newArray);
            });
    
            for ( let i=0; i<4; i++ ) {
                const noZombi = difficulty === 'rookie' ? 0 : 1;
                const zombi = Zs[randomIntFromInterval(0, Zs.length - noZombi)];
                if (zombi) {
                    const typeConfig = Config[zombi];
                    const totalZombies = Math.floor(typeConfig.number + typeConfig[difficulty].number + (typeConfig.number * (players/10))) + i;
                    spawn[i] = {zombi, totalZombies, label: typeConfig.label};
                } else {
                    spawn[i] = {zombi: "none", totalZombies: 0, label: "¡Despejado!"};
                };
    
            };
            setTimeout(() => {
                setBG('front');
                setUncomingZ(spawn);
            }, 1500);
        } else if (nowHappens === 'necromancer') {
            setTimeout(() => {
                setBG('necromancer');
                setUncomingZ({});
            }, 1500);
        } else if (nowHappens === "double") {
            setTimeout(() => {
                setBG('double');
                setUncomingZ({});
            }, 1500);
        } else if (nowHappens === 'horde') {
            setTimeout(() => {
                setBG('horde');
                setUncomingZ({});
            }, 1500);
        } else {
            const Zs = [];
            zombies.filter(z => z !== "abomination" && z !== "necromancer" && z !== "orc_abomination" && z !== "orc_necromancer" && z !== "abominataour" && z !== "abominatroll" && z !== "ablobination").forEach(z => {
                const { porcent } = Config[z];
                const D = Config[z][difficulty];
                let name = z+',';
                const newArray = name.repeat((porcent*D.percent)*10).split(',').filter(z => z);
                Zs.push(...newArray);
            });

            for ( let i=0; i<4; i++ ) {
                const noZombi = difficulty === 'rookie' ? 0 : 1;
                const zombi = Zs[randomIntFromInterval(0, Zs.length - noZombi)];
                if (zombi) {
                    const typeConfig = Config[zombi];
                    spawn[i] = {zombi, label: typeConfig.labelAll, all: true};
                };
            };
            setTimeout(() => {
                setBG('front');
                setUncomingZ(spawn);
            }, 1500);
        };
    };

  return (
    <>
        <div className='w-full border-b-4 border-red-800 mx-auto'>
            <h2 className='font-bold text-2xl'>¡Aparición zombi!</h2>
        </div>
        <div className={`h-[30rem] w-[21.78rem] ${bg === 'back' && "bg-spawn-zombie-back"} ${bg === 'front' && "bg-spawn-zombie-front"} ${bg === 'necromancer' && "bg-spawn-necromancer"} ${bg === 'double' && "bg-spawn-double"} ${bg === 'horde' && "bg-spawn-horde"} flex flex-col items-center  bg-no-repeat bg-contain my-5 rounded-3xl`}>
            {bg === 'front' &&
                <>
                    <div className='w-1/2 h-1/4 flex align-middle items-center justify-center pb-4'>
                        <h2 className='text-center font-bold text-2xl text-black'>{template(difficulty)}</h2>
                    </div>
                    <div className='w-[69%] h-[58.5%] grid-flow-row mt-4'>
                        <div className='w-full h-1/4 py-3 px-3 flex flex-row justify-end items-center align-middle '>
                            <div className='w-1/3 h-full flex flex-col justify-center items-center mt-1'>
                                <p className='font-bold m-0 text-base italic mt-3 leading-3 z-10 text-black'>{uncomingZ[3].label}</p>
                                <p className='font-bold m-0 text-xl text-black'><span className='text-3xl'>{uncomingZ[3].totalZombies ? "x"+uncomingZ[3].totalZombies : ""}</span></p>
                            </div>
                            <img src={ZImg(uncomingZ[3].zombi, uncomingZ[3].all)}className='h-18 w-10 mt-5 z-0 '/>
                        </div>
                        <div className='w-full h-1/4 py-3 px-3 flex flex-row justify-end items-center align-middle mt-1'>
                            <div className='w-1/3 h-full flex flex-col justify-center items-center'>
                                <p className='font-bold m-0 text-base italic mt-3 leading-3 z-10 text-black'>{uncomingZ[2].label}</p>
                                <p className='font-bold m-0 text-xl text-black'><span className='text-3xl'>{uncomingZ[2].totalZombies ? "x"+uncomingZ[2].totalZombies :""}</span></p>
                            </div>
                            <img src={ZImg(uncomingZ[2].zombi, uncomingZ[2].all)} className='h-18 w-10 mt-5 z-0 '/>
                        </div>
                        <div className='w-full h-1/4 py-3 px-3 flex flex-row justify-end items-center align-middle mt-1'>
                            <div className='w-1/3 h-full flex flex-col justify-center items-center'>
                                <p className='font-bold m-0 text-base italic mt-3 leading-3 z-10 text-black'>{uncomingZ[1].label}</p>
                                <p className='font-bold m-0 text-xl text-black'><span className='text-3xl'>{uncomingZ[1].totalZombies ? "x"+uncomingZ[1].totalZombies : ""}</span></p>
                            </div>
                            <img src={ZImg(uncomingZ[1].zombi, uncomingZ[1].all)}className='h-18 w-10 mt-5 z-0'/>
                        </div>
                        <div className='w-full h-1/4 py-3 px-3 flex flex-row justify-end items-center align-middle mt-1'>
                            <div className='w-1/3 h-full flex flex-col justify-center items-center'>
                                <p className='font-bold m-0 text-base italic mt-3 leading-3 z-10 text-black'>{uncomingZ[0].label}</p>
                                <p className='font-bold m-0 text-xl text-black'><span className='text-3xl'>{uncomingZ[0].totalZombies ? "x"+uncomingZ[0].totalZombies : ""}</span></p>
                            </div>
                            <img src={ZImg(uncomingZ[0].zombi, uncomingZ[0].all)} className='h-18 w-10 mt-5 z-0'/>
                        </div>
                    </div>
                </>
            }
        </div>
        <button className='rounded-full my-5 p-5 bg-red-900 text-white font-bold hover:bg-red-950 hover:shadow-xl shadow-black' onClick={handleGetCard}>¡Sacar carta!</button>
    </>
  )
}

export default Game