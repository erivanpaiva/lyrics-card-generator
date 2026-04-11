import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "Parameter url is required" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const html = await response.text();
    const $ = cheerio.load(html);

    const containers = $('[data-lyrics-container="true"]');

    let lyrics = "";

    containers.each((_, el) => {
      $(el).find('[data-exclude-from-selection="true"]').remove();
      $(el).find("br").replaceWith("\n");
      lyrics += $(el).text().trim() + "\n\n";
    });

    return NextResponse.json({ lyrics: lyrics.trim() });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch lyrics" },
      { status: 500 },
    );
  }
}
