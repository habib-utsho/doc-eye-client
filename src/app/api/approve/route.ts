import { AccessToken } from "livekit-server-sdk";
(globalThis as any).approvedPatients ??= {};

export async function POST(req: Request) {
    const { room, username } = await req.json();

    const key = process.env.NEXT_PUBLIC_LIVEKIT_API_KEY!;
    const secret = process.env.NEXT_PUBLIC_LIVEKIT_API_SECRET!;

    const at = new AccessToken(key, secret, {
        identity: username,
        name: username,
    });

    at.addGrant({
        roomJoin: true,
        room,
        canSubscribe: true,
        canPublish: true,
    });

    const token = await at.toJwt();

    // ✅ Store approved token
    if (!(globalThis as any).approvedPatients[room]) {
        (globalThis as any).approvedPatients[room] = {};
    }
    (globalThis as any).approvedPatients[room][username] = token;

    // ✅ Remove from waiting list
    const waiting = (globalThis as any).waitingPatients?.[room];
    if (waiting) waiting.delete(username);

    return Response.json({ message: "Approved" });
}