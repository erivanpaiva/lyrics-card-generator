import { NextRequest, NextResponse } from "next/server";
import Genius from "genius-lyrics";

const client = new Genius.Client(process.env.GENIUS_ACCESS_TOKEN);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 },
    );
  }

  try {
    const results = await client.songs.search(q);

    const songs = results
      .filter((song) => !song.artist.name.toLowerCase().includes("genius"))
      .slice(0, 8)
      .map((song) => ({
        id: song.id,
        title: song.title,
        artist: song.artist.name,
        cover: song.image,
        artistImage: song.artist.image,
        url: song.url,
      }));

    return NextResponse.json({ songs });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch search results" },
      { status: 500 },
    );
  }
}
