interface PfpProps { 
  basePath: string;
}

export default async function Pfp(props: PfpProps) {
  let imgSrc =  `${props.basePath}/pfp.png`;
  try {
    const res = await fetch(imgSrc);
    if (res.status === 404) {
      throw new Error("PNG not found");
    }
  } catch (err) {
    imgSrc = `${props.basePath}/pfp.jpg`;
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
