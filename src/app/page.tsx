import ChatBubbles from "../feat/ChatBubbles";
import Pfp from "../feat/Pfp";
import chatBubbleObject from "../../data/chat-bubbles.json";
import ChatProvider from "../state/ChatProvider";
const chatBubbleMap = new Map<string, ChatBubble>(
  Object.entries(chatBubbleObject) as any
);

export default function Page() {
  return (
    <div>
      <ChatProvider chatBubbleMap={chatBubbleMap}>
        <Pfp />
        <ChatBubbles />
      </ChatProvider>
    </div>
  );
}
