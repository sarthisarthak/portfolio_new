"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Music, Play, User, LogOut, Home } from "lucide-react";
import Link from "next/link";

interface Artist {
  name: string;
}

interface Album {
  name: string;
}

interface Track {
  id: string;
  name: string;
  uri: string;
  artists: Artist[];
  album: Album;
}

interface CurrentlyPlayingResponse {
  item: Track | null;
}

export default function SpotifyPage() {
  const { data: session, status } = useSession();
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] =
    useState<CurrentlyPlayingResponse | null>(null);

  // Fix for dark mode consistency
  useEffect(() => {
    // Store the current dark mode state
    const wasDarkMode = document.documentElement.classList.contains("dark");

    // Remove dark class to ensure consistent styling on Spotify page
    document.documentElement.classList.remove("dark");

    // Cleanup function to restore dark mode state when leaving the page
    return () => {
      if (wasDarkMode) {
        document.documentElement.classList.add("dark");
      }
    };
  }, []);

  useEffect(() => {
    if (session) {
      fetchTopTracks();
      fetchCurrentTrack();
    }
  }, [session]);

  const fetchTopTracks = async () => {
    try {
      const response = await fetch("/api/spotify/top-tracks");
      const data = await response.json();
      setTopTracks(data.items || []);
    } catch (error) {
      console.error("Error fetching top tracks:", error);
    }
  };

  const fetchCurrentTrack = async () => {
    try {
      const response = await fetch("/api/spotify/currently-playing");
      const data: CurrentlyPlayingResponse = await response.json();
      setCurrentTrack(data);
    } catch (error) {
      console.error("Error fetching current track:", error);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-yellow-300 flex items-center justify-center">
        <div className="bg-white border-4 border-black rounded-2xl p-8 shadow-[8px_8px_0px_0px_#000]">
          <div className="flex items-center gap-3">
            <Music className="w-8 h-8 animate-pulse" />
            <span className="text-2xl font-black">Loading your vibes...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 flex items-center justify-center p-4">
        <div className="bg-white border-4 border-black rounded-3xl p-8 md:p-12 shadow-[12px_12px_0px_0px_#000] max-w-md w-full text-center">
          <div className="mb-6">
            <Music className="w-16 h-16 mx-auto mb-4 text-black" />
            <h1 className="text-3xl md:text-4xl font-black mb-3">
              Spotify Vibes
            </h1>
            <p className="text-lg text-gray-700">
              Connect your Spotify to see your music taste
            </p>
          </div>
          <Button
            onClick={() => signIn("spotify")}
            className="w-full bg-green-400 hover:bg-green-500 text-black font-black text-lg py-6 border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            <Music className="w-6 h-6 mr-2" />
            Connect Spotify
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-300 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="bg-white border-4 border-black rounded-3xl p-6 md:p-8 shadow-[8px_8px_0px_0px_#000] mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="bg-blue-400 hover:bg-blue-500 border-3 border-black rounded-xl p-3 shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                <Home className="w-6 h-6 text-black" />
              </Link>
              <div>
                <h1 className="text-3xl md:text-4xl font-black mb-2">
                  Your Music Dashboard
                </h1>
                <p className="text-lg text-gray-700 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Hey {session.user?.name}! 👋
                </p>
              </div>
            </div>
            <Button
              onClick={() => signOut()}
              variant="outline"
              className="bg-red-400 hover:bg-red-500 text-black font-bold border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px]"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </header>

        {/* Currently Playing */}
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-black mb-6 flex items-center gap-3">
            <Play className="w-8 h-8" />
            Now Playing
          </h2>
          {currentTrack && currentTrack.item ? (
            <Card className="bg-gradient-to-r from-purple-400 to-pink-400 border-4 border-black rounded-3xl p-6 md:p-8 shadow-[8px_8px_0px_0px_#000]">
              <div className="bg-white border-3 border-black rounded-2xl p-6 shadow-[4px_4px_0px_0px_#000]">
                <h3 className="text-xl md:text-2xl font-black mb-2 line-clamp-2">
                  {currentTrack.item.name}
                </h3>
                <p className="text-lg text-gray-700 mb-1">
                  by{" "}
                  {currentTrack.item.artists
                    .map((artist) => artist.name)
                    .join(", ")}
                </p>
                <p className="text-gray-600">
                  Album: {currentTrack.item.album.name}
                </p>
              </div>
            </Card>
          ) : (
            <Card className="bg-gray-200 border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_#000] text-center">
              <Music className="w-12 h-12 mx-auto mb-4 text-gray-500" />
              <p className="text-xl font-bold text-gray-600">
                Nothing playing right now
              </p>
              <p className="text-gray-500">Start playing music on Spotify!</p>
            </Card>
          )}
        </section>

        {/* Top Tracks */}
        <section>
          <h2 className="text-2xl md:text-3xl font-black mb-6 flex items-center gap-3">
            🔥 Your Top Tracks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topTracks.map((track, index) => (
              <Card
                key={track.id}
                className="bg-white border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-blue-400 border-3 border-black rounded-xl w-12 h-12 flex items-center justify-center shadow-[3px_3px_0px_0px_#000] group-hover:bg-blue-500 transition-colors">
                    <span className="text-xl font-black">#{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-black mb-1 line-clamp-2">
                      {track.name}
                    </h3>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-700 font-semibold line-clamp-1">
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </p>
                  <p className="text-gray-500 text-sm line-clamp-1">
                    {track.album.name}
                  </p>
                </div>
              </Card>
            ))}
          </div>
          {topTracks.length === 0 && (
            <Card className="bg-gray-100 border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_#000] text-center">
              <Music className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-xl font-bold text-gray-600 mb-2">
                No top tracks yet
              </p>
              <p className="text-gray-500">
                Listen to more music to see your favorites!
              </p>
            </Card>
          )}
        </section>
      </div>
    </div>
  );
}
