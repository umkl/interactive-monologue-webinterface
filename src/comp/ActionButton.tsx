type ActionButtonProps = {
  label: string;
  value: string;
  click(value: string, ready: Promise<void>): void;
};
export default function ActionButton(props: ActionButtonProps) {
  const { label, click, value } = props;

  return (
    <button
      onClick={() => click(value, Promise.resolve())}
      {...{
        style: {
          borderRadius: "4px",
          backgroundColor: "white",
          padding: "4px",
        },
      }}
    >
      {label}
    </button>
  );
}
