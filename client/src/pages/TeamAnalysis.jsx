import { useEffect, useState } from "react";
import Players from "../Players.json";
import Navbar from "../components/navbar";
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

import { Typography as MuiTypography } from "@mui/material"; // Alias Typography as MuiTypography
import {
  Tabs,
  Tab,
  TableContainer,
  Modal,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "80%",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
};

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
  const [selectedTab, setSelectedTab] = useState(0); // State to keep track of selected tab index

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue); // Update selected tab index
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setResponse1([]); // Clear Response1 array
    setResponse2([]); // Clear Response2 array
  };
  const [Response1, setResponse1] = useState([]);
  const [Response2, setResponse2] = useState([]);
  const [isRadioVisible, setIsRadioVisible] = useState({
    Team1: true,
    Team2: true,
  });

  const [data, setData] = useState({
    Team1: {
      Innings: 1,
      Name: "",
      Players: [],
      Bowlers: {},
      Overs: 50,
    },
    Team2: {
      Innings: 2,
      Name: "",
      Players: [],
      Bowlers: {},
      Overs: 50,
    },
  });

  const handleIconClick = (team) => {
    setIsRadioVisible((prevVisible) => ({
      ...prevVisible,
      [team]: !prevVisible[team],
    }));
  };

  const handleTeamChange = (teamName, teamNo) => {
    const isUniqueName = Object.values(data).every(
      (team) => team.Name !== teamName
    );

    if (isUniqueName) {
      setData((prevData) => ({
        ...prevData,
        [teamNo]: {
          ...prevData[teamNo],
          Name: teamName,
          Players:
            Players.find((team) => team.team === teamName)?.players || [],
        },
      }));
    } else {
      window.alert("Team names must be unique!");
    }
  };

  const handleCheckboxChange = (bowler, teamNo) => {
    const selectedBowlers = data[teamNo].Bowlers || {};
    const updatedBowlers = { ...selectedBowlers };

    // Toggle the selection of the bowler
    if (updatedBowlers[bowler]) {
      delete updatedBowlers[bowler];
    } else {
      updatedBowlers[bowler] = 0; // Initialize overs to 0
    }

    setData((prevData) => ({
      ...prevData,
      [teamNo]: {
        ...prevData[teamNo],
        Bowlers: updatedBowlers,
      },
    }));
  };

  const handleOversChange = (e, teamNo, bowler) => {
    const newOvers = parseInt(e.target.value, 10);

    // Ensure the total overs for a bowler doesn't exceed 10
    if (!isNaN(newOvers) && newOvers >= 0 && newOvers <= 10) {
      setData((prevData) => ({
        ...prevData,
        [teamNo]: {
          ...prevData[teamNo],
          Bowlers: {
            ...prevData[teamNo].Bowlers,
            [bowler]: newOvers,
          },
        },
      }));
    }
  };

  const calculateTotalSelectedOvers = (teamNo) => {
    const selectedBowlers = data[teamNo].Bowlers || {};
    return Object.values(selectedBowlers).reduce(
      (totalOvers, overs) => totalOvers + overs,
      0
    );
  };

  const isOversValid = (teamNo) => {
    return calculateTotalSelectedOvers(teamNo) === data[teamNo].Overs;
  };

  const getBatters = () => {
    try {
      data.Team1.Players.forEach((batsman) => {
        Object.keys(data.Team2.Bowlers).forEach((bowler) => {
          const randomBalls = Math.floor(Math.random() * 21); // Generate random number of balls

          axios
            .post("http://localhost:5000/predict_batter_strike_rate", {
              match_id_scaled: 1,
              innings: data.Team1.Innings,
              batsmen_encoded: batsman,
              bowler_encoded: bowler,
              no_of_balls: randomBalls, // Using the random number of balls here
            })
            .then((response) => {
              const newEntry = {
                batsman: batsman,
                bowler: bowler,
                runs: Math.round(response?.data?.runs), // Rounded runs
                ssr: response?.data?.strike_rate_against_bowler, // Assuming 'ssr' is received from the response
                balls: randomBalls, // Set balls property to the generated random number
              };

              // Handle the response if needed
              console.log(
                batsman,
                "vs",
                bowler,
                Math.round(response?.data?.runs)
              );
              setResponse1((prevData) => [...prevData, newEntry]); // Add newEntry to Response array
            })
            .catch((error) => {
              console.error(error);
            });
        });
      });

      data.Team2.Players.forEach((batsman) => {
        Object.keys(data.Team1.Bowlers).forEach((bowler) => {
          const randomBalls = Math.floor(Math.random() * 21); // Generate random number of balls

          axios
            .post("http://localhost:5000/predict_batter_strike_rate", {
              match_id_scaled: 1,
              innings: data.Team2.Innings,
              batsmen_encoded: batsman,
              bowler_encoded: bowler,
              no_of_balls: randomBalls, // Using the random number of balls here
            })
            .then((response) => {
              const newEntry = {
                batsman: batsman,
                bowler: bowler,
                runs: Math.round(response?.data?.runs), // Rounded runs
                ssr: response?.data?.strike_rate_against_bowler, // Assuming 'ssr' is received from the response
                balls: randomBalls, // Set balls property to the generated random number
              };

              // Handle the response if needed
              console.log(
                batsman,
                "vs",
                bowler,
                Math.round(response?.data?.runs)
              );
              setResponse2((prevData) => [...prevData, newEntry]); // Add newEntry to Response array
            })
            .catch((error) => {
              console.error(error);
            });
        });
      });
    } catch (err) {
      console.log(err);
    }
    handleOpen();
  };

  return (
    <div className="w-full h-full flex justify-center min-h-screen bg-[#320073] p-2">
      <div className="pt-24 p-4 items-center flex flex-col w-full">
        <div className="text-slate-200 text-4xl mb-10 font-bold">
          Team Analysis
        </div>
        <div className="text-slate-200 text-2xl font-semibold">
          Choose the Team and Bowler
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
              <div className="flex flex-col gap-8">
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
                        onChange={() => handleTeamChange(team.team, "Team1")}
                      />
                      {team.team}
                    </label>
                  ))}
                </div>

                <div className="flex flex-col p-4 gap-6">
                  <h2 className="text-lg text-slate-100">Bowlers Selection</h2>
                  <div>
                    {data.Team1.Players.map((bowler, index) => (
                      <div key={index} className="flex gap-4 text-gray-400">
                        <input
                          type="checkbox"
                          id={index}
                          checked={
                            data.Team1.Bowlers && bowler in data.Team1.Bowlers
                          }
                          onChange={() => handleCheckboxChange(bowler, "Team1")}
                        />
                        <label htmlFor={index}>{bowler}</label>
                        <input
                          type="number"
                          max={10}
                          className={`${
                            data.Team1.Bowlers && bowler in data.Team1.Bowlers
                              ? "flex"
                              : "hidden"
                          } w-14 rounded bg-slate-200/40`}
                          onChange={(e) =>
                            setData((prevData) => ({
                              ...prevData,
                              Team1: {
                                ...prevData.Team1,
                                Bowlers: {
                                  ...prevData.Team1.Bowlers,
                                  [bowler]: parseInt(e.target.value, 10) || 0, // Ensure it's a valid number
                                },
                              },
                            }))
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label>Total Overs:</label>
                    <input
                      type="number"
                      value={data.Team1.Overs} // Update this line
                      onChange={(e) => handleOversChange(e, "Team1")} // Pass teamNo to the handler
                    />
                  </div>
                  <div>
                    <p>
                      Total Selected Overs:{" "}
                      {calculateTotalSelectedOvers("Team1")}
                    </p>{" "}
                    {/* Pass teamNo to the function */}
                    {isOversValid("Team1") ? (
                      <p>Selection is valid!</p>
                    ) : (
                      <p style={{ color: "red" }}>
                        Total selected overs must be equal to {data.Team1.Overs}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="text-slate-200 text-2xl font-semibold">
            Choose the Team
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
              <div className="flex flex-col gap-8">
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
                        onChange={() => handleTeamChange(team.team, "Team2")}
                      />
                      {team.team}
                    </label>
                  ))}
                </div>

                <div className="flex flex-col p-4 gap-6">
                  <h2 className="text-lg text-slate-100">Bowlers Selection</h2>
                  <div>
                    {data.Team2.Players.map((bowler, index) => (
                      <div key={index} className="flex gap-4 text-gray-400">
                        <input
                          type="checkbox"
                          id={`team2-${index}`} // Use a unique identifier for Team2
                          checked={
                            data.Team2.Bowlers && bowler in data.Team2.Bowlers
                          }
                          onChange={() => handleCheckboxChange(bowler, "Team2")}
                        />
                        <label htmlFor={`team2-${index}`}>{bowler}</label>
                        <input
                          type="number"
                          max={10}
                          className={`${
                            data.Team2.Bowlers && bowler in data.Team2.Bowlers
                              ? "flex"
                              : "hidden"
                          } w-14 rounded bg-slate-200/40`}
                          onChange={(e) =>
                            setData((prevData) => ({
                              ...prevData,
                              Team2: {
                                ...prevData.Team2,
                                Bowlers: {
                                  ...prevData.Team2.Bowlers,
                                  [bowler]: parseInt(e.target.value, 10) || 0, // Ensure it's a valid number
                                },
                              },
                            }))
                          }
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label>Total Overs:</label>
                    <input
                      type="number"
                      value={data.Team2.Overs}
                      onChange={(e) => handleOversChange(e, "Team2")}
                    />
                  </div>
                  <div>
                    <p>
                      Total Selected Overs:{" "}
                      {calculateTotalSelectedOvers("Team2")}
                    </p>
                    {isOversValid("Team2") ? (
                      <p>Selection is valid!</p>
                    ) : (
                      <p style={{ color: "red" }}>
                        Total selected overs must be equal to {data.Team2.Overs}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
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
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="w-[80%] bg-slate-300 rounded">
            <Tabs value={selectedTab} onChange={handleChange}>
              <Tab label={data.Team1?.Name} />
              <Tab label={data.Team2?.Name} />
            </Tabs>

            <Paper>
              <TableContainer style={{ maxHeight: 400 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Batsman</TableCell>
                      <TableCell>Bowler</TableCell>
                      <TableCell>Runs</TableCell>
                      <TableCell>Balls</TableCell>
                      <TableCell>SR</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedTab === 0 &&
                      // Render Team 1 data when the "Team 1" tab is selected
                      Response1.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.batsman}</TableCell>
                          <TableCell>{row.bowler}</TableCell>
                          <TableCell>{row.runs}</TableCell>
                          <TableCell>{row.balls}</TableCell>
                          <TableCell>{row.ssr}</TableCell>
                        </TableRow>
                      ))}
                    {selectedTab === 1 &&
                      // Render Team 2 data when the "Team 2" tab is selected
                      Response2.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.batsman}</TableCell>
                          <TableCell>{row.bowler}</TableCell>
                          <TableCell>{row.runs}</TableCell>
                          <TableCell>{row.balls}</TableCell>
                          <TableCell>{row.ssr}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default TeamAnalysis;
