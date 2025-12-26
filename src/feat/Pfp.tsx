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
          borderRadius: "100%",
          backgroundColor: "yellow",
          zIndex: 10,
        },
      }}
    ></div>
  );
}
