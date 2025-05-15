
import React, { useState } from "react";
import UserPanelLayout from "@/components/UserPanelLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send } from "lucide-react";

const HRMessages = () => {
  const [message, setMessage] = useState("");

  // Mock data
  const conversations = [
    {
      id: "1",
      name: "Ana Silva",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      lastMessage: "Olá! Gostaria de saber mais sobre o feedback do meu projeto.",
      time: "10:30",
      unread: true
    },
    {
      id: "2",
      name: "Carlos Pereira",
      avatar: "",
      lastMessage: "Quando sai o resultado da avaliação?",
      time: "Ontem",
      unread: false
    },
    {
      id: "3",
      name: "Mariana Santos",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
      lastMessage: "Obrigada pelo feedback! Vou implementar as sugestões.",
      time: "Seg",
      unread: false
    }
  ];

  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);

  // Mock messages for the selected conversation
  const messages = [
    {
      id: "1",
      senderId: "1", // Ana Silva
      text: "Olá! Gostaria de saber mais sobre o feedback do meu projeto.",
      time: "10:30"
    },
    {
      id: "2",
      senderId: "hr", // HR
      text: "Olá Ana! Claro, seu projeto foi muito bem avaliado. Particularmente gostamos da interface intuitiva que você desenvolveu.",
      time: "10:32"
    },
    {
      id: "3",
      senderId: "1", // Ana Silva
      text: "Que bom! E tem alguma sugestão de melhoria?",
      time: "10:33"
    },
    {
      id: "4",
      senderId: "hr", // HR
      text: "Sim! Seria interessante adicionar mais documentação ao projeto e talvez incluir alguns testes unitários para garantir a qualidade do código.",
      time: "10:35"
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <UserPanelLayout userName="Roberto Gomes" userType="hr">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Mensagens</h1>
        </div>

        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-3 h-[calc(80vh-180px)]">
            {/* Conversations list */}
            <div className="border-r">
              <div className="p-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar conversa..."
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="overflow-auto h-[calc(80vh-240px)]">
                {conversations.map((conversation) => (
                  <div 
                    key={conversation.id} 
                    className={`p-4 border-b cursor-pointer hover:bg-muted/50 ${
                      selectedConversation.id === conversation.id ? "bg-muted" : ""
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={conversation.avatar} alt={conversation.name} />
                        <AvatarFallback>
                          {conversation.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium truncate">{conversation.name}</h4>
                          <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                            {conversation.time}
                          </span>
                        </div>
                        <p className={`text-sm truncate ${
                          conversation.unread ? "font-medium" : "text-muted-foreground"
                        }`}>
                          {conversation.lastMessage}
                        </p>
                      </div>
                      {conversation.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex flex-col md:col-span-2">
              <div className="p-4 border-b flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
                  <AvatarFallback>
                    {selectedConversation.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedConversation.name}</h3>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
              
              <div className="flex-1 overflow-auto p-4 flex flex-col gap-3">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.senderId === "hr" ? "justify-end" : ""}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.senderId === "hr" 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className={`text-xs ${
                        msg.senderId === "hr" 
                          ? "text-primary-foreground/80" 
                          : "text-muted-foreground"
                      } block text-right mt-1`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </UserPanelLayout>
  );
};

export default HRMessages;
