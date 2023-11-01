import axios from "axios";
import { useState } from "react";
import config from "./config.tsx";
//import { ClipLoader } from "react-spinners";

const CalmTube = () => {
  const [entered, setEntered] = useState(false);
  const [watching, setWatching] = useState(false);
  const [vidId, setVidId] = useState("");

  const [submission, setSubmission] = useState("");
  const [searchResults, setSearchResults] = useState<
    Array<{
      id: string;
      title: string;
      channel: string;
    }>
  >([]);

  const [musicView, setMusicView] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [minimal, setMinimal] = useState(false);

  const API_KEY = config.secure_api_key;

  const handleSubmit = () => {
    setEntered(true);
    setMusicView(false);
    if (/youtube.com|youtu.be/.test(submission)) {
      let split_chars = "?v=";
      if (/youtu.be/.test(submission)) {
        split_chars = ".be/";
      }
      setVidId(submission.split(split_chars)[1].split("&")[0]);
      setWatching(true);
    } else {
      searchTube(API_KEY, submission);
    }
  };

  const handleSelect = (id: string) => {
    setVidId(id);
    setWatching(true);
  };

  const searchTube = (key: string, search: string) => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?key=${key}&type=video&part=snippet&maxResults=20&q=${search}`
      )
      .then((res) => {
        setSearchResults(
          res.data.items.map(
            (vid: { snippet: any; id: { videoId: string } }) => {
              console.log(vid);
              return {
                id: vid.id.videoId,
                title: vid.snippet.title
                  .replace(/&amp;/g, "&")
                  .replace(/&#39;/g, "'")
                  .replace(/&quot;/g, '"'),
                channel: vid.snippet.channelTitle,
              };
            }
          )
        );
      })
      .catch((err) => console.log(err));
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
    setMinimal(false);
    setWatching(false);
    setSearchResults([]);
    setVidId("");
    setSubmission("");
  };

  return (
    <div id="page" className={`${darkMode ? "dark" : "light"}`}>
      {entered && (
        <i className="bi bi-arrow-left" title="Back" onClick={handleReset} />
      )}
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
      {!watching && (
        <div id="submit-view" className={`contain ${entered && "hidden"}`}>
          <input
            id="vid-url"
            placeholder="url or search term"
            value={submission}
            onChange={(e) => setSubmission(e.target.value)}
            autoFocus
          ></input>
          <button onClick={handleSubmit}>Submit</button>
          {entered && (
            <div id="search-view">
              {searchResults.map((result) => (
                <div
                  id="vid"
                  key={result.id}
                  onClick={() => handleSelect(result.id)}
                >
                  {!minimal && (
                    <img
                      id="vid-img"
                      src={`https://i.ytimg.com/vi/${result.id}/mqdefault.jpg`}
                    />
                  )}
                  <div id="vid-info" className={`${minimal ? "wide" : ""}`}>
                    <div id="vid-title">{result.title}</div>
                    <div id="vid-channel">{result.channel}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {watching && (
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

export default CalmTube;
