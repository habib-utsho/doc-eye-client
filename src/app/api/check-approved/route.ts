export async function POST(req: Request) {
    const { room, username } = await req.json();
    const cache = (globalThis as any).approvedPatients;

    if (cache?.[room]?.[username]) {
        return Response.json({ approved: true });
    }

    return Response.json({ approved: false });
}