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
    <main className="min-h-screen bg-[#FAFAFA]">
      <div
        className={`
          fixed top-0 left-0 w-full z-50
          transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${selectedSong ? "h-20 bg-[#FFFF7D] border-b border-gray-200" : "h-screen bg-[#FFFF7D] border-b border-gray-200"}
        `}
      >
        <div
          className={`
            max-w-5xl mx-auto h-full px-6
            transition-all duration-700
            flex
            ${
              selectedSong
                ? "items-center justify-center"
                : "flex-col items-center justify-center gap-8"
            }
          `}
        >
          <div
            className={`
              flex items-center justify-center gap-6
              transition-all duration-700
              ${selectedSong ? "flex-row" : "flex-col w-full"}
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
                ${selectedSong ? "w-[420px]" : "w-full max-w-xl"}
              `}
            >
              <SearchBar onSelect={handleSelectSong} />
            </div>

            {selectedSong && (
              <div className="flex items-center gap-3 shrink-0">
                <img
                  src={selectedSong.cover}
                  alt={selectedSong.title}
                  className="w-10 h-10 rounded object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {selectedSong.title}
                  </p>
                  <p className="text-xs text-gray-600">{selectedSong.artist}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedSong && (
        <div className="pt-24 px-12 pb-6 h-screen">
          <div className="grid grid-cols-[2fr_3fr] gap-8 animate-fadeIn h-full">
            <LyricsViewer
              lyrics={lyrics}
              loading={loading}
              selectedIndexes={selectedIndexes}
              setSelectedIndexes={setSelectedIndexes}
            />
            <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center gap-4">
              <div className="w-full">
                <h2 className="text-sm font-semibold text-gray-800">
                  Card Preview
                </h2>
              </div>
              <LyricsCard
                image={selectedSong.artistImage}
                lyrics={selectedIndexes.map((i) => lines[i])}
                title={selectedSong.title}
                artist={selectedSong.artist}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
