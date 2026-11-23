import { NextResponse } from "next/server";
import { links } from "@/data/profile";
import { incrementClick } from "@/lib/clicks";

const validIds = new Set(links.map((l) => l.id));

export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = await request.json());
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  if (typeof id !== "string" || !validIds.has(id)) {
    return NextResponse.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  try {
    const count = await incrementClick(id);
    return NextResponse.json({ id, count });
  } catch (err) {
    console.error("[clicks] 클릭 수 저장 실패:", err);
    return NextResponse.json({ error: "저장에 실패했습니다." }, { status: 500 });
  }
}
