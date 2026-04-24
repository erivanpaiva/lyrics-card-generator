"use client";

import { useState } from "react";
import {
  User,
  Disc3,
  Upload,
  Square,
  RectangleHorizontal,
  X,
  Download,
  Share2,
} from "lucide-react";

type BackgroundOption = "artist" | "album" | "upload";
type RatioOption = "square" | "wide";

interface Props {
  background: BackgroundOption;
  setBackground: (bg: BackgroundOption) => void;
  ratio: RatioOption;
  setRatio: (r: RatioOption) => void;
  barColor: "black" | "image" | "custom";
  setBarColor: (c: "black" | "image" | "custom") => void;
  customColor: string;
  setCustomColor: (c: string) => void;
}

export default function CardEditor({
  background,
  setBackground,
  ratio,
  setRatio,
}: Props) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [barColor, setBarColor] = useState<"black" | "image" | "custom">(
    "black",
  );
  const [customColor, setCustomColor] = useState("#000000");
  const options: {
    value: BackgroundOption;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      value: "artist",
      label: "Artist Picture",
      icon: <User className="w-5 h-5" />,
    },
    {
      value: "album",
      label: "Album Cover",
      icon: <Disc3 className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex flex-col h-full px-5 pt-6">
      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
        Background
      </p>
      <div className="grid grid-cols-2 w-full max-w-full mx-auto mb-3 gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setBackground(opt.value)}
            className={`flex flex-col items-center justify-center px-3 py-5 rounded-2xl border text-sm font-medium gap-1.5 transition-all ${background === opt.value ? "bg-[#E9E9E9] text-gray-900 border-gray-300" : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`}
          >
            {opt.icon}
            {opt.label}
          </button>
        ))}
      </div>
      <label
        className={`flex items-center w-full mt-2 px-4 py-3.5 rounded-xl border text-sm font-medium cursor-pointer gap-3 transition-all ${background === "upload" ? "bg-[#E9E9E9] text-gray-900 border-gray-400" : "bg-white text-gray-500 border-gray-300 hover:border-gray-300 hover:bg-gray-50 hover:bg-gray-50"}`}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setFileName(file.name);
              setBackground("upload");
            }
          }}
        />
        <Upload className="w-5 h-5 shrink-0" />
        <span className="flex-1 truncate">
          {fileName || "Upload your image"}
        </span>
        {fileName && (
          <X
            className="w-4.5 h-4.5 shrink-0 text-gray-400 hover:text-gray-700"
            onClick={(e) => {
              e.preventDefault();
              setFileName(null);
              setBackground("artist");
            }}
          />
        )}
      </label>
      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mt-8 mb-3">
        Card Ratio
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => setRatio("square")}
          className={`flex flex-col items-center justify-center w-full px-2 py-4 rounded-2xl border text-sm font-medium gap-1.5 transition-all ${ratio === "square" ? "bg-[#E9E9E9] text-gray-900 border-gray-300" : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`}
        >
          <Square className="w-5 h-5" />
          Square
        </button>
        <button
          onClick={() => setRatio("wide")}
          className={`flex flex-col items-center justify-center w-full px-2 py-2.5 rounded-2xl border text-sm font-medium gap-1.5 transition-all ${ratio === "wide" ? "bg-[#E9E9E9] text-gray-900 border-gray-300" : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`}
        >
          <RectangleHorizontal className="w-5 h-5" />
          Wide
        </button>
      </div>
      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mt-8 mb-3">
        Card Color
      </p>
      <div className="flex justify-center gap-10">
        <button
          onClick={() => setBarColor("black")}
          className="flex flex-col items-center gap-1.5"
        >
          <div
            className={`w-7 h-7 bg-black rounded-full border-2 transition-all ${barColor === "black" ? "bg-black border-gray-400" : "border-gray-200 hover:border-gray-400"}`}
          />
          <span className="text-sm text-gray-500">Black</span>
        </button>

        <button
          onClick={() => setBarColor("image")}
          className="flex flex-col items-center gap-1.5"
        >
          <div
            className={`w-7 h-7 bg-gray-200 rounded-full border-2 overflow-hidden transition-all ${barColor === "image" ? "border-gray-400" : "border-gray-200 hover:border-gray-400"}`}
          />
          <span className="text-sm text-gray-500">Highlight</span>
        </button>

        <label className="relative flex flex-col items-center gap-1.5 cursor-pointer">
          <div
            style={{ backgroundColor: customColor }}
            className={`w-7 h-7 rounded-full border-2 transition-all ${barColor === "custom" ? "border-gray-400" : "border-gray-200 hover:border-gray-400"}`}
          />
          <input
            type="color"
            className="w-7 h-7 opacity-0 absolute top-0 left-0 cursor-pointer"
            value={customColor}
            onChange={(e) => {
              setCustomColor(e.target.value);
              setBarColor("custom");
            }}
          />
          <span className="text-sm text-gray-500">Custom</span>
        </label>
      </div>
      <div className="mt-auto pb-6 flex flex-col gap-2">
        <button className="w-full py-3 bg-gray-900 text-white rounded-full text-sm font-medium transition-all flex items-center justify-center gap-2 hover:bg-gray-800">
          <Download className="w-4 h-4" />
          Download Card
        </button>
        <button className="w-full py-3 bg-gray-100 text-gray-600 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-2 hover:bg-gray-200">
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>
    </div>
  );
}
