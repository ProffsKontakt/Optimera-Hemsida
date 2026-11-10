import { chatEnabled } from "@/lib/chat-config";
import { ChatLauncher } from "./ChatLauncher";

/**
 * Lägger ut chattknappen, men bara när chatten är aktiverad på servern
 * (API-nyckel finns och CHAT_ENABLED inte är "false"). Utan nyckel renderas
 * ingenting, så sajten är oförändrad tills chatten slås på.
 */
export function ChatMount() {
  if (!chatEnabled()) return null;
  return <ChatLauncher />;
}
