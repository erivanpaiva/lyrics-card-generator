import { useEffect, useRef, useState } from "react";

interface Props {
  image: string;
  lyrics: string[];
  title: string;
  artist: string;
}

export default function LyricsCard({ image, lyrics, title, artist }: Props) {
  const [fontSize, setFontSize] = useState(18);
  const measureRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!measureRef.current || !lyrics.length) return;

    const el = measureRef.current;
    const maxWidth = 402 - 24;

    let size = 18;

    while (size > 10) {
      el.style.fontSize = size + "px";

      const children = Array.from(el.children) as HTMLElement[];

      const maxLineWidth = Math.max(
        ...children.map((child) => child.scrollWidth),
      );

      if (maxLineWidth <= maxWidth) break;

      size -= 1;
    }

    setFontSize(size);
  }, [lyrics]);
  return (
    <div className="w-[402px] aspect-square relative overflow-hidden">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        ref={measureRef}
        className="absolute opacity-0 pointer-events-none whitespace-nowrap font-light tracking-[0.01em]"
      >
        {lyrics.slice(0, 4).map((line, i) => (
          <span key={i} className="px-[4px] inline-block">
            {line}
          </span>
        ))}
      </div>
      <div
        style={{ gap: `${Math.round(fontSize * 0.26)}px` }}
        className="absolute inset-0 flex flex-col justify-end pl-[20px] pb-[76px]"
      >
        {lyrics.slice(0, 4).map((line, index) => (
          <span key={index} className="inline-block max-w-[calc(100%-40px)]">
            <span
              className="bg-white px-[4px] font-light tracking-[-0.01em] whitespace-nowrap inline-block"
              style={{ fontSize }}
            >
              {line}
            </span>
          </span>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        <div className="w-full h-[1.5px] bg-white" />

        <div className="w-full h-[58px] bg-black flex items-center justify-between">
          <span
            className={`text-white font-normal uppercase whitescape-nowrap pl-[20px] leading-none ${`{artist}, “${title}”`.length > 30 ? "text-[12px] tracking-[0]" : "text-[12.5px] tracking-[0.025em]"}`}
          >
            {artist}, “{title}”
          </span>

          <img
            src="/icons/genius-logo.svg"
            alt="logo"
            className="h-[12px] pr-[20px]"
          />
        </div>
      </div>
    </div>
  );
}
