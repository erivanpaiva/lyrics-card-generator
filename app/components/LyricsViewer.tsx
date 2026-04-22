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
    <div className="flex flex-col mx-6 mt-4 border border-gray-200 rounded-xl overflow-hidden">
      <div className="overflow-y-auto h-[580px] px-6 py-4 flex flex-col gap-3 lyrics-scroll">
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
                className={`text-[14px] px-2 py-1 rounded bg-[#E9E9E9] transition-colors inline ${isSelected ? "bg-[#FFFF7D] text-black" : "text-gray-800"}`}
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
