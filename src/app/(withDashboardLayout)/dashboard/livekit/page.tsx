"use client";

import {
  ControlBar,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  RoomContext,
  useParticipants,
  useTracks,
  MicIcon,
  MicDisabledIcon,
} from "@livekit/components-react";
import { Room, Track } from "livekit-client";
import "@livekit/components-styles";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@heroui/button";

export default function RoomPage() {
  const params = useSearchParams();
  const role = params?.get("role")?.trim();
  const name = params?.get("name") ?? "User";
  const room = params?.get("room") ?? "quickstart-room";
  const isDoctor = role === "doctor";

  const [roomInstance] = useState(
    () => new Room({ adaptiveStream: true, dynacast: true })
  );
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        if (isDoctor) {
          // ➕ Doctor connects immediately with publish permissions
          const res = await fetch(
            `/api/token?room=${room}&username=${name}&role=doctor`
          );
          const data = await res.json();
          if (!data.token) throw new Error("No token");

          await roomInstance.connect(
            process.env.NEXT_PUBLIC_LIVEKIT_URL!,
            data.token
          );
          await roomInstance.localParticipant.setCameraEnabled(true);
          await roomInstance.localParticipant.setMicrophoneEnabled(true);
          setConnected(true);
          setLoading(false);
        } else {
          // ➕ Patient sends request first
          await fetch("/api/join-request", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ room, username: name }),
          });

          // 🌀 Polling for approval...
          const interval = setInterval(async () => {
            const check = await fetch("/api/check-approved", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ room, username: name }),
            });

            const { approved } = await check.json();

            if (approved) {
              clearInterval(interval);

              // Get full token
              const tRes = await fetch(
                `/api/token?room=${room}&username=${name}&role=patient`
              );
              const tData = await tRes.json();
              if (!tData.token) return;

              await roomInstance.connect(
                process.env.NEXT_PUBLIC_LIVEKIT_URL!,
                tData.token
              );
              await roomInstance.localParticipant.setCameraEnabled(true);
              await roomInstance.localParticipant.setMicrophoneEnabled(true);
              setConnected(true);
              setLoading(false);
            }
          }, 3000);
        }
      } catch (error) {
        console.error("Room connection error:", error);
      }
    };

    init();
    return () => {
      roomInstance.disconnect();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        {isDoctor
          ? "Doctor: Joining room..."
          : "Patient: Waiting for doctor approval..."}
      </div>
    );
  }

  return (
    <RoomContext.Provider value={roomInstance}>
      <div data-lk-theme="default" style={{ height: "100dvh" }}>
        <VideoConference isDoctor={isDoctor} room={room} />
        <RoomAudioRenderer />
        <ControlBar />
      </div>
    </RoomContext.Provider>
  );
}

function VideoConference({
  isDoctor,
  room,
}: {
  isDoctor: boolean;
  room: string;
}) {
  const participants = useParticipants();
  const [waitingList, setWaitingList] = useState<string[]>([]);

  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );

  // ↩️ For doctor: fetch actual waiting list from backend every few seconds
  useEffect(() => {
    if (!isDoctor) return;

    const fetchWaiters = async () => {
      const res = await fetch(`/api/join-request?room=${room}`);
      const data = await res.json();
      setWaitingList(data.usernames || []);
    };

    const interval = setInterval(fetchWaiters, 4000);
    fetchWaiters();
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {isDoctor && waitingList.length > 0 && (
        <div className="bg-white text-black shadow rounded p-4 my-2 mx-4">
          <h3 className="font-bold text-lg mb-2">👥 Waiting Patients</h3>
          {waitingList.map((p, i) => (
            <div
              key={i}
              className="flex justify-between items-center border-b py-2"
            >
              <span className="font-semibold">{p}</span>
              <Button
                color="success"
                onPress={async () => {
                  const res = await fetch("/api/approve", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ room, username: p }),
                  });
                  if (res.ok) alert("✅ Approved");
                  else alert("❌ Approval failed");
                }}
              >
                ✅ Approve
              </Button>
            </div>
          ))}
        </div>
      )}

      {participants.length > 0 && (
        <div className="bg-white text-black shadow rounded p-4 my-2 mx-4">
          <h3 className="font-bold mb-2">👥 Participants</h3>
          <div className="flex flex-wrap gap-3 bg-primary text-white p-3 rounded-lg">
            {participants.map((p) => (
              <div
                key={p.identity}
                className="p-2 flex gap-2 items-center border-r pr-3"
              >
                <span className="font-semibold">{p.name || p.identity}</span>
                {p.isMicrophoneEnabled ? <MicIcon /> : <MicDisabledIcon />}
              </div>
            ))}
          </div>
        </div>
      )}

      <GridLayout
        tracks={tracks}
        style={{
          height: "calc(100vh - var(--lk-control-bar-height) - 100px)",
        }}
      >
        <ParticipantTile />
      </GridLayout>
    </>
  );
}
