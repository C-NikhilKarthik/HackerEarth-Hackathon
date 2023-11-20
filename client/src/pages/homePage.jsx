import { useEffect, useState } from "react";
import Players from "../Players.json";
import { VscArrowCircleRight } from "react-icons/vsc";
import axios from "axios";
import { FaChevronDown } from "react-icons/fa";
import india from "../assets/india.png";
import pakistan from "../assets/pakistan.png";
import australia from "../assets/australia.png";
import england from "../assets/england.svg";
import newzealand from "../assets/newzeland.png";
import southafrica from "../assets/sa.png";
import sriLanka from "../assets/sl.png";
import bangladesh from "../assets/b.png";
import afghanistan from "../assets/acb.png";
import netherlands from "../assets/n.png";

import Box from "@mui/material/Box";
// import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const teamFlags = {
  India: india,
  Pakistan: pakistan,
  Australia: australia,
  England: england,
  "New Zealand": newzealand,
  "South Africa": southafrica,
  "Sri Lanka": sriLanka,
  Bangladesh: bangladesh,
  Afghanistan: afghanistan,
  Netherlands: netherlands,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedTeam1, setSelectedTeam1] = useState([]);
  const [selectedTeam2, setSelectedTeam2] = useState([]);
  const [Response, setResponse] = useState({});
  const [Data, SetData] = useState({
    innings: 0,
    no_of_balls: 0,
  });
  const [isRadioVisible, setIsRadioVisible] = useState({
    Team1: true,
    Team2: true,
  });

  const handleIconClick = (team) => {
    setIsRadioVisible((prevVisible) => ({
      ...prevVisible,
      [team]: !prevVisible[team],
    }));
  };

  function getBatters() {
    try {
      axios
        .post("https://hacker-earth-api.onrender.com/predict_batter_strike_rate", {
          match_id_scaled: 1,
          innings: Data.innings,
          batsmen_encoded: data.Team1.Player,
          bowler_encoded: data.Team2.Player,
          no_of_balls: Data.no_of_balls,
        })
        .then((response) => {
          setResponse(response?.data);
          // console.log(Response)
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
    handleOpen();
  }

  const [data, setData] = useState({
    Team1: {
      Name: "",
      Player: "",
    },
    Team2: {
      Name: "",
      Player: "",
    },
  });

  const handleTeam1Change = (selectedTeam) => {
    if (selectedTeam !== data.Team2.Name) {
      setData((prevData) => ({
        ...prevData,
        Team1: {
          ...prevData.Team2,
          Name: selectedTeam,
        },
      }));
    } else {
      // Optionally, you can display an error message or take another action
      window.alert("Team1 and Team2 cannot be the same!");
    }
  };

  const handleTeam2Change = (selectedTeam) => {
    // Check if Team1 and Team2 are not the same
    if (selectedTeam !== data.Team1.Name) {
      setData((prevData) => ({
        ...prevData,
        Team2: {
          ...prevData.Team2,
          Name: selectedTeam,
        },
      }));
    } else {
      // Optionally, you can display an error message or take another action
      window.alert("Team1 and Team2 cannot be the same!");
    }
  };

  const handleTeam1Player = (data) => {
    setData((prevData) => ({
      ...prevData,
      Team1: {
        ...prevData.Team1,
        Player: data,
      },
    }));
  };

  const handleTeam2Player = (data) => {
    setData((prevData) => ({
      ...prevData,
      Team2: {
        ...prevData.Team2,
        Player: data,
      },
    }));
  };

  useEffect(() => {
    if (data.Team1.Name) {
      setSelectedTeam1(
        Players.find((team) => team.team === data.Team1.Name)?.players || []
      );
    }

    if (data.Team2.Name) {
      setSelectedTeam2(
        Players.find((team) => team.team === data.Team2.Name)?.players || []
      );
    }
  }, [data.Team1.Name, data.Team2.Name]);

  return (
    <div className="w-full h-full flex justify-center min-h-screen bg-[#320073] p-2">
      <div className="pt-24 p-4 items-center flex flex-col w-full">
        <div className="text-slate-200 text-4xl mb-10 font-bold">
          Batting Analysis
        </div>

        <div className="text-slate-200 text-2xl font-semibold">
          Choose the Team and Batsmen
        </div>

        <div className="flex items-center w-full flex-col gap-10 p-6">
          <div className="flex items-center rounded border border-gray-500 w-full max-w-[1000px] flex-col">
            <div className="flex items-center gap-10 bg-gray-300/50 w-full p-3 relative justify-center">
              <div className="text-slate-300">Batting Team</div>
              <div className="text-gray-100 font-semibold">
                {data?.Team1?.Name}
              </div>
              {data.Team1.Name && teamFlags[data.Team1.Name] && (
                <img
                  src={teamFlags[data.Team1.Name]}
                  alt={`${data.Team1.Name} Flag`}
                  className="rounded-full w-10 h-10"
                />
              )}
              <div
                className="absolute right-4 text-slate-200 cursor-pointer"
                onClick={() => handleIconClick("Team1")}
              >
                <FaChevronDown />
              </div>
            </div>
            {isRadioVisible["Team1"] && (
              <div className="flex w-full flex-wrap gap-4 p-4">
                {Players.map((team, index) => (
                  <label
                    key={index}
                    className="flex whitespace-nowrap items-center text-gray-400 gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      value={team.team}
                      checked={data.Team1.Name === team.team}
                      onChange={() => handleTeam1Change(team.team)}
                    />
                    {team.team}
                  </label>
                ))}
              </div>
            )}
          </div>

          <select
            className="rounded w-60 text-gray-800 bg-slate-300/60 backdrop-blur outline-none"
            onChange={(e) => handleTeam1Player(e.target.value)}
          >
            <option value="" disabled selected>
              -- Select Player --
            </option>
            {selectedTeam1.map((player, index) => (
              <option
                className="rounded text-gray-800 bg-slate-300/60 backdrop-blur outline-none"
                value={player}
                key={index}
              >
                {player}
              </option>
            ))}
          </select>

          <div className="text-slate-200 text-2xl font-semibold">
            Choose the Team and Bowler
          </div>

          <div className="flex items-center rounded border border-gray-500 w-full max-w-[1000px] flex-col">
            <div className="flex items-center gap-10 bg-gray-300/50 w-full p-3 relative justify-center">
              <div className="text-slate-300">Bowling Team</div>
              <div className="text-gray-100 font-semibold">
                {data?.Team2?.Name}
              </div>
              {data.Team2.Name && teamFlags[data.Team2.Name] && (
                <img
                  src={teamFlags[data.Team2.Name]}
                  alt={`${data.Team2.Name} Flag`}
                  className="rounded-full w-10 h-10"
                />
              )}
              <div
                className="absolute right-4 text-slate-200 cursor-pointer"
                onClick={() => handleIconClick("Team2")}
              >
                <FaChevronDown />
              </div>
            </div>
            {isRadioVisible["Team2"] && (
              <div className="flex w-full flex-wrap gap-4 p-4">
                {Players.map((team, index) => (
                  <label
                    key={index}
                    className="flex whitespace-nowrap items-center text-gray-400 gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      value={team.team}
                      checked={data.Team2.Name === team.team}
                      onChange={() => handleTeam2Change(team.team)}
                    />
                    {team.team}
                  </label>
                ))}
              </div>
            )}
          </div>

          <select
            className="rounded w-60 text-gray-800 bg-slate-300/60 backdrop-blur outline-none"
            onChange={(e) => handleTeam2Player(e.target.value)}
          >
            <option value="" disabled selected>
              -- Select Player --
            </option>
            {selectedTeam2.map((player, index) => (
              <option
                className="rounded text-gray-800 bg-slate-300/60 backdrop-blur outline-none"
                value={player}
                key={index}
              >
                {player}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-4">
          <label className="text-slate-400">Innings</label>

          <label className="flex whitespace-nowrap items-center text-gray-400 gap-2 cursor-pointer">
            <input
              type="radio"
              value="1st Innings"
              checked={1 === Data.innings}
              onChange={() =>
                SetData((prevData) => ({
                  ...prevData,
                  innings: 1,
                }))
              }
            />
            1st Innings
          </label>

          <label className="flex whitespace-nowrap items-center text-gray-400 gap-2 cursor-pointer">
            <input
              type="radio"
              value="2nd Innings"
              checked={2 === Data.innings}
              onChange={() =>
                SetData((prevData) => ({
                  ...prevData,
                  innings: 2,
                }))
              }
            />
            2nd Innings
          </label>
        </div>

        <div className="flex gap-4 my-6">
          <label className="flex whitespace-nowrap items-center text-gray-400 gap-2">
            Select number of Balls
          </label>
          <input
            onChange={(e) =>
              SetData((prevData) => ({
                ...prevData,
                no_of_balls: Number(e.target.value), // Parse to an integer base 10
              }))
            }
            className="rounded w-20 text-gray-800 bg-slate-300/60 backdrop-blur outline-none"
            type="number"
            required
          ></input>
        </div>

        <button
          onClick={getBatters}
          className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-md px-5 py-2.5 flex items-center mt-4"
        >
          Start Predicting <VscArrowCircleRight className="ml-2 text-3xl" />
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Runs: {Math.round(Response?.runs)}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Striker rate against bowler :
              {Response?.strike_rate_against_bowler}
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default HomePage;
