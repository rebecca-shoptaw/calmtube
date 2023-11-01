import { useState } from "react";

const EmbedTube = () => {
  const [entered, setEntered] = useState(false);
  const [vidId, setVidId] = useState("");
  const [url, setUrl] = useState("");
  const [musicView, setMusicView] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [minimal, setMinimal] = useState(false);

  const handleSubmit = () => {
    setVidId(url.split("?v=")[1].split("&")[0]);
    setEntered(true);
    setMusicView(false);
    setMinimal(false);
  };

  const toggleMode = (type: string) => {
    let setFunc = setDarkMode;
    let state_var = darkMode;
    if (type == "minimal") {
      setFunc = setMinimal;
      state_var = minimal;
    }
    if (state_var) {
      setFunc(false);
    } else {
      setFunc(true);
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
    <div id="page" className={`${darkMode ? "dark" : "light"}`}>
      <i
        className="bi bi-highlights"
        title="Light/Dark Mode"
        onClick={() => {
          toggleMode("color");
        }}
      />
      <i
        className="bi bi-noise-reduction"
        title="Minimal Mode"
        onClick={() => {
          toggleMode("minimal");
        }}
      />
      <i
        className="bi bi-highlights"
        title="Light/Dark Mode"
        onClick={() => toggleMode("color")}
      />
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
          <button
            onClick={handleReset}
            className={`${minimal ? "hidden" : ""}`}
          >
            New Video
          </button>
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
