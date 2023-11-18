/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Players from "../Players.json";
import { FaChevronDown } from "react-icons/fa";
import india from '../assets/india.png';
import pakistan from '../assets/pakistan.png';
import australia from '../assets/australia.png';
import england from '../assets/england.svg';
import newzealand from '../assets/newzeland.png';
import southafrica from '../assets/sa.png';
import sriLanka from '../assets/sl.png';
import bangladesh from '../assets/b.png';
import afghanistan from '../assets/acb.png';
import netherlands from '../assets/n.png';

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

const TeamAnalysis = () => {
  const [selectedTeam1, setSelectedTeam1] = useState([]);
  const [selectedTeam2, setSelectedTeam2] = useState([]);
  const [innings, setInnings] = useState("");
  const [isRadioVisible, setIsRadioVisible] = useState({
    Team1: true,
    Team2: true
  });

  const handleIconClick = (team) => {
    setIsRadioVisible((prevVisible) => ({
      ...prevVisible,
      [team]: !prevVisible[team],
    }));
  };

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
      Team1: {
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
      <div className="pt-44 p-4 items-center flex flex-col w-full">
        <div className="text-slate-200 text-2xl font-semibold">
          Choose the Team and Player
        </div>

        <div className="flex items-center w-full flex-col gap-10 p-6">
          <div className="flex items-center rounded border border-gray-500 w-full max-w-[1000px] flex-col">
            <div className="flex items-center gap-10 bg-gray-300/50 w-full p-3 relative justify-center">
              <div className="text-slate-300">Team 1</div>
              <div className="text-gray-100 font-semibold">{data?.Team1?.Name}</div>
              {data.Team1.Name && teamFlags[data.Team1.Name] && (
                <img
                  src={teamFlags[data.Team1.Name]}
                  alt={`${data.Team1.Name} Flag`}
                  className="rounded-full w-10 h-10"
                />
              )}
              <div
                className="absolute right-4 text-slate-200 cursor-pointer"
                onClick={() => handleIconClick("Team1")}>
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

          {/* <select
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
          </select> */}


          <div className="flex items-center rounded border border-gray-500 w-full max-w-[1000px] flex-col">
            <div className="flex items-center gap-10 bg-gray-300/50 w-full p-3 relative justify-center">
              <div className="text-slate-300">Team 2</div>
              <div className="text-gray-100 font-semibold">{data?.Team2?.Name}</div>
              {data.Team2.Name && teamFlags[data.Team2.Name] && (
                <img
                  src={teamFlags[data.Team2.Name]}
                  alt={`${data.Team2.Name} Flag`}
                  className="rounded-full w-10 h-10"
                />
              )}
              <div
                className="absolute right-4 text-slate-200 cursor-pointer"
                onClick={() => handleIconClick("Team2")}>
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

          {/* <select
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
          </select> */}
        </div>

        <div className="flex gap-4">
          <label className="text-slate-400">Innings</label>

          <label
            className="flex whitespace-nowrap items-center text-gray-400 gap-2 cursor-pointer"
          >
            <input
              type="radio"
              value="1st Innings"
              checked={"1" === innings}
              onChange={() => setInnings("1")}
            />
            1st Innings
          </label>

          <label
            className="flex whitespace-nowrap items-center text-gray-400 gap-2 cursor-pointer"
          >
            <input
              type="radio"
              value="2nd Innings"
              checked={"2" === innings}
              onChange={() => setInnings("2")}
            />
            2nd Innings
          </label>
        </div>
      </div>
    </div>
  );
};

export default TeamAnalysis;
