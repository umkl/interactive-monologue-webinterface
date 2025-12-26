type ChatBubbleProps = {
  text: string;
  actionIds: string[];
};

export default function ChatBubble(props: ChatBubbleProps) {
  const { text, actionIds } = props;
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
        <div>{text}</div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          {actionIds.map((actionId) => {
            return <div>{actionId}</div>;
          })}
        </div>
      </div>
    </div>
  );
}
