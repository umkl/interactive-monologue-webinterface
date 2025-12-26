type ActionButtonProps = {
  label: string;
  click(label: string): void;
};
export default function ActionButton(props: ActionButtonProps) {
  const { label, click } = props;

  return (
    <button
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
