import { useState } from "react";

const EmbedTube = () => {
  const [entered, setEntered] = useState(false);
  const [vidId, setVidId] = useState("");
  const [url, setUrl] = useState("");
  const [musicView, setMusicView] = useState(false);
  const [mode, setMode] = useState("light");

  const handleSubmit = () => {
    setVidId(url.split("?v=")[1]);
    setEntered(true);
    setMusicView(false);
  };

  const toggleMode = () => {
    if (mode == "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  /*const handleMusic = () => {
    if (musicView) {
      setMusicView(false);
    } else {
      setMusicView(true);
    }
  };*/

  const handleReset = () => {
    setEntered(false);
    setVidId("");
    setUrl("");
  };

  return (
    <div id="page" className={`${mode == "dark" ? "dark" : "light"}`}>
      <i className="bi bi-highlights" onClick={toggleMode} />
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
          <div className={`vid-container ${musicView ? "hidden" : ""}`}>
            <iframe
              src={`https://www.youtube.com/embed/${vidId}?modestbranding=1&rel=0&iv_load_policy=3&color=white`}
              title="YouTube video player"
              className={`${musicView ? "hidden" : ""}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <button onClick={handleReset}>New Video</button>
          {/*<button
            onClick={handleMusic}
            className={`${!musicView ? "deselect" : "selected"}`}
          >
            Music Only
      </button>*/}
        </div>
      )}
    </div>
  );
};

export default EmbedTube;
