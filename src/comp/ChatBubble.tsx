"use client";
import { useEffect, useState } from "react";
import { visualTokenStreamingSpeed } from "../const/prefs";
import { useTextStream } from "../hooks/useTextStream";
import React, { forwardRef } from "react";
type ChatBubbleProps = {
  text: string;
  actionButtons: React.ReactNode[];
  streamEnabled: boolean;
};

const ChatBubble = forwardRef<HTMLDivElement, ChatBubbleProps>((props, ref) => {
  const { text, actionButtons, streamEnabled } = props;
  const { displayText, done } = useTextStream(text, streamEnabled);

  return (
    <div className="chat-bubble" ref={ref}>
      <div className="chat-bubble-pfpspacer"></div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div
          style={{
            padding: "16px 20px",
            boxSizing: "border-box",
            backgroundColor: "whitesmoke",
            borderRadius: "14px",
            fontSize: "16px",
            fontWeight: "400",
          }}
        >
          {displayText}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {actionButtons}
        </div>
      </div>
    </div>
  );
});

export default ChatBubble;
