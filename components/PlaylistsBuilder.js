import MainButton from './elements/MainButton'
import { useState, useEffect } from 'react';
import {promptResponse} from '../gpt/index'
import {createPrompt} from '../firebase/firestore'
import { useAuth } from "../context/AuthContext"

export default function PlaylistsBuilder({setPlaylist, setLoading}) {

    const { currentUser } = useAuth();

    const [description, setDescription] = useState('')
    const [language, setLanguage] = useState('')
    const [mood, setMood] = useState('')
    const [repeatArtist, setRepeatArtist] = useState(' Avoid repeating artists.')
    const [explicit, setExplicit] = useState(' Avoid explicit songs.')
    const [hoursDuration, setHoursDuration] = useState(1)
    const [minutesDuration, setMinutesDuration] = useState(0)
    
    const [completeError, setCompleteError] = useState(false)

    useEffect(() => {
        console.log("Current User PROMPT: ", currentUser)
      }, [currentUser]);

    function assignDescription(e){
        setDescription(e.target.value)
    }

    function assignHoursDuration(e){
        setHoursDuration(e.target.value)
    }

    function assignMinutesDuration(e){
        setMinutesDuration(e.target.value)
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

    function assignRepeatArtist(e){
        if (!e.target.checked) {
            let repeatArtistText = ` Avoid repeating artists.`
            setRepeatArtist(repeatArtistText)
        } else {
            setRepeatArtist('')
        }        
    }

    function assignExplicit(e){
        if (!e.target.checked) {
            let explicitText = ` Avoid explicit songs.`
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
                const prompt = `Generate an array that represents a playlist of songs. Playlist duration should be within ${hoursDuration}h${minutesDuration}m ±5%. Each element must be a string composed by the title and artist of the song separated by a : and a space. For example: [Tu: Shakira, Loba: Shakira]. This playlist should be generated based on this main desciption: ${description}.${language}${mood}${explicit}${repeatArtist} Return only the array, do not include any explanatory text.`
                   const playlist = await promptResponse(prompt)
                   setPlaylist(JSON.parse(playlist))
                   setLoading(false)
                   console.log("GENERATED PROMPT: ", prompt)
                   await createPrompt(currentUser.uid, description, language, mood, explicit, repeatArtist, hoursDuration, minutesDuration, prompt)
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
            <label className='flex justify-center items-center border border-solid-4 rounded-md w-fit p-2 gap-2'>
                <input type="number" min="0" step="1" pattern="\d*" className='w-1/2 p-4' onChange={e => assignHoursDuration(e)}/>
                <div className='bg-grey-400'>hours</div>
            </label>
            <label className='flex justify-center items-center border border-solid-4 rounded-md w-fit p-2 gap-2'>
                <input type="number" min="0" step="1" pattern="\d*" max="59" className='w-1/2 p-4' onChange={e => assignMinutesDuration(e)}/>
                <div className='bg-grey-400'>minutes</div>
            </label>
            <label className='flex justify-center items-center gap-2'>
                <input type="checkbox" className='border border-solid-4' onChange={e => assignRepeatArtist(e)}></input>
                Repeat Artist
            </label>
            <label className='flex justify-center items-center gap-2'>
                <input type="checkbox" className='border border-solid-4' onChange={e => assignExplicit(e)}></input>
                Explicit songs
            </label>
            <MainButton buttonName="Generate" onClick={generatePlaylist}></MainButton>
        </div>
    </div>
    );
  }