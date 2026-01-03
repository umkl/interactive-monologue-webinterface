type ActionButtonProps = {
  action: ActionButton;
  click(value: string, ready: Promise<void>): void;
};
export default function ActionButton(props: ActionButtonProps) {
  const { action, click} = props;

  return (
    <button
      onClick={() => {
        click(action.event.value, Promise.resolve());
      }}
      {...{
        style: {
          appearance: "none",
          borderRadius: "8px",
          padding: "16px 20px",
          border: "0px solid black",
          fontFamily: "inherit",
          fontSize: "16px",
          display: "flex",
          lineHeight: "16px",
          cursor: "pointer",
          backgroundColor: "whitesmoke",
          fontWeight: "600",
        },
      }}
    >
      {action.label}
      {action.event.type === "link" ? (
        <span style={{ marginLeft: "8px" }}>🔗</span>
      ) : null}
    </button>
  );
}
