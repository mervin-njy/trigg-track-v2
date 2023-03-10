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
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../Loading/LoadingSpinner";
import AccountDetails from "./AccountDetails";

// START OF COMPONENT ***********************************************************************************************************************
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

    // if not null
    // if (refreshAccounts) {
    //   if (!updateUser[refreshAccounts]) {
    //     toast(`You have made changes to account: ${refreshAccounts}.`, {
    //       position: toast.POSITION.TOP_CENTER,
    //       theme: "dark",
    //       autoClose: 10000,
    //       hideProgressBar: true,
    //       className:
    //         "bg-main7 text-greenAccent border-2 border-main3 rounded-4",
    //     });
    //   }

    //   if (!deleteUser[refreshAccounts]) {
    //     toast(`You have deleted account: ${refreshAccounts}.`, {
    //       position: toast.POSITION.TOP_CENTER,
    //       theme: "dark",
    //       autoClose: 10000,
    //       hideProgressBar: true,
    //       className: "bg-main7 text-orangeMain border-2 border-main3 rounded-4",
    //     });
    //   }
    // }
  }, [refreshAccounts]); // triggered upon confirmUpdate / confirmDelete in child component

  // #2 - once data is populated, set states (showDetails, updateUser, deleteUser) of each data item to false
  useEffect(() => {
    // a. if data fetching is a success => set states for expanding details & whether user is being updated/deleted
    console.log("AccountManager - ", "2nd useEffect: ", "setting states");
    if (data) {
      setUsersData(data);
      data.map((user) => {
        // only at the beginning when states are empty => set them to false (refetching data will not touch them)
        if (Object.keys(showDetails).length === 0) {
          setshowDetails((prevShowDetails) => {
            console.log("onMount: showDetails false for user:", user);
            return { ...prevShowDetails, [user.username]: false };
          });
        } else {
          setshowDetails((prevShowDetails) => {
            console.log("onRerender: showDetails false for user:", user);
            return {
              ...prevShowDetails,
              [user.username]: prevShowDetails[user.username],
            };
          });
        }

        if (Object.keys(updateUser).length === 0) {
          setUpdateUser((prevUpdateUser) => {
            console.log("onMount: updateUser false for user:", user);
            return { ...prevUpdateUser, [user.username]: false };
          });
        } else {
          setUpdateUser((prevUpdateUser) => {
            console.log("onRerender: updateUser same for user:", user);
            return {
              ...prevUpdateUser,
              [user.username]: prevUpdateUser[user.username],
            };
          });
        }

        if (Object.keys(deleteUser).length === 0) {
          setDeleteUser((prevDeleteUser) => {
            console.log("onMount: deleteUser same for user:", user);
            return { ...prevDeleteUser, [user.username]: false };
          });
        } else {
          setDeleteUser((prevDeleteUser) => {
            console.log("onRerender: deleteUser false for user:", user);
            return {
              ...prevDeleteUser,
              [user.username]: prevDeleteUser[user.username],
            };
          });
        }
      });
    }
  }, [data]);

  // render component --------------------------------------------------------------------------------------------
  return (
    <div>
      {/* display confirmation messages */}
      {/* <ToastContainer /> */}
      {/* Display date's contents if fetched success and loaded */}
      {!isLoading && usersData && (
        <div>
          {usersData.map((user, id) => {
            return (
              <div
                key={id}
                className="h-max py-8 px-12 border-solid border-1 rounded-xl mx-2 my-10 hover:motion-safe:animate-pulsateLittle hover:border-orangeMain hover:border-2 hover:shadow-3xl"
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
                  {!showDetails[user.username] && (
                    <FaCaretDown
                      size={30}
                      className="cursor-pointer my-auto ml-auto hover:font-bold hover:text-yellowMain"
                      id={user.username}
                      onClick={handleShow}
                    />
                  )}
                  {/* show more options when viewing details */}
                  {showDetails[user.username] && (
                    <div className="flex flex-wrap w-1/12 justify-between">
                      <FaUserEdit
                        size={30}
                        className="cursor-pointer my-auto hover:font-bold hover:text-blueAccent"
                        id={user.username}
                        onClick={handleEdit}
                      />
                      <MdRemoveModerator
                        size={30}
                        className="cursor-pointer my-auto hover:font-bold hover:text-orangeMain"
                        id={user.username}
                        onClick={handleDelete}
                      />
                      <FaCaretUp
                        size={30}
                        className="cursor-pointer my-auto hover:font-bold hover:text-yellowMain"
                        id={user.username}
                        onClick={handleShow}
                      />
                    </div>
                  )}
                </div>

                {/* show details if id is true => *** rerender on updateUser */}
                {showDetails[user.username] && (
                  <AccountDetails
                    access={adminInfo.access}
                    userInfo={user}
                    userId={user.username}
                    updateUser={updateUser[user.username]} // showFields
                    deleteUser={deleteUser[user.username]}
                    setUpdateUser={setUpdateUser}
                    setDeleteUser={setDeleteUser}
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
