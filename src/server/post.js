import questsArr from '../assets/quests.js'

async function sendData(){
    try{
        const response = await fetch('http://localhost:8080/dataQuests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(questsArr)
        })
        
        const result = await response.json()
        return result
        
    } catch (error) {
        console.log('Error:', error)
    }
}

sendData()