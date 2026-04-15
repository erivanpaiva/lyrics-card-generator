interface Song {
  id: number;
  title: string;
  artist: string;
  cover: string;
  artistImage: string;
  url: string;
}

interface Props {
  results: Song[];
  onSelect: (song: Song) => void;
}

export default function SearchResults({ results, onSelect }: Props) {
  return (
    <div className="absolute top-full z-50 mt-3 w-full origin-top overflow-hidden rounded-2xl border border-gray-200/80 bg-white/95 animate-[dropdownEnter_220ms_cubic-bezier(0.22,1,0.36,1)]">
      {results.map((song) => (
        <button
          key={song.id}
          onClick={() => onSelect(song)}
          className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-200 hover:bg-neutral-100"
        >
          <img
            src={song.cover}
            alt={song.title}
            className="w-10 h-10 rounded-md object-cover shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-gray-800 truncate">
              {song.title}
            </span>
            <span className="text-xs text-gray-500 truncate">
              {song.artist}
            </span>
          </div>
        </button>
      ))}
      <style jsx>{`
        @keyframes dropdownEnter {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
