import { Dispatch, SetStateAction } from "react";

interface Props {
  lyrics: string;
  loading: boolean;
  selectedIndexes: number[];
  setSelectedIndexes: Dispatch<SetStateAction<number[]>>;
}

export default function LyricsViewer({
  lyrics,
  loading,
  selectedIndexes,
  setSelectedIndexes,
}: Props) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full w-5 h-5 border-2 border-gray-300 border-t-gray-600"></div>
      </div>
    );
  }

  const lines = lyrics.split("\n");

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 overflow-y-auto h-full flex flex-col gap-4 lyrics-scroll">
      <div className="flex flex-col gap-1">
        <h2 className="text-sm font-semibold text-gray-800">Lyrics</h2>
        <p className="text-xs text-gray-400">Click to select up to 4 lines</p>
      </div>
      {lines.map((line, i) => {
        if (!line.trim() || (line.startsWith("[") && line.endsWith("]")))
          return null;
        const isSelected = selectedIndexes.includes(i);

        function toggleLine() {
          setSelectedIndexes((prev) =>
            prev.includes(i)
              ? prev.filter((idx) => idx !== i)
              : prev.length < 4
                ? [...prev, i]
                : prev,
          );
        }

        return (
          <div key={i} onClick={toggleLine} className="cursor-pointer py-1">
            <span
              className={`text-xl px-2 py-1 rounded bg-[#E9E9E9] transition-colors inline ${isSelected ? "bg-[#FFFF7D] text-black" : "text-gray-800"}`}
            >
              {line || "\u00A0"}
            </span>
          </div>
        );
      })}
    </div>
  );
}
