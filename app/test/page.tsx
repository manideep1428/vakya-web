"use client"

// File: components/Header.jsx
import { Badge, PlusCircle, RefreshCw, Search, Send } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export  function Header() {
  return (
    <header className="bg-background border-b border-border p-4 flex items-center">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white mr-2">
          K
        </div>
        <div className="mr-4">
          <div className="font-medium">Klavis AI</div>
          <div className="text-xs text-green-500 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
            Online
          </div>
        </div>
      </div>
      
      <div className="flex items-center ml-4">
        <Select defaultValue="llm">
          <SelectTrigger className="w-32 h-8">
            <SelectValue placeholder="Model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="llm">LLM Model</SelectItem>
            <SelectItem value="gpt">GPT</SelectItem>
            <SelectItem value="bert">BERT</SelectItem>
          </SelectContent>
        </Select>
        
        <Select defaultValue="4o">
          <SelectTrigger className="w-24 h-8">
            <SelectValue placeholder="Version" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="4o">GPT 4o</SelectItem>
            <SelectItem value="4">GPT 4</SelectItem>
            <SelectItem value="3.5">GPT 3.5</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="ml-auto">
        <Button size="sm" className="flex items-center">
          <RefreshCw size={16} className="mr-2" />
          New Chat
        </Button>
      </div>
    </header>
  );
}



export  default function ChatComponent() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hello! How can I help you today?", 
      sender: "bot",
      timestamp: "20:45"
    }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    setMessages([...messages, {
      id: messages.length + 1,
      text: message,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    
    setMessage('');
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: "I'm processing your request...",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.map(msg => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className="max-w-md">
              <div 
                className={cn(
                  "rounded-lg p-3",
                  msg.sender === 'user' 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                )}
              >
                {msg.text}
              </div>
              <div className="text-xs text-muted-foreground mt-1 px-1">
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-border p-4">
        <div className="flex items-center">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          //   onKeyDown={handleKeyDown}
            className="flex-1 mr-2"
            placeholder="Type your message..."
          />
          <Button onClick={handleSend} size="icon">
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export  function MCPPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Your</h2>
        <h2 className="text-2xl font-bold">MCP</h2>
        <h2 className="text-2xl font-bold">Panel</h2>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-8" />
        </div>
        
        <Button>Popular</Button>
        
        <Button className="whitespace-nowrap">
          <PlusCircle size={16} className="mr-2" />
          Add External Server
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center text-white mr-2">
                  K
                </div>
                <CardTitle>Klavis ReportGen</CardTitle>
              </div>
              {/* <Toggle defaultPressed /> */}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Generate visually appealing reports
            </p>
            <div className="flex items-center mt-4">
              <Badge className="mr-2">
                <span className="text-yellow-500 mr-1">⚡</span> 1331
              </Badge>
              <span className="text-gray-500">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.48v-1.68c-2.782.603-3.369-1.338-3.369-1.338-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852v2.747c0 .265.18.576.688.48C19.138 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z"></path>
                </svg>
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <div className="w-8 h-8 text-orange-500 flex items-center justify-center mr-2">
                  🔥
                </div>
                <CardTitle>Firecrawl Web Search</CardTitle>
              </div>
              {/* <Toggle defaultPressed /> */}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Advanced web search capabilities
            </p>
            <div className="flex items-center justify-between mt-4">
              <Badge className="text-xs bg-amber-50 text-amber-600 border-amber-200">
                Not Authenticated
              </Badge>
              <div className="flex items-center">
                <Badge className="mr-2">
                  <span className="text-yellow-500 mr-1">⚡</span> 1278
                </Badge>
                <span className="text-gray-500">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.48v-1.68c-2.782.603-3.369-1.338-3.369-1.338-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852v2.747c0 .265.18.576.688.48C19.138 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z"></path>
                  </svg>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
