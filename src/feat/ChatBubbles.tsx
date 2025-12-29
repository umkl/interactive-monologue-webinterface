"use client";
import { useContext, useEffect, useRef, useState } from "react";
import ChatBubble from "../comp/ChatBubble";
import useScrollDisabler from "../hooks/useScrollDisabler";
import ActionButton from "../comp/ActionButton";
import { ChatContext } from "../state/chatContext";

export default function ChatBubbles() {
  const { state, dispatch } = useContext(ChatContext);
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
    <div style={{backgroundColor: "green", width: "100vw"}}>
      <div style={{ height: "calc(50dvh - 25px)" }} />
      <div {...{
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "20px",
      }}}>
        {state.chatBubbles.map((chatBubble, idx) => {
          const chatBubbleText = chatBubble.text;
          const chatBubbleActionIds = chatBubble.actionIds;
          return (
            chatBubbleText && (
              <ChatBubble
                key={idx}
                text={chatBubbleText}
                streamEnabled={
                  state.chatBubbles.length - 1 === idx && isNewChatBubble.current
                } 
                actionButtons={[
                  chatBubbleActionIds.map((actionId) => {
                    return (
                      <ActionButton
                        key={actionId}
                        value={actionId}
                        label={actionId}
                        click={(value: ActionButtonType, ready: Promise<void>) => {
                          dispatch({
                            type: "chat",
                            value: actionId.split(":")[1],
                          } as ActionButtonEvent);
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
      {/* <div style={{ height: "calc(50vh - 50px)" }} /> */}
    </div>
  );
}
