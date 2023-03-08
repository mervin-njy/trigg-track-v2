import React, { useState, useEffect } from "react";
import {
  FaUserSecret,
  FaHouseUser,
  FaUserTie,
  FaCaretDown,
  FaCaretUp,
  FaUserEdit,
} from "react-icons/fa";
import { MdRemoveModerator } from "react-icons/md";
// import ButtonAdmin from "../Interactions/ButtonAdmin";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../Loading/LoadingSpinner";
import AccountDetails from "./AccountDetails";

const AccountManager = ({ adminInfo }) => {
  // variables ----------------------------------------------------------------------------------------------------
  const textColours = {
    Admin: "text-orangeMain text-2xl font-bold tracking-widest w-4/12 mr-auto",
    "Health Logger":
      "text-purpleAccent text-2xl font-bold tracking-widest w-4/12 mr-auto",
    "Service Provider":
      "text-greenAccent text-2xl font-bold tracking-widest w-4/12 mr-auto",
  };

  // functions ----------------------------------------------------------------------------------------------------
  function userIcon(userType) {
    if (userType === "Admin") {
      return (
        <FaUserSecret size={30} className="my-auto mr-auto text-orangeMain" />
      );
    } else if (userType === "Health Logger") {
      return (
        <FaHouseUser size={30} className="my-auto mr-auto text-purpleAccent" />
      );
    } else if (userType === "Service Provider") {
      return (
        <FaUserTie size={30} className="my-auto mr-auto text-greenAccent" />
      );
    }
  }
  // states -------------------------------------------------------------------------------------------------------
  const [showDetails, setshowDetails] = useState({});
  const [updateUser, setUpdateUser] = useState({});
  const [deleteUser, setDeleteUser] = useState({});
  const [refreshAccounts, setRefreshAccounts] = useState(false);
  const [usersData, setUsersData] = useState(null);
  const { fetchData, isLoading, data, error } = useFetch();

  //   event handlers ---------------------------------------------------------------------------------------------
  const handleShow = (event) => {
    event.preventDefault();
    console.log("AccountManager -", `showing details: ${event.target.id}.`);
    console.log("AccountManager -", "current details:", showDetails);
    setshowDetails((prevShowDetails) => {
      return {
        ...prevShowDetails,
        [event.target.id]: !prevShowDetails[event.target.id],
      };
    });
  };

  const handleEdit = (event) => {
    event.preventDefault();
    setUpdateUser((prevUpdateUser) => {
      console.log("set updateUser true for:", event.target.id);
      return {
        ...prevUpdateUser,
        [event.target.id]: !prevUpdateUser[event.target.id],
      };
    });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    setDeleteUser((prevDeleteUser) => {
      console.log("set deleteUser true for :", event.target.id);
      return {
        ...prevDeleteUser,
        [event.target.id]: !prevDeleteUser[event.target.id],
      };
    });
  };

  // effects ------------------------------------------------------------------------------------------------------
  // #1 - http request - on mount, refreshAccounts
  useEffect(() => {
    const controller = new AbortController();
    const fetchURL = `http://127.0.0.1:5001/getUsers`;
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${adminInfo.access}`,
      },
      signal: controller.signal,
    };
    console.log(
      "AccountManager - ",
      "1st useEffect triggered:",
      "ADMIN - GET /getUsers"
    );
    fetchData(fetchURL, fetchOptions);
  }, [refreshAccounts]); // triggered upon confirmUpdate / confirmDelete in child component

  // #2 - once data is populated, set state (showDetails) of each data item to false
  useEffect(() => {
    // a. if data fetching is a success => set state for user info + navigate to home
    console.log("AccountManager -", "2nd useEffect: ", "setting states");
    if (data) {
      setUsersData(data);
      data.map((user, id) => {
        if (Object.keys(showDetails).length === 0) {
          setshowDetails((prevShowDetails) => {
            console.log("showDetails false for user:", user);
            return { ...prevShowDetails, [id]: false };
          });
        }

        if (Object.keys(updateUser).length === 0) {
          setUpdateUser((prevUpdateUser) => {
            console.log("updateUser false for user:", user);
            return { ...prevUpdateUser, [id]: false };
          });
        }

        if (Object.keys(deleteUser).length === 0) {
          setDeleteUser((prevDeleteUser) => {
            console.log("deleteUser false for user:", user);
            return { ...prevDeleteUser, [id]: false };
          });
        }
      });
    }
  }, [data]);

  // render component --------------------------------------------------------------------------------------------
  return (
    <div>
      {/* Display date's contents if fetched success and loaded */}
      {!isLoading && usersData && (
        <div>
          {usersData.map((user, id) => {
            return (
              <div
                key={id}
                className="h-max py-8 px-12 border-solid border-2 rounded-xl mx-2 my-10 hover:motion-safe:animate-pulsateLittle hover:border-4 hover:shadow-3xl"
              >
                {/* show main header  */}
                <div className="flex flex-wrap justify-between">
                  <div className="flex flex-wrap justify-start w-9/12">
                    {userIcon(user.user_type)}
                    <h2 className={textColours[user.user_type]}>
                      {user.user_type}
                    </h2>
                    <h2 className="text-2xl font-bold tracking-widest w-7/12">
                      {user.username}
                    </h2>
                  </div>

                  {/* w/ options to view details (when false / not being shown) */}
                  {!showDetails[id] && (
                    <FaCaretDown
                      size={30}
                      className="cursor-pointer my-auto ml-auto hover:font-bold hover:text-yellowMain"
                      id={id}
                      onClick={handleShow}
                    />
                  )}
                  {/* show more options when viewing details */}
                  {showDetails[id] && (
                    <div className="flex flex-wrap w-1/12 justify-between">
                      <FaUserEdit
                        size={30}
                        className="cursor-pointer my-auto hover:font-bold hover:text-blueAccent"
                        id={id}
                        onClick={handleEdit}
                      />
                      <MdRemoveModerator
                        size={30}
                        className="cursor-pointer my-auto hover:font-bold hover:text-orangeMain"
                        id={id}
                        onClick={handleDelete}
                      />
                      <FaCaretUp
                        size={30}
                        className="cursor-pointer my-auto hover:font-bold hover:text-yellowMain"
                        id={id}
                        onClick={handleShow}
                      />
                    </div>
                  )}
                </div>

                {/* show details if id is true */}
                {showDetails[id] && (
                  <AccountDetails
                    access={adminInfo.access}
                    userInfo={user}
                    userId={id}
                    updateUser={updateUser[id]}
                    deleteUser={deleteUser[id]}
                    setUpdateUser={setUpdateUser}
                    setRefreshAccounts={setRefreshAccounts}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* While fetching, display load spinner */}
      {isLoading && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}

      {/* Display error message if fetch has an error */}
      {!isLoading && error && (
        <div>
          <h2>{error}</h2>
        </div>
      )}
    </div>
  );
};

export default AccountManager;
