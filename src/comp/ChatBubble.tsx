"use client";
import { useEffect, useState } from "react";
import { visualTokenStreamingSpeed } from "../const/prefs";

type ChatBubbleProps = {
  text: string;
  actionButtons: React.ReactNode[];
};

export default function ChatBubble(props: ChatBubbleProps) {
  const [displayedText, setDisplayedText] = useState("");
  const { text, actionButtons } = props;

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, visualTokenStreamingSpeed);
    return () => clearInterval(interval);
  }, [text]);

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
        <div>{displayedText}</div>
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
