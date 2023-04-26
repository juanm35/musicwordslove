import MainButton from './elements/MainButton'
import { useState } from 'react';
import {promptResponse} from '../gpt/index'

export default function PlaylistsBuilder({setPlaylist, setLoading}) {

    const [numberSongs, setNumberSongs] = useState('10')
    const [description, setDescription] = useState('')
    const [language, setLanguage] = useState('')
    const [mood, setMood] = useState('')
    const [explicit, setExplicit] = useState(' Do not include explicit songs.')
    
    const [completeError, setCompleteError] = useState(false)

    function assignDescription(e){
        setDescription(e.target.value)
    }

    function assignNumberSongs(e){
        setNumberSongs(e.target.value)
    }

    function assignLanguage(e){
        if (e.target.value == '') {
            setLanguage('')
        } else {
            let languageText = ` Only include songs in ${e.target.value}.`
            setLanguage(languageText)
        }
    }

    function assignMood(e){
        if (e.target.value == '') {
            setMood('')
        } else {
            let moodText = ` The mood of the playlist should inspire ${e.target.value}.`
            setMood(moodText)
        }
    }

    function assignExplicit(e){
        if (!e.target.checked) {
            let explicitText = ` Do not include explicit songs.`
            setExplicit(explicitText)
        } else {
            setExplicit('')
        }        
    }

    async function generatePlaylist(){
        try {
            if (!description){
                    setCompleteError(true)
                } else {
                    setCompleteError(false)
                    setLoading(true)
                const prompt = `
                    Generate an array that represents a playlist of songs. The array must contain ${numberSongs} elements, each element must be a string composed by the title and artist of the song separated by a : and a space. For example: [Tu: Shakira, Loba: Shakira]. This playlist should be generated based on this main desciption: ${description}.${language}${mood}${explicit} Return only the array, do not include any explanatory text.`
                   const playlist = await promptResponse(prompt)
                   setPlaylist(JSON.parse(playlist))
                   setLoading(false)
                }
            } catch(error) {
                console.error(error)
            }

        }

    return (
    <div className="w-3/5 flex flex-col gap-4 mt-4 bg-gray-100 p-4 pt-8">
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
    </div>
    );
  }