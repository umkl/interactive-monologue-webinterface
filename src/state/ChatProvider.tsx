"use client";
import { useReducer, useState } from "react";
import { ChatContext } from "./chatContext";
import { initialChatBubbleIds } from "../const/prefs";
import { chatReducerFactory } from "./chatReducer";


type ChatProviderProps = {
  children: React.ReactNode;
  unpopulatedChatBubbleMap: Map<string, ChatBubble>;
  actionButtonMap: Map<string, ActionButton>;
}

export default function ChatProvider(props: ChatProviderProps) {
  const children = props.children;
  const chatBubbles = props.unpopulatedChatBubbleMap.keys().toArray().map(chatBubbleId => {
    const chatBubble = props.unpopulatedChatBubbleMap.get(chatBubbleId);
    if (!chatBubble) {
      console.error(`Chat bubble with id ${chatBubbleId} not found in chatBubbleMap.`);
      return null;
    }
    chatBubble.actions = chatBubble.actionIds.map((id) => {
      const actionButton = props.actionButtonMap.get(id);
      if (!actionButton) {
        console.error(`Action button with id ${id} not found in actionButtonMap.`);
        return null;
      }
      return actionButton;
    })
    return chatBubble;
  });

  const chatBubbleMap = chatBubbles.reduce((map, chatBubble) => {
    if (chatBubble) {
      map.set(chatBubble.id, chatBubble);
    }
    return map;
  }, new Map<string, ChatBubble>());
  
  const initialChat: Chat = {
    chatBubbles: chatBubbles.filter(x=>initialChatBubbleIds.includes(x.id)),
  };
  const reducer = useReducer(chatReducerFactory(chatBubbleMap), initialChat);
  console.log("ChatProvider state:", reducer[0]);
  const chatStore: ChatStore = {
    state: reducer[0],
    dispatch: reducer[1],
  };
  return <ChatContext.Provider
    value={chatStore}
  >{children}</ChatContext.Provider>
}