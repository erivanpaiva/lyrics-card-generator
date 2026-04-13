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
    <div className="absolute top-full mt-2 w-full bg-white rounded-2xl border border-gray-200 overflow-hidden z-50">
      {results.map((song) => (
        <button
          key={song.id}
          onClick={() => onSelect(song)}
          className="flex text-left items-center w-fullgap-3 px-4 py-3 hover:bg-neutral-200 transition-colors"
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
    </div>
  );
}
