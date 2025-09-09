"use client";

import { useEffect, useRef, useState } from "react";
import { VideoCameraOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button } from "@heroui/button";
import { Modal, ModalContent, useDisclosure } from "@heroui/modal";
import { TDoctor, TPatient, TUserRole } from "@/src/types/user";
import { TAppointment } from "@/src/types/appointment";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// WebRTC ICE server configuration
const iceServers = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

const VideoCall = ({
  from,
  appointment,
  doctor,
  patient,
}: {
  from: TUserRole;
  appointment: TAppointment;
  doctor: TDoctor;
  patient: TPatient;
}) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const socketRef = useRef<Socket | null>(null);

  const router = useRouter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isCalling, setIsCalling] = useState(false);
  const [incomingCaller, setIncomingCaller] = useState<any>(null);

  // const roomId = `${appointment._id}-${doctor._id}-${patient._id}-${new Date(
  //   appointment.schedule
  // ).getTime()}`;
  const roomId = doctor._id; // Using doctor ID as room ID for handle all patients of a doctor in one room , patient join by approval only

  const senderInfo = from === "doctor" ? doctor : patient;
  const receiverInfo = from === "doctor" ? patient : doctor;

  // Initialize socket
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_BASE_URL!, {
      transports: ["websocket"],
    });
    socketRef.current = socket;
    socket.emit("join_room", roomId);

    // Incoming call request (before offer)
    socket.on("call-request", ({ fromUser }) => {
      setIncomingCaller(fromUser); // Show incoming call popup
    });

    // WebRTC offer
    socket.on("video-offer", async (offer) => {
      const peer = createPeer();
      await peer.setRemoteDescription(new RTCSessionDescription(offer));

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localVideoRef.current!.srcObject = stream;
      stream.getTracks().forEach((track) => peer.addTrack(track, stream));
      localStreamRef.current = stream;

      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);
      socket.emit("video-answer", { roomId, answer });

      setIsCalling(true);
      onOpen(); // open modal
    });

    // WebRTC answer
    socket.on("video-answer", async (answer) => {
      await peerRef.current?.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    });

    // ICE Candidate
    socket.on("ice-candidate", (candidate) => {
      peerRef.current?.addIceCandidate(new RTCIceCandidate(candidate));
    });

    // Call rejected
    socket.on("call-rejected", () => {
      toast.error("❌ Call was declined");
      endCall();
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [roomId]);

  const createPeer = () => {
    const peer = new RTCPeerConnection(iceServers);
    peerRef.current = peer;

    peer.onicecandidate = (event) => {
      if (event.candidate && socketRef.current) {
        socketRef.current.emit("ice-candidate", {
          roomId,
          candidate: event.candidate,
        });
      }
    };

    peer.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    return peer;
  };

  // Start call
  const startCall = async () => {
    setIsCalling(true);
    onOpen();

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localVideoRef.current!.srcObject = stream;
    localStreamRef.current = stream;

    const peer = createPeer();
    stream.getTracks().forEach((track) => peer.addTrack(track, stream));

    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);

    socketRef.current?.emit("call-request", {
      roomId,
      fromUser: senderInfo,
    });

    // Send offer after slight delay
    setTimeout(() => {
      socketRef.current?.emit("video-offer", {
        roomId,
        offer,
      });
    }, 500);
  };

  // End call
  const endCall = () => {
    peerRef.current?.close();
    peerRef.current = null;

    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

    setIncomingCaller(null);
    setIsCalling(false);
    onOpenChange();
  };

  // Reject call
  const rejectCall = () => {
    socketRef.current?.emit("call-rejected", { roomId });
    setIncomingCaller(null);
  };

  return (
    <>
      {/* Outgoing Call Button */}
      {/* <Button
        isIconOnly
        startContent={<VideoCameraOutlined />}
        title="Start Video Call"
        onPress={startCall}
        className="text-white bg-primary rounded-l-none flex-1"
      /> */}
      <Button
        isIconOnly
        startContent={<VideoCameraOutlined />}
        title="Start Video Call"
        className="text-white bg-primary rounded-l-none flex-1"
        onPress={() =>
          router.push(
            `/dashboard/livekit?room=${roomId}&role=${from}&name=${senderInfo.name}`
          )
        }
      />

      {/* Incoming call popup */}
      {incomingCaller && !isCalling && (
        <div className="fixed inset-0  bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white shadow p-6 rounded-md text-center max-w-md">
            <Image
              src={incomingCaller?.profileImg}
              alt={incomingCaller?.name}
              width={80}
              height={80}
              className="rounded-full mx-auto mb-4 h-[80px] w-[80px]"
            />
            <p className="font-semibold text-sm mb-2">
              <span className="animate-ping">📞</span> Incoming call from{" "}
              <strong className="text-primary">{incomingCaller.name} </strong>
            </p>
            <div className="flex gap-2 justify-center">
              <Button
                color="success"
                className="text-white"
                onPress={() => {
                  setIsCalling(true);
                  onOpen();
                  setIncomingCaller(null);
                }}
              >
                Accept
              </Button>
              <Button
                color="danger"
                className="text-white"
                onPress={rejectCall}
              >
                Decline
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={(open) => {
          onOpenChange(open);
          if (!open) endCall();
        }}
        size="lg"
        className={`!max-w-3xl`}
        backdrop="opaque"
        classNames={{
          backdrop: "bg-black bg-opacity-60",
        }}
      >
        <ModalContent className="p-4">
          {(onClose) => (
            <>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">
                  Video Call with{" "}
                  {from === "doctor"
                    ? receiverInfo.name
                    : `${doctor.doctorTitle} ${receiverInfo.name}`}
                </h3>
                <Button
                  onPress={() => {
                    endCall();
                    onClose();
                  }}
                  color="danger"
                  startContent={<PhoneOutlined />}
                  className="text-white"
                >
                  End Call
                </Button>
              </div>
              <div className="flex justify-between gap-4">
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  className="w-1/2 rounded border"
                />
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  className="w-1/2 rounded border"
                />
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default VideoCall;
