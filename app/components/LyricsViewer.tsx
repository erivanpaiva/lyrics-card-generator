interface Props {
  lyrics: string;
  loading: boolean;
}

export default function LyricsViewer({ lyrics, loading }: Props) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full w-5 h-5 border-2 border-gray-300 border-t-gray-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 overflow-y-auto max-h-[70vh]">
      {lyrics.split("\n").map((line, i) => (
        <p
          key={i}
          className="text-sm text-gray-800 py-1 px-2 rounded cursor-pointer hover:bg-gray-100"
        >
          {line}
        </p>
      ))}
    </div>
  );
}
