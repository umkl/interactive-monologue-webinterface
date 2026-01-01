const server = process.env.MONOLOGUE_SERVER;
const dir = process.env.MONOLOGUE_SERVER_DIR;

export default async function Pfp() {
  return (
    <div className="chat-frame">
      <img
        {...{
          className: "pfp",
        }}
        src={`${server}/${dir}/pfp.png`}
      />
    </div>
  );
}
