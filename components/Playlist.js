import React from "react";

const Playlist = ({ songs }) => {
  return (
    <table className="w-2/5 border-collapse border m-auto">
      <thead className="bg-mwl-orange text-white uppercase">
        <tr>
          <th className="py-3 px-4 text-center">Song</th>
          <th className="py-3 px-4 text-center">Artist</th>
        </tr>
      </thead>
      <tbody>
        {songs.map((song, index) => {
            const [songName, artistName] = song.split(": ");
          return (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-mwl-light-grey"
              } text-mwl-orange`}
            >
              <td className="py-3 px-4 text-center">{songName}</td>
              <td className="py-3 px-4 text-center">{artistName}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Playlist;