type ActionButtonProps = {
  label: string;
  value: string;
  click(value: string): void;
};
export default function ActionButton(props: ActionButtonProps) {
  const { label, click, value } = props;

  return (
    <button
      onClick={() => click(value)}
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
