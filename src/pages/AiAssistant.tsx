import { useState } from 'react';
import { Sparkles, Send, Bot, User } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';

interface Message {
  role: 'assistant' | 'user';
  text: string;
}

const initialMessages: Message[] = [
  { role: 'assistant', text: 'Hi! I’m your AI Assistant. Ask me anything about your dashboard data, or tell me what you’d like help with.' },
  { role: 'user', text: 'Summarize this week’s revenue trend.' },
  { role: 'assistant', text: 'Revenue is up 14.7% week-over-week, driven mostly by higher conversion on the Sales dashboard. Orders closed grew to 1,024, with your top rep, Carla Reed, closing $18.2K in new deals.' },
];

const suggestions = [
  'Summarize today’s key metrics',
  'Draft a follow-up email to a lead',
  'Explain the churn rate chart',
  'Generate a weekly report',
];

export default function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', text }, { role: 'assistant', text: 'Got it — I’m a demo assistant in this template, so I can’t generate a live answer yet, but this is where the response would appear.' }]);
    setInput('');
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        eyebrow="New"
        eyebrowIcon={<Sparkles size={14} />}
        title="AI Assistant"
        subtitle="Chat with your workspace assistant to summarize data, draft messages, and get quick answers."
        gradient="from-violet-600 via-purple-600 to-indigo-700"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3 p-6 flex flex-col h-[560px]">
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {messages.map((m, i) => (
              <div key={i} className={`flex items-start gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400'}`}>
                  {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-tl-sm'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="mt-4 flex items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-4"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your assistant anything..."
              className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-violet-500 transition-colors"
            />
            <button type="submit" className="p-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white transition-colors cursor-pointer">
              <Send size={18} />
            </button>
          </form>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-4">Try asking</h3>
          <div className="space-y-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-violet-50 dark:hover:bg-violet-900/20 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
