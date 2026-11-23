// 프로필과 링크 목록을 여기서 수정하세요.
// 지금은 더미값입니다. 실제 내용으로 바꿔 주세요.

export type LinkItem = {
  /** 클릭 수 집계에 쓰이는 고유 ID (바꾸면 기존 집계와 연결이 끊깁니다) */
  id: string;
  title: string;
  url: string;
  /** 카드 왼쪽에 표시할 이모지 */
  icon?: string;
  description?: string;
};

export type Profile = {
  name: string;
  bio: string;
  /** public/ 폴더 기준 경로 또는 외부 이미지 URL */
  image: string;
};

export const profile: Profile = {
  name: "이름",
  bio: "한 줄 소개가 들어갈 자리입니다",
  image: "/profile.svg",
};

export const links: LinkItem[] = [
  { id: "link-1", title: "링크 1", url: "https://example.com/" },
  { id: "link-2", title: "링크 2", url: "https://example.com/" },
  { id: "link-3", title: "링크 3", url: "https://example.com/" },
];
