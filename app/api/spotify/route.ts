import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const accessToken = session.accessToken as string;

  try {
    const [topTracksRes, currentlyPlayingRes] = await Promise.all([
      fetch(
        "https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=long_term",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ),
      fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    ]);

    if (!topTracksRes.ok) {
      const error = await topTracksRes.json();
      console.error("Top Tracks API error:", error);
      throw new Error("Failed to fetch top tracks");
    }

    const topTracks = await topTracksRes.json();

    let currentlyPlaying = null;
    if (currentlyPlayingRes.status !== 204) {
      if (!currentlyPlayingRes.ok) {
        const error = await currentlyPlayingRes.json();
        console.error("Currently Playing API error:", error);
        throw new Error("Failed to fetch currently playing track");
      }
      currentlyPlaying = await currentlyPlayingRes.json();
    }

    return NextResponse.json({
      topTracks: topTracks?.items || [],
      currentlyPlaying,
      timestamp: new Date().toISOString(),
      debug: {
        topTracksCount: topTracks?.items?.length || 0,
        hasCurrentlyPlaying: !!currentlyPlaying,
      },
    });
  } catch (error) {
    console.error("Spotify API error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
