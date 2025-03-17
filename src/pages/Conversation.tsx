
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useToast } from "@/hooks/use-toast";

const Conversation = () => {
  const { id: conversationId } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const [conversations, setConversations] = useLocalStorage<any[]>("conversations", []);
  const [messages, setMessages] = useLocalStorage<any[]>("messages", []);
  
  const [newMessage, setNewMessage] = useState("");
  const [currentConversation, setCurrentConversation] = useState<any>(null);
  const [conversationMessages, setConversationMessages] = useState<any[]>([]);
  const [otherParticipant, setOtherParticipant] = useState<{
    id: string;
    name: string;
    avatar: string;
  } | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    
    // Get conversation details
    const conversation = conversations.find(convo => convo.id === conversationId);
    if (!conversation) {
      navigate("/messages");
      return;
    }
    
    setCurrentConversation(conversation);
    
    // Get other participant details
    const otherParticipantId = conversation.participants.find(
      (id: string) => id !== user.id
    );
    const otherParticipantIndex = conversation.participants.indexOf(otherParticipantId);
    
    setOtherParticipant({
      id: otherParticipantId,
      name: conversation.participantNames[otherParticipantIndex],
      avatar: conversation.participantAvatars[otherParticipantIndex]
    });
    
    // Get messages for this conversation
    const conversationMessages = messages.filter(
      message => message.conversationId === conversationId
    ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    
    setConversationMessages(conversationMessages);
  }, [user, navigate, conversationId, conversations, messages]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const messageObj = {
      id: `message-${Date.now()}`,
      conversationId,
      senderId: user!.id,
      receiverId: otherParticipant!.id,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    // Update messages
    setMessages([...messages, messageObj]);
    
    // Update conversation's last message
    const updatedConversations = conversations.map(convo => {
      if (convo.id === conversationId) {
        return {
          ...convo,
          lastMessage: newMessage,
          updatedAt: new Date().toISOString()
        };
      }
      return convo;
    });
    
    setConversations(updatedConversations);
    setConversationMessages([...conversationMessages, messageObj]);
    setNewMessage("");
    
    // If there's an unread message badge or notification, clear it here
  };

  const handleHireClick = () => {
    if (otherParticipant) {
      navigate(`/hire/${otherParticipant.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto pt-24 px-4 pb-16 h-screen flex flex-col">
        {/* Conversation header */}
        <div className="flex items-center space-x-4 pb-4 border-b">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/messages")}
            className="p-2"
            size="icon"
          >
            <ArrowLeft size={18} />
          </Button>
          
          {otherParticipant && (
            <div className="flex items-center flex-1">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={otherParticipant.avatar} alt={otherParticipant.name} />
                <AvatarFallback>{otherParticipant.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-medium">{otherParticipant.name}</h2>
              </div>
            </div>
          )}
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleHireClick}
          >
            Hire
          </Button>
        </div>
        
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {conversationMessages.map(message => {
            const isCurrentUser = message.senderId === user?.id;
            
            return (
              <div 
                key={message.id} 
                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-end space-x-2 max-w-[80%] ${isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {!isCurrentUser && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={otherParticipant?.avatar} alt={otherParticipant?.name} />
                      <AvatarFallback>{otherParticipant?.name[0]}</AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div 
                    className={`px-4 py-2 rounded-2xl ${
                      isCurrentUser 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className={`text-[10px] mt-1 ${
                      isCurrentUser ? 'text-primary-foreground/70' : 'text-secondary-foreground/70'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Message input */}
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2 pt-4 border-t">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim()}>
            <Send size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Conversation;
