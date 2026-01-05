import ChatBubbles from "../feat/ChatBubbles";
import Pfp from "../feat/Pfp";
import ChatProvider from "../state/ChatProvider";
import ChatSrOnly from "../feat/ChatSrOnly";
import { title } from "node:process";
import { Metadata } from "next";
export const dynamic = 'force-static'

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
    icon: [
      {
        url: `${basePath}/favicon.svg`,
        type: "image/svg+xml",
      },
      {
        url: `${basePath}/favicon-128.ico`,
        sizes: "128x128",
        type: "image/x-icon",
      },
      {
        url: `${basePath}/favicon-128-dark.ico`,
        sizes: "128x128",
        type: "image/x-icon",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    shortcut: [`${basePath}/favicon-128.ico`],
    apple: [
      {
        url: `${basePath}/favicon-512.png`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "icon",
        url: `${basePath}/favicon-512-dark.png`,
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  };
}

export default async function Page() {
  const actionButtonEntries = Array.from(await getActionButtonMap());
  const unpopulatedChatBubbleEntries = Array.from(await getChatBubbleMap());  
  return (
    <div>
      <ChatProvider unpopulatedChatBubbleEntries={unpopulatedChatBubbleEntries} actionButtonEntries={actionButtonEntries}>
        <ChatSrOnly chatBubbles={unpopulatedChatBubbleEntries.map(x=>x[1])} />
        <Pfp basePath={basePath} />
        <ChatBubbles />
      </ChatProvider>
    </div>
  );
}
