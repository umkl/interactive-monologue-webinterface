"use client";
import { useReducer, useState } from "react";
import { ChatContext } from "./chatContext";
import { initialChatBubbleIds } from "../const/prefs";
import { chatReducerFactory } from "./chatReducer";

type ChatProviderProps = {
  children: React.ReactNode;
  chatBubbleEntries: Array<[string, ChatBubble]>;
}

export default function ChatProvider(props: ChatProviderProps) {
  const children = props.children;
  const chatBubbleMap = new Map<string, ChatBubble>(props.chatBubbleEntries);
  const initialChat: Chat = {
    chatBubbles: initialChatBubbleIds
      .filter(id => chatBubbleMap.has(id))
      .map(id => chatBubbleMap.get(id)),
  };
  const reducer = useReducer(chatReducerFactory(chatBubbleMap), initialChat);
  const chatStore: ChatStore = {
    state: reducer[0],
    dispatch: reducer[1],
  };
  return <ChatContext.Provider
    value={chatStore}
  >{children}</ChatContext.Provider>
}