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
      <div className="flex flex-1 flex-col mx-6 mt-4 mb-4 border border-gray-200 rounded-xl min-h-0 px-6 py-4 overflow-hidden gap-3">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            style={{
              width: `${60 + Math.random() * 35}%`,
            }}
            className="h-8 bg-gray-200 rounded-md animate-pulse"
          />
        ))}
      </div>
    );
  }

  const lines = lyrics.split("\n");

  return (
    <div className="flex flex-1 flex-col mx-6 mt-4 mb-4 border border-gray-200 rounded-xl min-h-0 overflow-hidden">
      <div className="overflow-y-auto px-6 py-4 min-h-0 flex flex-1 flex-col gap-3 lyrics-scroll">
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
            <div key={i} onClick={toggleLine} className="cursor-pointer">
              <span
                className={`text-sm px-2 py-1 rounded bg-[#E9E9E9] transition-colors inline ${isSelected ? "bg-[#FFFF7D] text-black" : "text-gray-800"}`}
              >
                {line || "\u00A0"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
