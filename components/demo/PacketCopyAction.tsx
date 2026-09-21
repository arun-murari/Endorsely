"use client";

import { CopyButton } from "@/components/ui/CopyButton";
import { serialisePacket } from "@/lib/data/evidencePacket";

/**
 * The only working action on the packet: copy the sample text to the clipboard.
 * There is no file export, no submission, and nothing leaves the browser.
 */
export function PacketCopyAction() {
  return <CopyButton text={() => serialisePacket()} label="Copy the sample packet" />;
}
