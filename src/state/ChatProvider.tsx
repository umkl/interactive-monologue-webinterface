"use client";
import { useReducer, useState } from "react";
import { ChatContext } from "./chatContext";
import { initialChatBubbleIds } from "../const/prefs";
import { chatReducerFactory } from "./chatReducer";


type ChatProviderProps = {
  children: React.ReactNode;
  chatBubbleMap: Map<string, ChatBubble>;
}

export default function ChatProvider(props: ChatProviderProps) {
  const children = props.children;
  const initialChatBubbles = initialChatBubbleIds.map(id => props.chatBubbleMap.get(id));
  const initialChat: Chat = {
    chatBubbles: initialChatBubbles,
  };
  const reducer = useReducer(chatReducerFactory(props.chatBubbleMap), initialChat);
  const chatStore: ChatStore = {
    state: reducer[0],
    dispatch: reducer[1]
  };
  return <ChatContext.Provider
    value={chatStore}
  >{children}</ChatContext.Provider>
}