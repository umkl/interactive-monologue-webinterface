import ChatBubbles from "../feat/ChatBubbles";
import Pfp from "../feat/Pfp";
import chatBubbleObject from "../../data/chat-bubbles.json";
import ChatProvider from "../state/ChatProvider";
import ChatSrOnly from "../feat/ChatSrOnly";

const chatBubbleMap = new Map<string, ChatBubble>(
  Object
    .entries(chatBubbleObject)
    .map(([key, value]) => [key, { ...value, id: key } as ChatBubble])
);

export default function Page() {
  return (
    <div>
      <ChatProvider chatBubbleMap={chatBubbleMap}>
        <ChatSrOnly chatBubbles={Array.from(chatBubbleMap.values())} />
        <Pfp />
        <ChatBubbles />
      </ChatProvider>
    </div>
  );
}
