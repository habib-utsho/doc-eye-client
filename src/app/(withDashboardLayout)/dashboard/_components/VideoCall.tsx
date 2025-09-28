"use client";

import { VideoCameraOutlined } from "@ant-design/icons";
import { Button } from "@heroui/button";
import { TDoctor, TPatient, TUserRole } from "@/src/types/user";
import { TAppointment } from "@/src/types/appointment";
import { useRouter } from "next/navigation";

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


  // const roomId = `${appointment._id}-${doctor._id}-${patient._id}-${new Date(
  //   appointment.schedule
  // ).getTime()}`;
  const roomId = `docEye-${doctor.doctorCode}`; // Using doctor ID as room ID for handle all patients of a doctor in one room , patient join by approval only

  const senderInfo = from === "doctor" ? doctor : patient;
  const receiverInfo = from === "doctor" ? patient : doctor;

  return (
    <>
      {/* Outgoing Call Button */}
      {/* <Button
        isIconOnly
        startContent={<VideoCameraOutlined />}
        title="Start Video Call"
        onPress={onOpen}
        className="text-white bg-primary rounded-l-none flex-1"
      /> */}
      <Button
        isIconOnly
        startContent={<VideoCameraOutlined />}
        title="Start Video Call"
        className="text-white bg-primary rounded-l-none flex-1"
        onPress={() =>
          window.open(
            `https://meet.jit.si/${roomId}?config.startWithAudioMuted=true`,
            "_blank" // <- opens in new tab
          )
        }
        // onPress={() =>
        //   router.push(
        //     `/dashboard/livekit?room=${roomId}&role=${from}&name=${senderInfo.name}`
        //   )
        // }
      />

    </>
  );
};

export default VideoCall;
