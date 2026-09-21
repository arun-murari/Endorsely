import { PacketCopyAction } from "@/components/demo/PacketCopyAction";
import { ClaimLabel, StatusChip } from "@/components/ui/Chip";
import { FieldRow } from "@/components/ui/DataRow";
import { Bracketed } from "@/components/ui/Marks";
import { evidencePacket, packetDisclosure } from "@/lib/data/evidencePacket";

/**
 * The sample evidence packet, shared by /demo and /schools so both surfaces read
 * from one component and can never drift apart.
 *
 * Status chips are deliberately restricted to the four fields where the
 * provided/needed distinction changes how a reviewer should read the line:
 * identity, compensation, payment and disclosure. Everything else is provided
 * information, recorded as supplied.
 */
const CHIPPED_FIELD = /identity|compensation|payment|disclosure/i;

export function EvidencePacket({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Bracketed accent className="bg-paper p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <p className="mono-label text-ink-2">How to read this packet</p>
          <ClaimLabel kind="sample" />
        </div>
        <p className="measure mt-4 text-[0.9375rem] leading-relaxed text-ink">
          Every line below was <strong className="font-semibold">provided</strong>{" "}
          by the merchant or the athlete during planning. None of it has been
          independently checked. {packetDisclosure}
        </p>
        <p className="measure mt-3 text-[0.875rem] leading-relaxed text-neutral-600">
          To keep that distinction legible, a status chip appears only on the
          identity, compensation, payment and disclosure fields. Every other field
          is provided information, recorded as supplied.
        </p>
      </Bracketed>

      {evidencePacket.map((group) => (
        <section
          key={group.id}
          aria-labelledby={`packet-group-${group.id}`}
          className="mt-12"
        >
          <div className="flex items-baseline gap-4 border-b-2 border-ink/25 pb-2">
            <span
              className="font-mono text-sm tabular-nums text-neutral-500"
              aria-hidden
            >
              {group.number}
            </span>
            <h3
              id={`packet-group-${group.id}`}
              className="display-tight text-[1.2rem] sm:text-[1.35rem]"
            >
              {group.title}
            </h3>
          </div>
          <p className="measure mt-3 text-[0.875rem] leading-relaxed text-neutral-600">
            {group.purpose}
          </p>
          <dl className="mt-4">
            {group.fields.map((field) => (
              <FieldRow
                key={field.label}
                label={field.label}
                value={field.value}
                note={field.note}
                meta={
                  CHIPPED_FIELD.test(field.label) ? (
                    <StatusChip status={field.status} />
                  ) : undefined
                }
              />
            ))}
          </dl>
        </section>
      ))}

      <div className="mt-12 grid gap-5 border-t-2 border-ink/25 pt-6 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-10">
        <PacketCopyAction />
        <p className="measure text-[0.8125rem] leading-snug text-neutral-600">
          A copied sample packet is not an official integration, and it has not
          been accepted as an institutional filing by any school. It is plain text
          assembled in your browser from the sample campaign on this site.
        </p>
      </div>
    </div>
  );
}
