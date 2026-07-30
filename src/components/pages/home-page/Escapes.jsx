import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import './escapes.css'
import AllQuests from './img/all.svg'
import Adventures from './img/adventures.svg'
import Horror from './img/horror.svg'
import Mysticism from './img/mysticism.svg'
import Detective from './img/detective.svg'
import SciFi from './img/sciFi.svg'
import personIcon from './img/person.svg'
import puzzleIcon from './img/puzzle.svg'



function Escapes() {
    const [filteredArr, setFilteredArr] = useState(null)
    const [quests, setQuests] = useState(null)

    useEffect(() => {

        fetch(`http://localhost:8080/dataQuests`)
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                setQuests(data)
                setFilteredArr(data);
            })
    }, []);

    console.log(filteredArr)

    const filters = [
        { 'title': 'All quests', 'value': 'all', 'src': AllQuests, },
        { 'title': 'Adventures', 'value': 'adventures', 'src': Adventures, },
        { 'title': 'Horror', 'value': 'horror', 'src': Horror, },
        { 'title': 'Mysticism', 'value': 'mystic', 'src': Mysticism, },
        { 'title': 'Detective', 'value': 'detective', 'src': Detective, },
        { 'title': 'Sci-Fi', 'value': 'sci-fi', 'src': SciFi, },
    ]

    function filteringArr(value) {
        const newArr = value === 'all' ? quests :  quests.filter((item)=> item.type == value)
        setFilteredArr(newArr)
    }
    if (!quests && !filteredArr) {
        return <div className='data-err'>Loading...</div>
    } 
    
    return (
        <div className="escapes-wrap">
            <div className="escapes-component escapes--head">
                <p>Games in Lviv</p>
                <h1>Choose a topic</h1>
            </div>
            <div className="escapes-component escapes--filters">
                {filters.map((filter, index) => (
                    <div className="filter" key={index} onClick={()=> filteringArr(filter.value) }>
                        <img src={filter.src} alt={filter.title} />
                        <p>{filter.title}</p>
                    </div>
                ))}
            </div>
            <div className="escapes-component escapes--quests">
                {filteredArr.map(quest => (
                    <Link key={quest.id} to={`${(quest.title).toLowerCase()}/${quest.id}`} className='quest' style={{ backgroundImage: `url(${quest.previewImg})` }}>
                        <h2>{quest.title}</h2>
                        <div className='quest-info'>
                            <div className='quest--persons'>
                                <img src={personIcon} alt="person-icon" className='quest--icon' />
                                <p>{quest.peopleCount[0]} - {quest.peopleCount[1]}</p>
                            </div>
                            <div>
                                <img src={puzzleIcon} alt="puzzle-icon" className='quest--icon' />
                                <p>{quest.level}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Escapes