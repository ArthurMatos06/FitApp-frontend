"use client";

import Image from "next/image";

const YOUTUBE_ID_PATTERN =
  /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/;

export function getYouTubeId(url: string): string | null {
  return url.match(YOUTUBE_ID_PATTERN)?.[1] ?? null;
}

type ChatVideoLinkProps = {
  href: string;
};

export function ChatVideoLink({ href }: ChatVideoLinkProps) {
  const videoId = getYouTubeId(href);
  if (!videoId) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block aspect-video w-full overflow-hidden rounded-lg"
    >
      <Image
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt="Thumbnail do vídeo do YouTube"
        fill
        sizes="(max-width: 500px) 90vw, 400px"
        className="object-cover"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 68 48" className="size-12" aria-hidden="true">
          <path
            d="M66.52 7.74a8 8 0 0 0-5.66-5.66C55.8.8 34 .8 34 .8s-21.8 0-26.86 1.28a8 8 0 0 0-5.66 5.66C.14 12.8.14 24 .14 24s0 11.2 1.34 16.26a8 8 0 0 0 5.66 5.66C12.2 47.2 34 47.2 34 47.2s21.8 0 26.86-1.28a8 8 0 0 0 5.66-5.66C67.86 35.2 67.86 24 67.86 24s0-11.2-1.34-16.26z"
            fill="#f00"
          />
          <path d="M27.2 34.4V13.6L45.2 24z" fill="#fff" />
        </svg>
      </span>
    </a>
  );
}
