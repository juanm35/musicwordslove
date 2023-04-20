import MainButton from './elements/MainButton'

export default function PlaylistsBuilder() {
    return (
    <div className="w-3/5 flex flex-col gap-4 mt-4 bg-gray-100 p-4">
        <p className='text-red-400'>*Section not functional yet</p>
        <input className='border border-solid-4 rounded-md h-12 p-2' placeholder="I want a playlist about bla bla bla"></input>
        <div className='flex w-full gap-8 justify-between'>
            <select className='border border-solid-4 rounded-md w-fit p-4'>
                <option value=''>Language</option>
                <option value='Espanol'>ES</option>
                <option value='English'>ENG</option>
            </select>
            <select className='border border-solid-4 rounded-md w-fit p-4'>
                <option value=''>Mood</option>
                <option value='Relaxing'>Relaxing</option>
                <option value='Happy'>Happy</option>
            </select>
            <select className='border border-solid-4 rounded-md w-fit p-4'>
                <option value='20'>20 songs</option>
                <option value='10'>10 songs</option>
                <option value='30'>30 songs</option>
            </select>
            <label className='flex justify-center items-center gap-2'>
                <input type="checkbox" className='border border-solid-4'></input>
                Explicit songs
            </label>
            <MainButton buttonName="Generate"></MainButton>
        </div>
    </div>
    );
  }