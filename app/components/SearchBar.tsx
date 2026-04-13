"use client";

import { clear } from "console";
import { useState, useRef, useEffect } from "react";
import SearchResults from "./SearchResults";

interface Song {
  id: number;
  title: string;
  artist: string;
  cover: string;
  artistImage: string;
  url: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (value.trim().length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    timeoutRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
        const data = await res.json();
        setResults(data.songs || []);
        setShowDropdown(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);
  }

  function handleSelect(song: Song) {
    setQuery("");
    setShowDropdown(false);
    setResults([]);
    console.log("Selected song:", song);
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <div className="flex items-center bg-white border border-gray-200 rounded-full px-5 py-3 gap-3">
        <svg
          className="w-5 h-5 text-gray-400 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for a song"
          className="flex-1 outline-none text-gray-800 placeholder-gray-400 bg-transparent text-sm"
        />
        {loading && (
          <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin shrink-0" />
        )}
      </div>
      {showDropdown && results.length > 0 && (
        <SearchResults results={results} onSelect={handleSelect} />
      )}
    </div>
  );
}
