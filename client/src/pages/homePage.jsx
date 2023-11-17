import { useEffect, useState } from "react";
import Players from "../Players.json";
import Navbar from "../components/navbar";

const HomePage = () => {
  const [selectedTeam1, setSelectedTeam1] = useState([]);
  const [selectedTeam2, setSelectedTeam2] = useState([]);
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
      <Navbar />
      <div className="pt-44 p-4 items-center flex flex-col w-full">
        <div className="text-slate-200 text-2xl font-semibold">
          Choose the Team and Player
        </div>

        <div className="flex w-full gap-10 p-6">
          <div className="w-full flex items-center gap-6 flex-col">
            <div className="text-slate-400">Team 1</div>
            <select
              className="rounded w-60 text-gray-800 bg-slate-300/60 backdrop-blur outline-none"
              onChange={(e) => handleTeam1Change(e.target.value)}
            >
              {Players.map((team, index) => (
                <option
                  className="rounded text-gray-800 bg-slate-300/60 backdrop-blur outline-none"
                  value={team.team}
                  key={index}
                >
                  {team.team}
                </option>
              ))}
            </select>

            <select
              className="rounded w-60 text-gray-800 bg-slate-300/60 backdrop-blur outline-none"
              onChange={(e) => handleTeam1Player(e.target.value)}
            >
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
          </div>

          <div className="w-full flex items-center gap-6 flex-col">
            <div className="text-slate-400">Team 2</div>
            <select
              className="rounded w-60 text-gray-800 bg-slate-300/60 backdrop-blur outline-none"
              onChange={(e) => handleTeam2Change(e.target.value)}
            >
              {Players.map((team, index) => (
                <option
                  className="rounded text-gray-800 bg-slate-300/60 backdrop-blur outline-none"
                  value={team.team}
                  key={index}
                >
                  {team.team}
                </option>
              ))}
            </select>

            <select
              className="rounded w-60 text-gray-800 bg-slate-300/60 backdrop-blur outline-none"
              onChange={(e) => handleTeam2Player(e.target.value)}
            >
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
        </div>
      </div>
    </div>
  );
};

export default HomePage;
