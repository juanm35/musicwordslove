import MainButton from './elements/MainButton'
import { useState } from 'react';

export default function PlaylistsBuilder() {

    const [numberSongs, setNumberSongs] = useState('10')
    const [description, setDescription] = useState('')
    const [language, setLanguage] = useState('')
    const [mood, setMood] = useState('')
    const [explicit, setExplicit] = useState('')
    
    const [completeError, setCompleteError] = useState(false)

    const [test, setTest] = useState('')

    function assignDescription(e){
        setDescription(e.target.value)
    }

    function assignNumberSongs(e){
        setNumberSongs(e.target.value)
    }

    function assignLanguage(e){
        if (e == '') {
            setLanguage('')
        } else {
            let languageText = ` The songs should be on ${e.target.value} language only.`
            setMood(languageText)
        }
    }

    function assignMood(e){
        if (e == '') {
            setMood('')
        } else {
            let moodText = ` The mood of the songs should inspire ${e.target.value}.`
            setMood(moodText)
        }
    }

    function assignExplicit(e){
        if (!e) {
            setExplicit('')
        } else {
            let explicitText = ` The list can contain explicit songs.`
            setExplicit(explicitText)
        }        
    }

    function generatePlaylist(){
        if (!description){
                setCompleteError(true)
            } else {
                setCompleteError(false)
            const prompt = `
                Generate a json that represents a playlist. The json must contain ${numberSongs} elements, each element represents a song and must have 2 attributes: title and artist. This songs should be generated based on this desciption: ${description}.${language}${mood}${explicit}`
                setTest(prompt)
            }
        }

    return (
    <div className="w-3/5 flex flex-col gap-4 mt-4 bg-gray-100 p-4">
        <p className='text-red-400'>*This section is still in progress</p>
        <input onChange={e => assignDescription(e)} className='border border-solid-4 rounded-md h-12 p-2' placeholder="I want a playlist about bla bla bla"></input>
        {completeError? <p className='text-red-600 pl-2'>This field is required.</p>:<></>}
        <div className='flex w-full gap-8 justify-between'>
            <select className='border border-solid-4 rounded-md w-fit p-4' onChange={e => assignLanguage(e)}>
                <option value=''>Language</option>
                <option value='Spanish'>ES</option>
                <option value='English'>ENG</option>
            </select>
            <select className='border border-solid-4 rounded-md w-fit p-4' onChange={e => assignMood(e)}>
                <option value=''>Mood</option>
                <option value='Relax'>Relaxing</option>
                <option value='Happiness'>Happy</option>
            </select>
            <select className='border border-solid-4 rounded-md w-fit p-4' onChange={e => assignNumberSongs(e)}>
                <option value='10'>10 songs</option>
                <option value='20'>20 songs</option>
                <option value='30'>30 songs</option>
            </select>
            <label className='flex justify-center items-center gap-2'>
                <input type="checkbox" className='border border-solid-4' onChange={e => assignExplicit(e)}></input>
                Explicit songs
            </label>
            <MainButton buttonName="Generate" onClick={generatePlaylist}></MainButton>
        </div>
        <p className='text-green-600'>{test}</p>
    </div>
    );
  }