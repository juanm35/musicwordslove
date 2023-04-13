export default function MainButton({buttonName, onClick}) {
    return (
      <div>
        <button onClick={() => onClick()} className="bg-mwl-orange text-white rounded-lg p-4">{buttonName}</button>
      </div>
    );
  }