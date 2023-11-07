import axios from "axios";
import { useState } from "react";
import { AxiosResponse, AxiosError } from "axios";

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

  const [darkMode, setDarkMode] = useState(true);

  let API_KEY = import.meta.env.VITE_API_KEY;

  window.onload = () => {
    document.addEventListener("keydown", (e) => {
      if (e.key == "Enter" && !watching) {
        e.preventDefault();
        document.getElementById("submit-btn")?.click();
      }
    });
  };

  const handleURL = () => {
    setEntered(true);
    let split_chars = "?v=";
    if (/youtu.be/.test(submission)) {
      split_chars = ".be/";
    }
    setVidId(submission.split(split_chars)[1].split("&")[0]);
    setWatching(true);
  };

  const handleSearch = () => {
    setEntered(true);
    searchTube(API_KEY, submission);
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
      .then((res: AxiosResponse) => {
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
      .catch((err: AxiosError) => {
        if (
          err.code == "OVER_QUERY_LIMIT" ||
          err.code == "RESOURCE_EXHAUSTED" ||
          err.code == "quotaExceeded"
        ) {
          API_KEY = import.meta.env.VITE_BACKUP_API_KEY;
          searchTube(API_KEY, submission);
        } else {
          console.log(err);
        }
      });
  };

  const toggleMode = (type: string) => {
    let setFunc = setDarkMode;
    let state_var = darkMode;
    if (type == "color") {
      if (state_var) {
        setFunc(false);
      } else {
        setFunc(true);
      }
    }
  };

  const handleReset = () => {
    setEntered(false);
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
      {!watching && (
        <div id="submit-view" className={`contain ${entered && "hidden"}`}>
          <input
            id="vid-url"
            placeholder="url or search term"
            value={submission}
            onChange={(e) => setSubmission(e.target.value)}
            autoFocus
          ></input>
          {/youtube.com|youtu.be/.test(submission) ? (
            <button id="submit-btn" onClick={handleURL}>
              Visit
            </button>
          ) : (
            <button id="submit-btn" onClick={handleSearch}>
              Search
            </button>
          )}
          {entered && (
            <div id="search-view">
              {searchResults.map((result) => (
                <div
                  id="vid"
                  key={result.id}
                  onClick={() => handleSelect(result.id)}
                >
                  <img
                    id="vid-img"
                    src={`https://i.ytimg.com/vi/${result.id}/mqdefault.jpg`}
                  />

                  <div id="vid-info">
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
          <div className="vid-container">
            <iframe
              src={`https://www.youtube.com/embed/${vidId}?modestbranding=1&rel=0&iv_load_policy=3&color=white`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalmTube;
