'use client';

import { useRef } from 'react';
import { CHAT_PILLS } from '@/lib/data';

interface Props {
  input: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onPill: (message: string) => void;
  loading: boolean;
}

export default function ChatInput({ input, onChange, onSubmit, onPill, loading }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {/* Capability pills */}
      <div className="px-4 md:px-5 pt-2 pb-2 flex gap-2 overflow-x-auto border-t border-white/[0.06] scrollbar-none" style={{ WebkitOverflowScrolling: 'touch' }}>
        {CHAT_PILLS.map(pill => (
          <button
            key={pill.label}
            type="button"
            onClick={() => onPill(pill.message)}
            disabled={loading}
            className="rounded-full border border-white/10 bg-white/[0.05] text-xs text-white/55 px-3.5 hover:border-[#C4973F]/40 hover:text-[#C4973F] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
            style={{ minHeight: '34px', paddingTop: '7px', paddingBottom: '7px', touchAction: 'manipulation' }}
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Input row */}
      <form
        onSubmit={onSubmit}
        className="flex items-center gap-3 border-t border-white/10 bg-white/[0.04] px-4 md:px-5 py-4"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => onChange(e.target.value)}
          placeholder="Ask me anything about your clinic..."
          disabled={loading}
          className="flex-1 min-w-0 bg-white/[0.06] border border-white/15 rounded-full px-5 text-[#FFFDF8] placeholder-white/30 outline-none transition-colors focus:border-[#C4973F]/40 disabled:opacity-50"
          style={{ fontSize: '16px', WebkitTextSizeAdjust: '100%', minHeight: '44px', paddingTop: '10px', paddingBottom: '10px' }}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          aria-label="Send message"
          className="rounded-full bg-[#C4973F] hover:bg-[#E8B44B] flex items-center justify-center shrink-0 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ width: '44px', height: '44px', minWidth: '44px', touchAction: 'manipulation' }}
        >
          <span className="text-[#1A1814] font-bold text-base leading-none">→</span>
        </button>
      </form>
    </>
  );
}
