"use client";

import { useEffect, useState } from "react";

function decode(value: string) {
  const bytes = Uint8Array.from(atob(value), (c) => c.charCodeAt(0)).reverse();
  return new TextDecoder().decode(bytes);
}

type Props = { value: string; mail?: boolean; label?: string; className?: string };

export function Protected({ value, mail, label, className }: Props) {
  const [text, setText] = useState<string | null>(null);
  useEffect(() => setText(decode(value)), [value]);

  if (!text) return <span className={className}>…</span>;
  if (mail) {
    return (
      <a href={`mailto:${text}`} className={className}>
        {label ?? text}
      </a>
    );
  }
  return <span className={className}>{text}</span>;
}
