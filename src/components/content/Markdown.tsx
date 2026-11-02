import Link from "next/link";

function renderInline(text: string, keyPrefix: string) {
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(pattern).filter(Boolean);
  return parts.map((part, index) => {
    const key = `${keyPrefix}-${index}`;
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      const safe = href.startsWith("/") || href.startsWith("https://") || href.startsWith("http://");
      if (!safe) return <span key={key}>{label}</span>;
      if (href.startsWith("/")) return <Link key={key} href={href}>{label}</Link>;
      return (
        <a key={key} href={href} rel="noreferrer">
          {label}
        </a>
      );
    }
    return <span key={key}>{part}</span>;
  });
}

export function Markdown({ source }: { source: string }) {
  const blocks = source.trim().split(/\n{2,}/);
  return (
    <div className="prose-editorial space-y-5">
      {blocks.map((block, index) => {
        const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
        if (lines.length && lines.every((line) => line.startsWith("- "))) {
          return (
            <ul key={index}>
              {lines.map((line) => (
                <li key={line}>{renderInline(line.slice(2), `${index}-${line}`)}</li>
              ))}
            </ul>
          );
        }
        if (block.startsWith("### ")) {
          return <h3 key={index}>{renderInline(block.slice(4), `h3-${index}`)}</h3>;
        }
        if (block.startsWith("## ")) {
          return <h2 key={index}>{renderInline(block.slice(3), `h2-${index}`)}</h2>;
        }
        return <p key={index}>{renderInline(block.replaceAll("\n", " "), `p-${index}`)}</p>;
      })}
    </div>
  );
}
