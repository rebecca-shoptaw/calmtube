import { useState } from "react";

const EmbedTube = () => {
  const [entered, setEntered] = useState(false);
  const [vidId, setVidId] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = () => {
    setVidId(url.split("?v=")[1]);
    setEntered(true);
  };

  const handleReset = () => {
    setEntered(false);
    setVidId("");
    setUrl("");
  };

  return (
    <div>
      {!entered && (
        <div id="submit-view" className={`contain ${entered && "hidden"}`}>
          <input
            id="vid-url"
            placeholder="url"
            onChange={(e) => setUrl(e.target.value)}
            autoFocus
          ></input>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
      {entered && (
        <div id="vid-box" className={`contain ${!entered && "hidden"}`}>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${vidId}?modestbranding=1&rel=0&iv_load_policy=3&color=white`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <button onClick={handleReset}>New Video</button>
        </div>
      )}
    </div>
  );
};

export default EmbedTube;
