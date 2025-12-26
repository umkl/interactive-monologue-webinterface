"use client";
import { useEffect, useState } from "react";
import { visualTokenStreamingSpeed } from "../const/prefs";

type ChatBubbleProps = {
  text: string;
  actionIds: string[];
};

export default function ChatBubble(props: ChatBubbleProps) {
  const [displayedText, setDisplayedText] = useState("");
  const { text, actionIds } = props;

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
          {actionIds.map((actionId) => {
            return <div key={actionId}>{actionId}</div>;
          })}
        </div>
      </div>
    </div>
  );
}
