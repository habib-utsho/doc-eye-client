(globalThis as any).waitingPatients ??= {};

export async function POST(req: Request) {
    const { room, username } = await req.json();
    if (!room || !username) return Response.json({ error: "Bad request" }, { status: 400 });

    const list = (globalThis as any).waitingPatients;
    if (!list[room]) list[room] = new Set();
    list[room].add(username);

    return Response.json({ status: "waiting" });
}

export async function GET(req: Request) {
    const room = new URL(req.url).searchParams.get("room");
    const list = (globalThis as any).waitingPatients;
    return Response.json({ usernames: Array.from(list[room] || []) });
}