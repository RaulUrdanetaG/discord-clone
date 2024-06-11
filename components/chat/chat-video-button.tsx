"use client";

import qs from "query-string";
import { ActionTooltip } from "../action-tooltip";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { VideoOff, Video } from "lucide-react";

export default function ChatVideoButton() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isVideo = searchParams?.get("video");

  const Icon = isVideo ? VideoOff : Video;
  const tooltipLabel = isVideo ? "End call" : "Start call";

  function onClick() {
    const url = qs.stringifyUrl(
      {
        url: pathname || "",
        query: {
          video: isVideo ? undefined : true,
        },
      },
      { skipNull: true }
    );

    router.push(url);
  }

  return (
    <ActionTooltip side="bottom" label={tooltipLabel}>
      <button onClick={onClick} className="hover:opacity-75 transition mr-4">
        <Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
      </button>
    </ActionTooltip>
  );
}
