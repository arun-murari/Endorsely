"use client";

import { useEffect, useRef, useState } from "react";
import { ActionButton } from "@/components/ui/Button";

type CopyState = "idle" | "copied" | "failed";

/**
 * Copy to clipboard with a textarea fallback for browsers or contexts where the
 * async clipboard API is unavailable. Reports real success and real failure —
 * never an optimistic "copied".
 */
export function CopyButton({
  text,
  label = "Copy",
  copiedLabel = "Copied",
  variant = "secondary",
  className = "",
}: {
  text: string | (() => string);
  label?: string;
  copiedLabel?: string;
  variant?: "primary" | "secondary" | "onInk" | "quiet";
  className?: string;
}) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const flash = (next: CopyState) => {
    setState(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 3200);
  };

  const legacyCopy = (value: string): boolean => {
    try {
      const area = document.createElement("textarea");
      area.value = value;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.top = "-1000px";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(area);
      return ok;
    } catch {
      return false;
    }
  };

  const onCopy = async () => {
    const value = typeof text === "function" ? text() : text;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
        flash("copied");
        return;
      }
      flash(legacyCopy(value) ? "copied" : "failed");
    } catch {
      flash(legacyCopy(value) ? "copied" : "failed");
    }
  };

  return (
    <span className={`inline-flex flex-col items-start gap-1 ${className}`}>
      <ActionButton
        type="button"
        onClick={onCopy}
        variant={variant}
        withIcon={state === "copied" ? "check" : "copy"}
      >
        {state === "copied" ? copiedLabel : label}
      </ActionButton>
      <span aria-live="polite" className="mono-label text-neutral-600">
        {state === "copied"
          ? "Copied to clipboard"
          : state === "failed"
            ? "Copy blocked by the browser — select the text and copy manually"
            : "\u00A0"}
      </span>
    </span>
  );
}

/**
 * Client-side file download. Generates the file in the browser: there is no
 * server, no filing, and no integration behind it.
 */
export function DownloadButton({
  filename,
  contents,
  mimeType = "text/markdown;charset=utf-8",
  label = "Download",
  variant = "secondary",
  className = "",
}: {
  filename: string;
  contents: string | (() => string);
  mimeType?: string;
  label?: string;
  variant?: "primary" | "secondary" | "onInk" | "quiet";
  className?: string;
}) {
  const [state, setState] = useState<"idle" | "done" | "failed">("idle");

  const onDownload = () => {
    try {
      const value = typeof contents === "function" ? contents() : contents;
      const blob = new Blob([value], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setState("done");
    } catch {
      setState("failed");
    }
  };

  return (
    <span className={`inline-flex flex-col items-start gap-1 ${className}`}>
      <ActionButton
        type="button"
        onClick={onDownload}
        variant={variant}
        withIcon={state === "done" ? "check" : "download"}
      >
        {label}
      </ActionButton>
      <span aria-live="polite" className="mono-label text-neutral-600">
        {state === "done"
          ? `Generated ${filename} in your browser`
          : state === "failed"
            ? "Download blocked by the browser"
            : "\u00A0"}
      </span>
    </span>
  );
}
