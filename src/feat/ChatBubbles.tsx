"use client";
import { useContext, useEffect, useRef, useState } from "react";
import ChatBubble from "../comp/ChatBubble";
import useScrollDisabler from "../hooks/useScrollDisabler";
import ActionButton from "../comp/ActionButton";
import { ChatContext } from "../state/chatContext";

export default function ChatBubbles() {
  const { state, dispatch} = useContext(ChatContext);
  const { isScrollDisabled } = useScrollDisabler(!(state.chatBubbles.length > 1));
  const isNewChatBubble = useRef(true);

  useEffect(() => {
    if (isScrollDisabled) return;

    const handleScroll = () => {};

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrollDisabled]);

  return (
    <div style={{width: "100%"}}>
      <div className="chat-bubbles-spacer-block" />
      <div {...{
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "10px",
      }}}>
        {state.chatBubbles.map((chatBubble, idx) => {
          const chatBubbleText = chatBubble.text;
          return (
            chatBubbleText && (
              <ChatBubble
                key={idx}
                text={chatBubbleText}
                streamEnabled={
                  state.chatBubbles.length - 1 === idx && isNewChatBubble.current
                } 
                actionButtons={[
                  chatBubble.actions.map((action) => {
                    console.log("Rendering action button:", action);
                    return (
                      <ActionButton
                        key={action.id}
                        value={action.id}
                        label={action.label || "Button"}
                        click={(value: ActionButtonType, ready: Promise<void>) => {
                          dispatch(action.event);
                          isNewChatBubble.current = true;
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
      <div className="chat-bubbles-spacer-block" />
    </div>
  );
}
