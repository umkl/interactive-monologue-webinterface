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

const server = process.env.MONOLOGUE_SERVER;
const dir = process.env.MONOLOGUE_SERVER_DIR;

async function getActionButtonMap() {  
  try {
    const response = await fetch(`${server}${dir}/action-buttons.json`);
    const json = await response.json();
    return new Map<string, ActionButton>(Object.entries(json).map(([key, value]) => [key, { ...value as object, id: key } as ActionButton]));
  } catch (e) {
    console.error("Failed to fetch action-buttons.json:", e);
    return new Map<string, ActionButton>();
  }
}

export default async function Page() {
  const actionButtonMap = await getActionButtonMap();
  
  return (
    <div>
      <ChatProvider chatBubbleMap={chatBubbleMap} actionButtonMap={actionButtonMap}>
        <ChatSrOnly chatBubbles={Array.from(chatBubbleMap.values())} />
        <Pfp />
        <ChatBubbles />
      </ChatProvider>
    </div>
  );
}
