import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const singers = [
  {
    id: 1,
    name: "first",
    color: "#9F70FD",
    hoverColor: "rgba(159,112,253,0.8)",
  },
  {
    id: 2,
    name: "second",
    color: "#74E291",
    hoverColor: "rgba(116,226,145,0.8)",
  },
  {
    id: 3,
    name: "third",
    color: "#29ADB2",
    hoverColor: "rgba(41,173,178,0.8)",
  },
  {
    id: 4,
    name: "fourth",
    color: "#F875AA",
    hoverColor: "rgba(248,117,170,0.8)",
  },
];

function App() {
  const [currentSinger, setCurrentSinger] = useState(null);
  const [lyrics, setLyrics] = useState([]);
  const [currentLyric, setCurrentLyric] = useState(null);
  const [lastSingerColor, setLastSingerColor] = useState(singers[0]);

  const handleOnChange = (event) => {
    setCurrentLyric(event.target.value);
  };

  const handleOnSubmit = (event) => {
    if (event.key === "Enter" && event.target.value !== "" && currentSinger) {
      if (!lyrics) {
        setLyrics([{ lyric: currentLyric, color: currentSinger.color }]);
      } else {
        setLyrics([
          ...lyrics,
          { lyric: currentLyric, color: currentSinger.color },
        ]);
      }
      setCurrentLyric("");
    }
  };

  useEffect(() => {
    if (!currentSinger || !currentLyric) {
      setCurrentLyric("");
      return;
    }
    setLyrics((prevLyrics) => [
      ...prevLyrics,
      {
        lyric: currentLyric,
        color: lastSingerColor.color,
      },
    ]);
    setCurrentLyric("");
    console.log("Yours", lyrics);
  }, [currentSinger]);

  return (
    <Grid
      container
      spacing={0}
      justifyContent={"center"}
      alignItems={"center"}
      direction={"column"}
      aria-label={"main container"}
      sx={{
        flex: 1,
        minWidth: "100vh",
        minHeight: "100vh",
      }}
    >
      <div
        className={
          " flex-row w-[1000px] justify-center items-center p-5 text-center"
        }
      >
        <h1 className={"font-bold text-3xl mb-10"}>Complete the lyrics</h1>
        <div className={"flex-row flex text-white"}>
          {singers.map((singer, id) => (
            <Link key={id} to={`/singer/${singer.name}`}>
              <Button
                onClick={() => {
                  if (currentSinger) {
                    setLastSingerColor(currentSinger);
                  }
                  setCurrentSinger(singer);
                }}
                sx={{
                  paddingY: "15px",
                  paddingX: "65px",
                  backgroundColor: singer.color,
                  color: "white",
                  borderRadius: 0,
                  ":hover": {
                    backgroundColor: singer.hoverColor,
                  },
                }}
              >
                {singer.name} SINGER
              </Button>
            </Link>
          ))}
        </div>

        {currentSinger && (
          <Box
            sx={{
              width: 1000,
              maxWidth: "100%",
              marginTop: "15px",
            }}
          >
            <TextField
              fullWidth
              id="fullWidth"
              value={currentLyric}
              onChange={handleOnChange}
              onKeyPress={handleOnSubmit}
              label="Lyrics"
              variant="outlined"
            />
          </Box>
        )}
        <div className={"mt-5"}>
          <Paper
            sx={{
              padding: 2,
              minWidth: 850,
              minHeight: 500,
              maxWidth: 1000,
              maxHeight: 550,
              overflowY: "auto",
            }}
          >
            {lyrics?.map((lyric, index) => (
              <div
                key={index}
                className={`mb-3 rounded overflow-auto p-2 text-left text-black`}
                style={{ backgroundColor: lyric.color }}
              >
                <span className={"text-xl text-white"}>{lyric.lyric}</span>
              </div>
            ))}
            {currentLyric && (
              <div
                className={`rounded overflow-auto p-2 text-left`}
                style={{ backgroundColor: currentSinger.color }}
              >
                <span className={"text-xl text-white items-start"}>
                  {currentLyric}
                </span>
              </div>
            )}
          </Paper>
        </div>
      </div>
    </Grid>
  );
}

export default App;
