
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const Messages = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [conversations] = useLocalStorage<any[]>("conversations", []);
  const [filteredConversations, setFilteredConversations] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    // Filter conversations for the current user
    const userConversations = conversations.filter(
      convo => convo.participants.includes(user.id)
    );
    
    setFilteredConversations(userConversations);
  }, [user, navigate, conversations]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (!query) {
      setFilteredConversations(conversations.filter(
        convo => convo.participants.includes(user?.id)
      ));
      return;
    }
    
    const filtered = conversations.filter(convo => {
      const isUserParticipant = convo.participants.includes(user?.id);
      const otherParticipantName = convo.participantNames
        .find((name: string) => name.toLowerCase() !== user?.name.toLowerCase())
        ?.toLowerCase();
      
      return isUserParticipant && otherParticipantName?.includes(query);
    });
    
    setFilteredConversations(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto pt-24 px-4 pb-16">
        <h1 className="text-2xl font-medium mb-8">Messages</h1>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search conversations..."
            className="pl-10"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        
        <div className="space-y-4">
          {filteredConversations.length > 0 ? (
            filteredConversations.map(conversation => {
              const otherParticipantId = conversation.participants.find(
                (id: string) => id !== user?.id
              );
              const otherParticipantName = conversation.participantNames.find(
                (name: string) => name.toLowerCase() !== user?.name.toLowerCase()
              );
              const otherParticipantAvatar = conversation.participantAvatars[
                conversation.participants.indexOf(otherParticipantId)
              ];
              
              return (
                <Link
                  key={conversation.id}
                  to={`/conversation/${conversation.id}`}
                  className="flex items-center p-4 border rounded-lg hover:bg-secondary/20 transition-colors"
                >
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={otherParticipantAvatar} alt={otherParticipantName} />
                    <AvatarFallback>{otherParticipantName?.[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium">{otherParticipantName}</h3>
                      <span className="text-xs text-muted-foreground">
                        {new Date(conversation.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {conversation.lastMessage}
                    </p>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="bg-secondary/30 rounded-lg p-8 text-center">
              <h3 className="font-medium mb-2">No conversations yet</h3>
              <p className="text-muted-foreground mb-6">
                Browse services and connect with creators to start a conversation
              </p>
              <Button asChild>
                <Link to="/services">Browse Services</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
