"use client";
import { useEffect, useRef, useState } from "react";
import ChatBubble from "../comp/ChatBubble";
import useScrollDisabler from "../hooks/useScrollDisabler";
import chatBubbleObject from "../../data/chat-bubbles.json";
import { initialChatBubbleIds } from "../const/prefs";
import ActionButton from "../comp/ActionButton";

const chatBubbleMap = new Map<string, ChatBubble>(
  Object.entries(chatBubbleObject) as any
);

export default function ChatBubbles() {
  const { isScrollDisabled } = useScrollDisabler();
  const [shownChatBubbleIds, setShownChatBubbleIds] =
    useState(initialChatBubbleIds);
  const newChatBubble = useRef(true);

  useEffect(() => {
    if (isScrollDisabled) return;

    const handleScroll = () => {};

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrollDisabled]);

  return (
    <div
      style={{
        backgroundColor: "green",
        margin: "0 auto",
      }}
    >
      <div style={{ height: "calc(50vh - 25px)" }} />
      <div className="flex flex-col gap-6 max-w-2xl mx-auto">
        {shownChatBubbleIds.map((chatBubbleId, idx) => {
          const chatBubble = chatBubbleMap.get(chatBubbleId);
          const chatBubbleText = chatBubble.text;
          const chatBubbleActionIds = chatBubble.actionIds;
          return (
            chatBubbleText && (
              <ChatBubble
                key={idx}
                text={chatBubbleText}
                streamEnabled={
                  shownChatBubbleIds.length - 1 === idx && newChatBubble.current
                }
                actionButtons={[
                  chatBubbleActionIds.map((actionId) => {
                    return (
                      <ActionButton
                        key={actionId}
                        value={actionId}
                        label={actionId}
                        click={() => {
                          setShownChatBubbleIds((prev) => [...prev, "contact"]);
                          newChatBubble.current = true;
                        }}
                      />
                    );
                  }),
                ]}
              />
            )
          );
        })}
      </div>
      <div style={{ height: "calc(50vh - 25px)" }} />
    </div>
  );
}
