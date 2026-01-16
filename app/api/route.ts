import { NextResponse } from "next/server";

// export const dynamic = "force-dynamic";

export async function GET() {
    const amount = 30;
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;

    if (!accessKey) return NextResponse.json({ message: "Missing UNSPLASH_ACCESS_KEY server env var" }, { status: 500 });

    const res = await fetch(`https://api.unsplash.com/photos/random?count=${amount}`, {
        headers: {
            Authorization: `Client-ID ${accessKey}`,
        },
    });

    if (!res.ok) return NextResponse.json({ message: "Failed to fetch images from Unsplash" }, { status: res.status });

    const data = await res.json();
    return NextResponse.json(data);
}
