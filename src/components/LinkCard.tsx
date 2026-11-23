"use client";

import { useState } from "react";
import type { LinkItem } from "@/data/profile";

export default function LinkCard({
  link,
  initialCount,
}: {
  link: LinkItem;
  initialCount: number;
}) {
  const [count, setCount] = useState(initialCount);

  function handleClick() {
    setCount((c) => c + 1);
    // 새 탭으로 이동해도 요청이 끊기지 않도록 keepalive를 사용합니다.
    fetch("/api/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: link.id }),
      keepalive: true,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { count?: number } | null) => {
        if (typeof data?.count === "number") setCount(data.count);
      })
      .catch(() => {});
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="group relative flex min-h-[3.5rem] items-center gap-4 rounded-xl border-2 border-neutral-900 bg-white px-5 py-3 transition hover:-translate-y-0.5 hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:border-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800"
    >
      {link.icon && (
        <span className="text-2xl" aria-hidden>
          {link.icon}
        </span>
      )}
      <span className="min-w-0 flex-1 text-center">
        <span className="block truncate font-semibold">{link.title}</span>
        {link.description && (
          <span className="block truncate text-sm text-neutral-500 dark:text-neutral-400">
            {link.description}
          </span>
        )}
      </span>
      <span
        className="shrink-0 rounded-full bg-neutral-100 px-2.5 py-1 text-xs tabular-nums text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
        title="클릭 수"
      >
        {count.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
