'use client';

import ReactMarkdown from 'react-markdown';
import { Message, MD, parseContent } from '@/lib/chat';
import LumiLens from '@/components/LumiLens';

interface Props {
  messages: Message[];
  isTyping: boolean;
  loading: boolean;
  onOptionSelect: (text: string) => void;
  onRetry: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

const fmt = (d: Date) => d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

export default function ChatMessages({ messages, isTyping, loading, onOptionSelect, onRetry, messagesEndRef }: Props) {
  return (
    <div className="chat-messages flex-1 overflow-y-auto min-h-0 p-4 md:p-6 flex flex-col gap-4">
      {messages.map((msg, i) => {
        const isLast = i === messages.length - 1;
        const blocks = (!loading && isLast && msg.role === 'assistant' && !msg.isError)
          ? parseContent(msg.content) : null;

        return (
          <div key={i} className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            {msg.role === 'user' ? (
              <div
                className="bg-[#C4973F] text-[#1A1814] text-sm font-semibold rounded-[1.2rem] rounded-tr-sm px-4 py-3 max-w-[80%]"
                style={{ boxShadow: '0 4px 20px rgba(196,151,63,.2)' }}
              >
                {msg.content}
              </div>
            ) : (
              <div className="flex items-start gap-2.5 max-w-[92%]">
                <div className="mt-0.5 shrink-0">
                  <LumiLens size={24} variant="light" animated />
                </div>
                <div className={`flex-1 min-w-0 rounded-[1.2rem] rounded-tl-sm border-l-2 px-5 py-4 ${msg.isError ? 'bg-white/[0.04] border-red-700/40' : 'bg-white/[0.06] border-[#C4973F]/35'}`}>
                  {msg.isError ? (
                    <>
                      <p className="text-sm text-[#FFFDF8]/70 leading-7">{msg.content}</p>
                      <button type="button" onClick={onRetry} className="mt-2 text-xs text-[#C4973F] hover:text-[#E8B44B] underline underline-offset-2 transition-colors" style={{ touchAction: 'manipulation' }}>
                        Retry →
                      </button>
                    </>
                  ) : blocks ? (
                    blocks.map((block, bi) =>
                      block.type === 'markdown' ? (
                        <ReactMarkdown key={bi} components={MD as never}>{block.text!}</ReactMarkdown>
                      ) : (
                        <div key={bi} className="flex flex-wrap gap-2 mt-3 mb-1">
                          {block.items!.map(opt => (
                            <button key={opt} type="button" onClick={() => onOptionSelect(opt)} disabled={loading}
                              className="rounded-full border border-white/20 bg-white/[0.04] px-4 py-2 text-sm text-[#FFFDF8]/75 transition-all duration-200 hover:border-[#C4973F]/60 hover:bg-[#C4973F]/10 hover:text-[#E8B44B] active:scale-95 disabled:opacity-40"
                              style={{ minHeight: '40px', touchAction: 'manipulation' }}>
                              {opt}
                            </button>
                          ))}
                        </div>
                      )
                    )
                  ) : (
                    <ReactMarkdown components={MD as never}>{msg.content}</ReactMarkdown>
                  )}
                </div>
              </div>
            )}
            <span className={`text-[10px] text-white/20 ${msg.role === 'user' ? 'pr-1' : 'pl-8'}`}>{fmt(msg.timestamp)}</span>
          </div>
        );
      })}

      {isTyping && (
        <div className="flex items-start gap-2.5">
          <div className="mt-0.5 shrink-0"><LumiLens size={22} variant="light" animated /></div>
          <div className="bg-white/[0.06] border-l-2 border-[#C4973F]/35 rounded-[1.2rem] rounded-tl-sm px-5 py-3.5 flex items-center gap-1.5">
            <span className="typing-dot w-2 h-2 rounded-full bg-[#C4973F] inline-block" />
            <span className="typing-dot w-2 h-2 rounded-full bg-[#C4973F] inline-block" style={{ animationDelay: '0.2s' }} />
            <span className="typing-dot w-2 h-2 rounded-full bg-[#C4973F] inline-block" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
