import './escapes.css'
import AllQuests from './img/all.svg'
import Adventures from './img/adventures.svg'
import Horror from './img/horror.svg'
import Mysticism from './img/mysticism.svg'
import Detective from './img/detective.svg'
import SciFi from './img/sciFi.svg'
import personIcon from './img/person.svg'
import puzzleIcon from './img/puzzle.svg'

import quests from '../../../assets/quests.js'

function Escapes () {

    const filters = [
        {'title': 'All quests', 'src': AllQuests,},
        {'title': 'Adventures', 'src': Adventures,},
        {'title': 'Horror', 'src': Horror,},
        {'title': 'Mysticism', 'src': Mysticism,},
        {'title': 'Detective', 'src': Detective,},
        {'title': 'Sci-Fi', 'src': SciFi,},
    ]
    
    return(
        <main className="escapes-wrap">
              <div className="escapes-component escapes--head">
                <p>Games in Lviv</p>
                <h1>Choose a topic</h1>
              </div>
              <div className="escapes-component escapes--filters">
                {filters.map((filter, index)=>(
                    <div className="filter" key={index}>
                        <img src={filter.src} alt={filter.title} />
                        <p>{filter.title}</p>
                    </div>
                ))}
              </div>
              <div className="escapes-component escapes--quests">
                    {quests.map(quest => (
                        <div key={quest.id} className='quest' style={{ backgroundImage: `url(${quest.previewImg})`}}>
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
                        </div>
                    ))}
              </div>
        </main>
    )
}

export default Escapes