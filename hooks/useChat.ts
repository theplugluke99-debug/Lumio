'use client';

import { useState, useRef, useCallback } from 'react';
import { Message, ApiMessage } from '@/lib/chat';

export function useChat() {
  const streamAccRef = useRef('');

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);

  const callAPI = useCallback(async (history: ApiMessage[]) => {
    setIsTyping(true);
    setLoading(true);
    streamAccRef.current = '';

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok || !res.body) throw new Error('API error');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let firstChunk = true;

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        streamAccRef.current += decoder.decode(value, { stream: true });
        const snapshot = streamAccRef.current;

        if (firstChunk) {
          firstChunk = false;
          setIsTyping(false);
          setMessages(prev => [...prev, { role: 'assistant', content: snapshot, timestamp: new Date() }]);
        } else {
          setMessages(prev => {
            const u = [...prev];
            u[u.length - 1] = { ...u[u.length - 1], content: snapshot };
            return u;
          });
        }
      }

      const tail = decoder.decode();
      if (tail) {
        streamAccRef.current += tail;
        const snapshot = streamAccRef.current;
        setMessages(prev => {
          const u = [...prev];
          u[u.length - 1] = { ...u[u.length - 1], content: snapshot };
          return u;
        });
      }
    } catch {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "Something went quiet on my end — try again in a moment.", timestamp: new Date(), isError: true },
      ]);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: 'user', content: trimmed, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    const history: ApiMessage[] = [
      ...messages.filter(m => !m.isOpening && !m.isError).map(m => ({ role: m.role, content: m.content })),
      { role: 'user' as const, content: trimmed },
    ].slice(-20);

    await callAPI(history);
  }, [messages, loading, callAPI]);

  const retryLast = useCallback(() => {
    setMessages(prev => prev.filter(m => !m.isError));
    const history: ApiMessage[] = messages
      .filter(m => !m.isOpening && !m.isError)
      .slice(-20)
      .map(m => ({ role: m.role, content: m.content }));
    if (history.length > 0) callAPI(history);
  }, [messages, callAPI]);

  return { messages, setMessages, input, setInput, isTyping, loading, sendMessage, retryLast, callAPI };
}
