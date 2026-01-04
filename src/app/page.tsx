import ChatBubbles from "../feat/ChatBubbles";
import Pfp from "../feat/Pfp";
import ChatProvider from "../state/ChatProvider";
import ChatSrOnly from "../feat/ChatSrOnly";
import { title } from "node:process";
import { Metadata } from "next";

const prodBaseUrl = process.env.MONOLOGUE_SERVER;
const prodDir = process.env.MONOLOGUE_SERVER_DIR;

const baseUrl = process.env.NODE_ENV === "production" ?
  prodBaseUrl :
  process.env.NEXT_PUBLIC_SITE_URL ?? `http://localhost:3000`;

const dir = process.env.NODE_ENV === "production" ?
  prodDir :
  "/example";

const basePath = `${baseUrl}${dir}`;



async function getChatBubbleMap() {
  try {
    const response = await fetch(`${basePath}/chat-bubbles.json`);
    const json = await response.json();
    return new Map<string, ChatBubble>(Object.entries(json).map(([key, value]) => [key, { ...value as object, id: key } as ChatBubble]));
  } catch (e) {
    throw new Error("Failed to fetch chat-bubbles.json: ", e);
  }
}

async function getActionButtonMap() {  
  try {
    const source = `${basePath}/action-buttons.json`;
    const response = await fetch(source);
    const json = await response.json();
    return new Map<string, ActionButton>(Object.entries(json).map(([key, value]) => [key, { ...value as object, id: key } as ActionButton]));
  } catch (e) {
    throw new Error("Failed to fetch action-buttons.json: ", e);
  }
}

async function getMetadata() { 
  try {
    const source = `${basePath}/metadata.json`;
    const response = await fetch(source);
    const json = await response.json();
    return json;
  } catch (e) {
    throw new Error("Failed to fetch metadata.json: ", e);
  }
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...(await getMetadata()),
    icons: {
      icon: `${basePath}/favicon.png`,
      apple: `${basePath}/apple-touch-icon.png`,
    },
  };
}

export default async function Page() {
  const actionButtonMap = await getActionButtonMap();
  const unpopulatedChatBubbleMap = await getChatBubbleMap();  
  return (
    <div>
      <ChatProvider unpopulatedChatBubbleMap={unpopulatedChatBubbleMap} actionButtonMap={actionButtonMap}>
        <ChatSrOnly chatBubbles={Array.from(unpopulatedChatBubbleMap.values())} />
        <Pfp basePath={basePath} />
        <ChatBubbles />
      </ChatProvider>
    </div>
  );
}
