import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const { trackUri } = await request.json();

    const res = await fetch("https://api.spotify.com/v1/me/player/play", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: [trackUri],
      }),
    });

    if (!res.ok) {
      const errData = await res.json();
      console.error("Spotify API error response:", errData);
      throw new Error(errData.error?.message || "Spotify API error");
    }

    return NextResponse.json({ message: "Playback started" });
  } catch (error) {
    console.error("Play error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to start playback",
      },
      { status: 500 }
    );
  }
}
