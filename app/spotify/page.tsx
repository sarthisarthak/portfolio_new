"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

interface Track {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string }>;
  };
  uri: string;
}

interface SpotifyData {
  topTracks: Track[];
  currentlyPlaying: any;
  timestamp: string;
  error?: string;
}

export default function SpotifyPage() {
  const { data: session, status } = useSession();
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSpotifyData = async () => {
    if (!session) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/spotify");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch data");
      }

      setSpotifyData(data);
    } catch (error) {
      console.error("Error fetching Spotify data");
      setError(error instanceof Error ? error.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handlePause = async () => {
    try {
      const response = await fetch("/api/spotify/pause", { method: "POST" });
      if (!response.ok) {
        throw new Error("Failed to pause");
      }
      fetchSpotifyData();
    } catch (error) {
      console.error("Error pausing");
      setError("Failed to pause playback");
    }
  };

  const handlePlay = async (trackUri?: string) => {
    try {
      const response = await fetch("/api/spotify/play", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackUri }),
      });
      if (!response.ok) {
        throw new Error("Failed to play");
      }
      fetchSpotifyData();
    } catch (error) {
      console.error("Error playing");
      setError("Failed to start playback");
    }
  };

  useEffect(() => {
    if (session) {
      fetchSpotifyData();
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Spotify Integration</h1>
          <button
            onClick={() => signIn("spotify", { callbackUrl: "/spotify" })}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
          >
            Sign in with Spotify
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Spotify Dashboard</h1>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">Loading Spotify data...</div>
        ) : spotifyData ? (
          <div className="space-y-8">
            {/* Currently Playing */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Currently Playing</h2>
              {spotifyData.currentlyPlaying &&
              spotifyData.currentlyPlaying.item ? (
                <div className="flex items-center space-x-4">
                  <img
                    src={
                      spotifyData.currentlyPlaying.item.album.images[0]?.url ||
                      "/placeholder-album.png"
                    }
                    alt={spotifyData.currentlyPlaying.item.name}
                    className="w-16 h-16 rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {spotifyData.currentlyPlaying.item.name}
                    </h3>
                    <p className="text-gray-600">
                      {spotifyData.currentlyPlaying.item.artists
                        .map((artist: any) => artist.name)
                        .join(", ")}
                    </p>
                  </div>
                  <button
                    onClick={handlePause}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Pause
                  </button>
                </div>
              ) : (
                <p>No song currently playing</p>
              )}
            </div>

            {/* Top Tracks */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Top 10 Tracks</h2>
              <div className="grid gap-4">
                {spotifyData.topTracks && spotifyData.topTracks.length > 0 ? (
                  spotifyData.topTracks.map((track, index) => (
                    <div
                      key={track.id}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <span className="font-bold text-lg w-6">{index + 1}</span>
                      <img
                        src={
                          track.album.images[0]?.url || "/placeholder-album.png"
                        }
                        alt={track.name}
                        className="w-12 h-12 rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{track.name}</h3>
                        <p className="text-gray-600">
                          {track.artists
                            .map((artist) => artist.name)
                            .join(", ")}
                        </p>
                      </div>
                      <button
                        onClick={() => handlePlay(track.uri)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      >
                        Play
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No top tracks available</p>
                )}
              </div>
            </div>

            {spotifyData.timestamp && (
              <div className="text-sm text-gray-500 text-center">
                Last updated: {new Date(spotifyData.timestamp).toLocaleString()}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <button
              onClick={fetchSpotifyData}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Load Spotify Data
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
