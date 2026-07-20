import Text from "../shared/text/Text";
import type { TimeSlot } from "../../mocks/appointments";

type Variant = "time_slot_minimized" | "time_slot_normal";

export type TimeSlotCardProps = TimeSlot & {
  variant?: Variant;
  className?: string;
};

const timeSlotStyles: Record<Variant, string> = {
  time_slot_minimized: "!min-w-[250px]",
  time_slot_normal:
    "!min-w-[400px] items-center justify-center pb-4 border-1 border-body_border_primary !rounded-[20px]",
};

const timeCardStyles: Record<Variant, string> = {
  time_slot_minimized: "",
  time_slot_normal: "bg-body_background_secondary rounded-[15px] px-4 py-2 !min-w-[100px]",
};

export default function TimeSlotCard({
  date,
  fromTime,
  toTime,
  status,
  variant = "time_slot_minimized",
  className = "",
}: TimeSlotCardProps) {
  return (
    <div
      className={`relative bg-body_background_secondary rounded-[15px] px-4 py-2 ${className} ${timeSlotStyles[variant]}`}
    >

      {
        variant !== "time_slot_minimized" &&  (<div className="absolute right-2 py-1 px-4 rounded-full bg-body_accent_primary/10">
        <Text variant="body_sm" className="text-body_accent_primary capitalize">{status}</Text>
      </div>)

      }
     
      <Text
        variant="body_sm"
        className={`text-body_accent_primary place-self-center ${ variant === "time_slot_minimized" ? "mb-2" : "mb-4"}`}
      >
        {new Date(date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </Text>

      <div className="flex items-center justify-between gap-1">
        <Text
          variant="body_lg"
          as="span"
          className={`font-semibold  ${timeCardStyles[variant]}`}
        >
          {variant === "time_slot_minimized" ? (
            ""
          ) : (
            <Text
              variant="body_sm"
              className="text-body_accent_primary font-normal"
            >
              From
            </Text>
          )}
          {new Date(`${date}T${fromTime}`).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </Text>
        <Text variant="body_lg" as="span" className="text-body_text_muted">
          {variant === "time_slot_minimized" ? "  - - -  " : "  - - - - - - - - -  "}
        </Text>
        <Text
          variant="body_lg"
          as="span"
          className={`font-semibold flex flex-col ${timeCardStyles[variant]}`}
        >
          {variant === "time_slot_minimized" ? (
            ""
          ) : (
            <Text
              variant="body_sm"
              className="text-body_accent_primary font-normal"
            >
              To
            </Text>
          )}
          {new Date(`${date}T${toTime}`).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </Text>
      </div>
    </div>
  );
}
