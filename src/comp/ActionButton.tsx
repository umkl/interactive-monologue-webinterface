type ActionButtonProps = {
  label: string;
  value: string;
  click(value: string, ready: Promise<void>): void;
};
export default function ActionButton(props: ActionButtonProps) {
  const { label, click, value } = props;

  return (
    <button
      onClick={() => {
        click(value, Promise.resolve());
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
          textTransform: "capitalize",
          backgroundColor: "lightgray",
          fontWeight: "600",
        },
      }}
    >
      {label}
    </button>
  );
}
