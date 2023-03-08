import React, { useState, useEffect } from "react";
import { FaCaretDown, FaCaretUp, FaUserEdit } from "react-icons/fa";
import { MdPersonRemove, MdRemoveModerator } from "react-icons/md";
import ButtonAdmin from "../Interactions/ButtonAdmin";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../Loading/LoadingSpinner";

const AccountManager = ({ adminInfo }) => {
  // states -------------------------------------------------------------------------------------------------------
  const [showDetails, setshowDetails] = useState({});
  const { fetchData, isLoading, data, error } = useFetch();

  //   event handlers ---------------------------------------------------------------------------------------------
  const handleShow = (event) => {
    console.log("AccountManager -", `showing details: ${event.target.id}.`);
    console.log("AccountManage -", "current details:", showDetails);
    setshowDetails((prevShowDetails) => {
      return {
        ...prevShowDetails,
        [event.target.id]: !prevShowDetails[event.target.id],
      };
    });
  };

  // effects ------------------------------------------------------------------------------------------------------
  // #1 - http request - on mount
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
  }, []);

  // #2 - once data is populated, set state (showDetails) of each data item to false
  useEffect(() => {
    // a. if data fetching is a success => set state for user info + navigate to home
    console.log("AccountManager -", "setting state:", data);
    if (data) {
      data.map((user, id) => {
        return setshowDetails((prevShowDetails) => {
          console.log("showDetails false for user:", user);
          return { ...prevShowDetails, [id]: false };
        });
      });
    }
  }, [data]);

  // render component --------------------------------------------------------------------------------------------
  return (
    <div>
      {/* Display date's contents if fetched success and loaded */}
      {!isLoading && data && (
        <div>
          {data.map((user, id) => {
            return (
              <div
                key={id}
                className="h-max py-8 px-12 border-solid border-2 rounded-xl mx-2 my-10 hover:motion-safe:animate-pulsateLittle hover:border-4 hover:shadow-3xl"
              >
                {/* show main header  */}
                <div className="flex flex-wrap justify-between">
                  <div className="flex flex-wrap justify-start w-9/12">
                    <h2 className="text-2xl font-bold tracking-widest w-3/10">
                      {user.user_type}
                    </h2>
                    <h2 className="text-2xl font-bold tracking-widest w-3/10">
                      {user.username}
                    </h2>
                  </div>

                  {/* w/ options to view details (when false / not being shown) */}
                  {!showDetails[id] && (
                    <FaCaretDown
                      size={30}
                      className="cursor-pointer my-auto ml-auto hover:font-bold hover:text-main2"
                      id={id}
                      onClick={handleShow}
                    />
                  )}
                  {/* show more options when viewing details */}
                  {showDetails[id] && (
                    <div className="flex flex-wrap w-1/12 justify-between">
                      <FaUserEdit
                        size={30}
                        className="cursor-pointer my-auto hover:font-bold hover:text-main2"
                        id={id}
                        onClick={handleShow}
                      />
                      <MdRemoveModerator
                        size={30}
                        className="cursor-pointer my-auto hover:font-bold hover:text-main2"
                        id={id}
                        onClick={handleShow}
                      />
                      <FaCaretUp
                        size={30}
                        className="cursor-pointer my-auto hover:font-bold hover:text-main2"
                        id={id}
                        onClick={handleShow}
                      />
                    </div>
                  )}
                </div>

                {/* show details if id is true */}
                {showDetails[id] && (
                  <div className="mt-12 motion-safe:animate-fadeIn">
                    <h2 className="text-xl italic w-3/10">{user.bio}</h2>
                  </div>
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
