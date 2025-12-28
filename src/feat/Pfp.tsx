export default function Pfp() {
  return (
    <div
      {...{
        style: {
          top: "50%",
          transform: "translateY(-50%)",
          position: "fixed",
          width: "50px",
          height: "50px",
          borderRadius: "8px",
          backgroundColor: "lightgray",
          zIndex: 10,
        },
      }}
    ></div>
  );
}
