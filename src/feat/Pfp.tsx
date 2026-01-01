import fs from "fs";
import path from "path";

const server = process.env.MONOLOGUE_SERVER;
const dir = process.env.MONOLOGUE_SERVER_DIR;

export default async function Pfp() {
  let imgSrc = `${server}/${dir}/pfp.png`;
  try {
    const res = await fetch(imgSrc);
    if (res.status === 404) {
      throw new Error("PNG not found");
    }
  } catch (err) {
    imgSrc = `${server}/${dir}/pfp.jpg`;
  } 
  
  return (
    <div className="chat-frame">
      <img
        {...{
          className: "pfp",
        }}
        src={imgSrc}
        alt="Profile Picture"
      />
    </div>
  );
}
