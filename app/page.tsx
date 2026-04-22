"use client";

import { useState } from "react";
import SearchBar from "./components/SearchBar";
import LyricsViewer from "./components/LyricsViewer";
import LyricsCard from "./components/LyricsCard";

interface Song {
  id: number;
  title: string;
  artist: string;
  cover: string;
  artistImage: string;
  url: string;
}

export default function Home() {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [lyrics, setLyrics] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const lines = lyrics.split("\n");

  async function handleSelectSong(song: Song) {
    setSelectedSong(song);
    setSelectedIndexes([]);
    setLyrics("");
    setLoading(true);
    try {
      const res = await fetch(
        `/api/lyrics?url=${encodeURIComponent(song.url)}`,
      );
      const data = await res.json();
      setLyrics(data.lyrics || "");
    } catch {
      setLyrics("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="h-screen flex flex-col bg-[#FAFAFA] overflow-hidden">
      <div
        className={`
          fixed top-0 left-0 w-full z-50
          transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${selectedSong ? "h-16 bg-[#FFFF7D] border-b border-gray-200" : "h-screen bg-[#FFFF7D] border-b border-gray-200"}
        `}
      >
        <div
          className={`
            max-w-5xl mx-auto h-full px-6
            transition-all duration-700
            flex
            ${
              selectedSong
                ? "items-center justify-center gap-6"
                : "flex-col items-center justify-center gap-8"
            }
          `}
        >
          <h1
            className={`
                font-bold text-gray-800 tracking-tight whitespace-nowrap shrink-0
                transition-all duration-700
                ${selectedSong ? "text-lg" : "text-4xl text-center"}
              `}
          >
            Lyrics Card Generator
          </h1>

          <div
            className={`
                transition-all duration-700
                ${selectedSong ? "w-[400px]" : "w-full max-w-xl"}
              `}
          >
            <SearchBar onSelect={handleSelectSong} compact={!!selectedSong} />
          </div>
        </div>
      </div>

      {selectedSong && (
        <div className="flex flex-1 min-h-0 mt-16">
          <div className="bg-white w-[420px] shrink-0 border-r border-gray-200 flex flex-col overflow-hidden">
            <div className="px-5 pt-6 shrink-0">
              <div className="flex items-center gap-4 bg-[#F9F9F9] rounded-xl px-5 py-4">
                <img
                  src={selectedSong.cover}
                  alt={selectedSong.title}
                  className="w-18 h-18 object-cover shrink-0"
                />
                <div className="flex flex-col gap-1">
                  <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                      Title
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {selectedSong.title}
                    </p>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mt-1">
                      Artist
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {selectedSong.artist}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <LyricsViewer
                lyrics={lyrics}
                loading={loading}
                selectedIndexes={selectedIndexes}
                setSelectedIndexes={setSelectedIndexes}
              />
            </div>
          </div>
          <div className="bg-[#FAFAFA] flex-1 flex flex-col items-center justify-center overflow-hidden gap-6">
            <div
              style={{
                transform: "scale(1.3)",
                transformOrigin: "center",
                marginTop: "60px",
                marginBottom: "60px",
                boxShadow:
                  "0 20px 40px rgba(0,0,0,0.35), 0 8px 20px rgba(0,0,0,0.2)",
              }}
            >
              <LyricsCard
                image={selectedSong.artistImage}
                lyrics={
                  selectedIndexes.length > 0
                    ? selectedIndexes.map((i) => lines[i])
                    : ["Click on lyrics to select up to 4 lines"]
                }
                title={selectedSong.title}
                artist={selectedSong.artist}
              />
            </div>
            <div className="flex gap-3 mt-10 z-50">
              <button className="bg-[#F0F0F0] flex items-center px-5 py-2.5 rounded-full border border-[#D8D8D8] text-sm font-medium text-gray-600 gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Save Image
              </button>
              <button className="bg-[#F0F0F0] flex items-center px-5 py-2.5 rounded-full border border-[#D8D8D8] text-sm font-medium text-gray-600 gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                Share
              </button>
            </div>
          </div>
          <div className="bg-white w-[420px] shrink-0 border-l border-gray-200 flex flex-col overflow-hidden"></div>
        </div>
      )}
    </main>
  );
}
