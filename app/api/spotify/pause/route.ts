import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const res = await fetch("https://api.spotify.com/v1/me/player/pause", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (!res.ok) {
      const errData = await res.json();
      console.error("Spotify API error response:", errData);
      throw new Error(errData.error?.message || "Spotify API error");
    }

    return NextResponse.json({ message: "Playback paused" });
  } catch (error) {
    // console.error("Pause error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to pause playback",
      },
      { status: 500 }
    );
  }
}
