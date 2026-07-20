import Link from "../clickables/Link";
import type { LinkProps } from "../clickables/Link";
import Text from "../text/Text";

export type LinksListProps = {
  title?: string;
  data: LinkProps[];
  direction?: "vertical" | "horizontal";
  transition?: boolean;
};

export default function LinksList({ title, data, direction, transition }: LinksListProps) {
  return (
    <div className="flex flex-col gap-2">
      {title && (
        <Text
          variant="body_xl"
          as="h3"
          className="font-display font-semibold"
        >
          {title}
        </Text>
      )}

      <ul
        className={`flex ${direction === "horizontal" ? "flex-row gap-4" : "flex-col gap-1"} `}
      >
        {data.map((link, index) => (
          <li key={index}>
            <Link transition={transition} href={link.href}>{link.children}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
