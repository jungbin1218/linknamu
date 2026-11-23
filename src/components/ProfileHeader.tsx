import Image from "next/image";
import type { Profile } from "@/data/profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center text-center">
      <Image
        src={profile.image}
        alt={`${profile.name} 프로필 사진`}
        width={128}
        height={128}
        priority
        unoptimized
        className="h-28 w-28 rounded-full border-2 border-neutral-900 object-cover sm:h-32 sm:w-32 dark:border-neutral-100"
      />
      <h1 className="mt-4 text-lg font-semibold">{profile.name}</h1>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{profile.bio}</p>
    </header>
  );
}
