export default function SuccessCase() {
    return (
    <div className="bg-mwl-light-grey flex justify-center p-8">
        <div className='flex flex-col justify-center items-center w-3/6'>
        <h1 className="text-gray-800 font-lexend font-bold text-4xl tracking-wider leading-10">Ready for some playlists?</h1>
        <h2 className='mt-4 text-gray-800 font-lexend font-light text-base tracking-tighter leading-7 text-center'>Below you will find a selection of music sample playlists created with the help of AI. 
    These playlists have been curated based on algorithms that analyze and categorize music, making for a unique and innovative listening experience.</h2>
        <div className="flex justify-center items-center p-4 w-full">
            <div className="w-2/5">
                <h3 className="text-gray-800 font-stix font-medium italic text-2xl tracking-tighter leading-10">Best French Vocal House From 90s to 00s</h3>
                <h4 className="text-gray-800 font-lexend font-light text-base tracking-tighter leading-5">AI ultracurated playlist created in seconds.</h4>
                <a href="#" className="cursor-pointer text-orange-500 font-lexend text-base tracking-tighter leading-5 underline">VIEW FULL PLAYLIST</a>
            </div>
            <img className="w-3/5 border-2 border-solid" src="#"></img>
        </div>
        </div>
    </div>
    );
  }