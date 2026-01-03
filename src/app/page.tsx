import ChatBubbles from "../feat/ChatBubbles";
import Pfp from "../feat/Pfp";
import ChatProvider from "../state/ChatProvider";
import ChatSrOnly from "../feat/ChatSrOnly";

const server = process.env.MONOLOGUE_SERVER;
const dir = process.env.MONOLOGUE_SERVER_DIR;

async function getChatBubbleMap() {  
  try {
    const response = await fetch(`${server}${dir}/chat-bubbles.json`);
    const json = await response.json();
    return new Map<string, ChatBubble>(Object.entries(json).map(([key, value]) => [key, { ...value as object, id: key } as ChatBubble]));
  } catch (e) {
    throw new Error("Failed to fetch chat-bubbles.json: ", e);
  }
}

async function getActionButtonMap() {  
  try {
    const response = await fetch(`${server}${dir}/action-buttons.json`);
    const json = await response.json();
    return new Map<string, ActionButton>(Object.entries(json).map(([key, value]) => [key, { ...value as object, id: key } as ActionButton]));
  } catch (e) {
    throw new Error("Failed to fetch action-buttons.json: ", e);
  }
}

export default async function Page() {
  const actionButtonMap = await getActionButtonMap();
  const unpopulatedChatBubbleMap = await getChatBubbleMap();  
  return (
    <div>
      <ChatProvider unpopulatedChatBubbleMap={unpopulatedChatBubbleMap} actionButtonMap={actionButtonMap}>
        <ChatSrOnly chatBubbles={Array.from(unpopulatedChatBubbleMap.values())} />
        <Pfp />
        <ChatBubbles />
      </ChatProvider>
    </div>
  );
}
