import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import ThemeToggle from "@/components/ThemeToggle";
import { links, profile } from "@/data/profile";
import { getClickCounts } from "@/lib/clicks";

// 클릭 수를 매 요청마다 최신으로 보여주기 위해 동적 렌더링합니다.
export const dynamic = "force-dynamic";

export default async function Home() {
  const counts = await getClickCounts(links.map((l) => l.id));

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-12 pt-6 sm:pt-12">
      <div className="flex justify-end">
        <ThemeToggle />
      </div>

      <ProfileHeader profile={profile} />

      {/* 와이어프레임의 큰 둥근 박스: 링크 카드들을 감싸는 패널 */}
      <section
        aria-label="링크 목록"
        className="mt-6 rounded-3xl border-2 border-neutral-900 bg-white p-5 dark:border-neutral-100 dark:bg-neutral-900"
      >
        <ul className="flex flex-col gap-5">
          {links.map((link) => (
            <li key={link.id}>
              <LinkCard link={link} initialCount={counts[link.id] ?? 0} />
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-auto pt-12 text-center text-xs text-neutral-400 dark:text-neutral-500">
        🌳 링크나무
      </footer>
    </main>
  );
}
