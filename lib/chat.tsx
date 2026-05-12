// Types, markdown components, and content parser for the chat section.
// Kept in a .tsx file because MD contains JSX component definitions.

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isOpening?: boolean;
  isError?: boolean;
}

export type ApiMessage = { role: 'user' | 'assistant'; content: string };

export interface ContentBlock {
  type: 'markdown' | 'options';
  text?: string;
  items?: string[];
}

// ─── Opening message ──────────────────────────────────────────────────────────

export const OPENING_MESSAGE =
  `Hi — I'm here to help you understand exactly what Lumio could do for your clinic.

You can ask me anything, get your revenue numbers calculated, or I can build you a personalised automation blueprint right now.

What's your biggest headache at the moment?`;

// ─── Markdown component map ───────────────────────────────────────────────────

export const MD: Record<string, React.ComponentType<{ children?: React.ReactNode }>> = {
  p: ({ children }) => (
    <p className="mb-3 last:mb-0 text-sm leading-7 text-[#FFFDF8]/85">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-bold text-[#E8B44B]">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-[#FFFDF8]/70">{children}</em>,
  ul: ({ children }) => <ul className="mt-2 mb-3 space-y-1.5 list-none">{children}</ul>,
  ol: ({ children }) => <ol className="mt-2 mb-3 space-y-2 list-none">{children}</ol>,
  li: ({ children }) => (
    <li className="flex items-start gap-2 text-sm leading-6 text-[#FFFDF8]/75">
      <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#C4973F] flex-shrink-0" />
      <span>{children}</span>
    </li>
  ),
  h3: ({ children }) => (
    <h3 className="font-display font-bold text-lg text-[#FFFDF8] mb-2 mt-4 first:mt-0">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="font-semibold text-[#C4973F] text-xs uppercase tracking-widest mb-2 mt-3 first:mt-0">{children}</h4>
  ),
  hr: () => <hr className="border-white/10 my-4" />,
  code: ({ children }) => (
    <code className="bg-white/10 rounded px-1.5 py-0.5 text-xs text-[#E8B44B]">{children}</code>
  ),
};

// ─── Content parser ───────────────────────────────────────────────────────────
// Splits a markdown string into text blocks and tappable option groups.
// A list of 3–6 short items (≤8 words each) following a '?' is extracted
// as an 'options' block instead of a standard bullet list.

export function parseContent(content: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  const lines = content.split('\n');
  const mdBuf: string[] = [];
  const listBuf: string[] = [];
  let prevHadQuestion = false;

  const flush = () => {
    if (!listBuf.length) return;
    const items = listBuf.map(s => s.replace(/\*\*/g, '').replace(/\*/g, '').trim()).filter(Boolean);
    const allShort = items.every(s => s.split(/\s+/).length <= 8);
    const isOptions = items.length >= 3 && items.length <= 6 && allShort && prevHadQuestion;
    if (isOptions) {
      const text = mdBuf.join('\n').trimEnd();
      if (text) blocks.push({ type: 'markdown', text });
      mdBuf.length = 0;
      blocks.push({ type: 'options', items });
    } else {
      listBuf.forEach(item => mdBuf.push(`- ${item}`));
    }
    listBuf.length = 0;
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (/^[-*]\s+/.test(trimmed)) {
      listBuf.push(trimmed.replace(/^[-*]\s+/, ''));
    } else {
      flush();
      mdBuf.push(line);
      if (trimmed) prevHadQuestion = trimmed.includes('?');
    }
  }
  flush();

  const remaining = mdBuf.join('\n').trim();
  if (remaining) blocks.push({ type: 'markdown', text: remaining });
  return blocks;
}
