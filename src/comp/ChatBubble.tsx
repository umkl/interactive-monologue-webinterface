"use client";
import { useEffect, useState } from "react";
import { visualTokenStreamingSpeed } from "../const/prefs";
import { useTextStream } from "../hooks/useTextStream";

type ChatBubbleProps = {
  text: string;
  actionButtons: React.ReactNode[];
  streamEnabled: boolean;
};

export default function ChatBubble(props: ChatBubbleProps) {
  const { text, actionButtons, streamEnabled } = props;
  const {displayText, done} = useTextStream(text, streamEnabled);

  return (
    <div className="chat-bubble">
      <div className="chat-bubble-pfpspacer"></div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div {...{
          style: {
            padding: "16px 20px",
            boxSizing: "border-box",
            backgroundColor: "lightgray",
            borderRadius: "8px",
            fontSize: "16px",
            lineHeight: "1.5",
            fontFamily: "Inter, system-ui, sans-serif",
        }}}>
          {displayText}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          {actionButtons}
        </div>
      </div>
    </div>
  );
}
