import { useEffect, useState } from "react";
import Players from "../Players.json";
import Navbar from "../components/navbar";
import { VscArrowCircleRight } from 'react-icons/vsc';
import axios from 'axios'
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

const TeamAnalysis= () => {
  const [selectedTeam1, setSelectedTeam1] = useState([]);
  const [selectedTeam2, setSelectedTeam2] = useState([]);
  const [Data,SetData] = useState({
    innings: 0,
    no_of_balls: 0,
  })
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

  function getTeam1Batting(){
    try{
      axios.post("http://localhost:5000/predict_bowler_economy",{
        "match_id": 65646,
        "venue": "Bellerive Oval",
        "innings": Data.innings,
        "batting_team": data.Team2.Name,
        "bowler": data.Team1.Player
      }).then((response) => {
        console.log(response)
      }).catch((error)=> {
        console.log(error)
      })
    }
    catch(err){
      console.log(err)
    }
  }

  const [data, setData] = useState({
    Team1: {
      Name: "",
    },
    Team2: {
      Name: "",
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
      <div className="pt-44 p-4 items-center flex flex-col w-full">
        <div className="text-slate-200 text-2xl font-semibold">
          Choose the Team and Bowler
        </div>

        <div className="flex items-center w-full flex-col gap-10 p-6">
          <div className="flex items-center rounded border border-gray-500 w-full max-w-[1000px] flex-col">
            <div className="flex items-center gap-10 bg-gray-300/50 w-full p-3 relative justify-center">
              <div className="text-slate-300">Batting Team</div>
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

          <div className="text-slate-200 text-2xl font-semibold">
            Choose the Team
          </div>


          <div className="flex items-center rounded border border-gray-500 w-full max-w-[1000px] flex-col">
            <div className="flex items-center gap-10 bg-gray-300/50 w-full p-3 relative justify-center">
              <div className="text-slate-300" >Bowling Team</div>
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

        </div>

        <div className="flex gap-4">
          <label className="text-slate-400">Innings</label>

          <label
            className="flex whitespace-nowrap items-center text-gray-400 gap-2 cursor-pointer"
          >
            <input
              type="radio"
              value="1st Innings"
              checked={1 === Data.innings}
              onChange={() => SetData((prevData)=>({
                ...prevData,
                innings:1
              }))}
            />
            1st Innings
          </label>

          <label
            className="flex whitespace-nowrap items-center text-gray-400 gap-2 cursor-pointer"
          >
            <input
              type="radio"
              value="2nd Innings"
              checked={2 === Data.innings}
              onChange={() => SetData((prevData)=>({
                ...prevData,
                innings:2
              }))}            
            />
            2nd Innings
          </label>
        </div>


        <button
          onClick={getBatters}
          className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-md px-5 py-2.5 flex items-center mt-4"
        >
          Start Predicting <VscArrowCircleRight className="ml-2 text-3xl" />
        </button>  

      </div>
    </div>
  );
};

export default TeamAnalysis;
