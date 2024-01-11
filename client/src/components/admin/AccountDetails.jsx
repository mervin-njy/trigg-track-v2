import React, { useState, useEffect, useRef } from "react";
import useFetch from "../../hooks/useFetch";
import {
  MdPublic,
  MdPrivateConnectivity,
  MdLibraryAddCheck,
  MdClose,
} from "react-icons/md";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import TextAreaAdmin from "../Interactions/TextAreaAdmin";
import LoadingSpinner from "../Loading/LoadingSpinner";

// START OF COMPONENT ***********************************************************************************************************************
const AccountDetails = ({
  access,
  userInfo,
  userId,
  updateUser,
  deleteUser,
  setUpdateUser,
  setDeleteUser,
  setRefreshAccounts,
}) => {
  // variables ----------------------------------------------------------------------------------------------------
  const textColours = {
    Public: "text-main2 text-2xl font-bold tracking-widest w-4/12 mr-auto",
    Private: "text-main4 text-2xl font-bold tracking-widest w-4/12 mr-auto",
  };

  const introTheme = {
    onExpand: "mt-12 flex flex-wrap motion-safe:animate-fadeIn w-9/12",
    onChange:
      "mt-12 flex flex-wrap motion-safe:animate-successfulChange w-9/12",
  };

  // let introColour = "mt-12 flex flex-wrap motion-safe:animate-fadeIn w-9/12";
  // if (confirmUpdate) {
  //   introColour =
  //     "mt-12 flex flex-wrap motion-safe:animate-successfulChange w-9/12";
  // }

  // functions ----------------------------------------------------------------------------------------------------
  function accessIcon(accessType) {
    if (accessType === "Public") {
      return <MdPublic size={30} className="mb-auto mr-auto text-main2" />;
    } else if (accessType === "Private") {
      return (
        <MdPrivateConnectivity
          size={30}
          className="mb-auto mr-auto text-main4"
        />
      );
    }
  }

  function isObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  // states -------------------------------------------------------------------------------------------------------
  const [info, setInfo] = useState({
    username: userInfo.username,
    password: userInfo.hash,
    accessType: userInfo.access_type,
    displayName: userInfo.display_name,
    profilePicture: userInfo.profile_picture,
    profession: userInfo.profession,
    email: userInfo.email,
    bio: userInfo.bio,
  });
  const [confirmUpdate, setConfirmUpdate] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { fetchData, isLoading, data, error } = useFetch();
  const [requestTypes, setRequestTypes] = useState({
    accountEndpoint: "",
    fetchMethod: "",
  });

  // event handlers -----------------------------------------------------------------------------------------------
  const handleChange = (event) => {
    setInfo((prevInfo) => {
      console.log("AccountDetails -", "handleChange, before:", prevInfo);
      return {
        ...prevInfo,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleClose = (event) => {
    event.preventDefault();

    if (updateUser) {
      setUpdateUser((prevUpdateUser) => {
        console.log(
          "AccountDetails - ",
          "toggle updateUser for:",
          event.target.id
        );

        return {
          ...prevUpdateUser,
          [userId]: !prevUpdateUser[userId],
        };
      });
    }

    if (deleteUser) {
      setDeleteUser((prevDeleteUser) => {
        console.log(
          "AccountDetails - ",
          "toggle deleteUser for:",
          event.target.id
        );

        return {
          ...prevDeleteUser,
          [userId]: !prevDeleteUser[userId],
        };
      });
    }
  };

  const handleConfirm = (event) => {
    event.preventDefault();

    if (updateUser) {
      console.log(
        "AccountDetails - ",
        "confirming change for:",
        event.target.id
      );

      setRequestTypes({
        accountEndpoint: "updateUser",
        fetchMethod: "PATCH",
      });

      setConfirmUpdate(true);
    }

    if (deleteUser) {
      console.log(
        "AccountDetails - ",
        "confirming delete for:",
        event.target.id
      );

      setRequestTypes({
        accountEndpoint: "deleteUser",
        fetchMethod: "DELETE",
      });

      setConfirmDelete(true);
    }
  };

  // effects ------------------------------------------------------------------------------------------------------
  // #1 - http request - updateUser if update changes are confirmed
  useEffect(() => {
    const controller = new AbortController();
    const endpoint = requestTypes.accountEndpoint;
    const fetchOptions = {
      method: requestTypes.fetchMethod,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      body: JSON.stringify(info),
      signal: controller.signal,
    };

    console.log(
      "AccountDetails - ",
      "http request useEffect triggered: ADMIN -",
      requestTypes
    );
    fetchData(endpoint, fetchOptions);
  }, [confirmUpdate, confirmDelete]);

  // #2 - upon http request success
  useEffect(() => {
    if (isObject(data)) {
      if (data.message.includes("update")) {
        setUpdateUser((prevUpdateUser) => {
          console.log("AccountDetails - ", "update user successful:");
          return {
            ...prevUpdateUser,
            [userId]: !prevUpdateUser[userId],
          };
        });
      } else if (data.message.includes("delete")) {
        setDeleteUser((prevDeleteUser) => {
          console.log("AccountDetails - ", "delete user successful:");
          return {
            ...prevDeleteUser,
            [userId]: !prevDeleteUser[userId],
          };
        });
      }

      setRefreshAccounts((prevRefreshAccounts) => {
        console.log(
          "AccountDetails - ",
          "toggle refreshAccounts for change:",
          data.message
        );
        // return info.username;
        return !prevRefreshAccounts;
      });
      // setRefreshAccounts(info.username);
    }
  }, [data]);

  // render component --------------------------------------------------------------------------------------------
  return (
    <>
      <div className="flex flex-wrap">
        <div
          className={confirmUpdate ? introTheme.onChange : introTheme.onExpand}
        >
          {accessIcon(info.accessType)}
          <h2 className={textColours[info.accessType]}>{info.accessType}</h2>

          <div className="w-7/12">
            {/* field 1: alias */}
            <div className="mb-4 flex flex-wrap">
              <h2 className="my-auto w-3/10 text-2xl italic">alias:</h2>
              {updateUser ? (
                <TextAreaAdmin
                  type="text"
                  name="displayName"
                  value={info.displayName}
                  width={"70%"}
                  onChange={handleChange}
                  required={true}
                />
              ) : (
                <h2 className="my-auto w-7/10 text-2xl italic">
                  {info.displayName}
                </h2>
              )}
            </div>

            {/* field 2: password */}
            <div className="mb-4 flex flex-wrap">
              <h2 className="my-auto w-3/10 text-2xl italic">password:</h2>
              {updateUser ? (
                <TextAreaAdmin
                  type="password"
                  name="password"
                  value={info.password}
                  margin={"0.2rem 0"}
                  width={"70%"}
                  onChange={handleChange}
                  required={true}
                />
              ) : (
                <h2 className="my-auto w-7/10 text-2xl italic">
                  {info.password}
                </h2>
              )}
            </div>

            {/* field 3: profession */}
            <div className="mb-4 flex flex-wrap">
              <h2 className="my-auto w-3/10 text-2xl italic">profession:</h2>
              {updateUser ? (
                <TextAreaAdmin
                  type="text"
                  name="profession"
                  value={info.profession}
                  margin={"0.2rem 0"}
                  width={"70%"}
                  onChange={handleChange}
                  required={true}
                />
              ) : (
                <h2 className="my-auto w-7/10 text-2xl italic">
                  {info.profession}
                </h2>
              )}
            </div>

            {/* field 4: email */}
            <div className="mb-4 flex flex-wrap">
              <h2 className="my-auto w-3/10 text-2xl italic">email:</h2>
              {updateUser ? (
                <TextAreaAdmin
                  type="text"
                  name="email"
                  value={info.email}
                  margin={"0.2rem 0"}
                  width={"70%"}
                  onChange={handleChange}
                  required={true}
                />
              ) : (
                <h2 className="my-auto w-7/10 text-2xl italic">{info.email}</h2>
              )}
            </div>

            {/* field 5: bio */}
            <div className="mb-4 flex flex-wrap">
              <h2 className="my-auto w-3/10 text-2xl italic">bio:</h2>
              {updateUser ? (
                <TextAreaAdmin
                  type="text"
                  name="bio"
                  value={info.bio}
                  margin={"0.2rem 0"}
                  width={"70%"}
                  onChange={handleChange}
                  required={true}
                />
              ) : (
                <h2 className="my-auto w-7/10 text-2xl italic">{info.bio}</h2>
              )}
            </div>
          </div>
        </div>

        {/* confirmation icons */}
        {updateUser && (
          <div className="mt-auto ml-auto flex flex-wrap justify-end">
            <MdClose
              size={30}
              className="mr-4 cursor-pointer text-main2 hover:text-orangeMain hover:shadow-xl"
              id={info.username}
              onClick={handleClose}
            />
            <MdLibraryAddCheck
              size={30}
              className="cursor-pointer text-main2 hover:text-greenAccent hover:shadow-xl"
              id={info.username}
              onClick={handleConfirm}
            />
          </div>
        )}
      </div>
      {deleteUser && (
        <div className="my-12 flex flex-wrap">
          <div className="w-8/12"></div>
          <h2 className="text-center text-2xl">Confirm delete?</h2>
          <div className="mt-auto ml-auto flex flex-wrap justify-end">
            <MdClose
              size={30}
              className="mr-4 cursor-pointer text-main2 hover:text-orangeMain hover:shadow-xl"
              id={info.username}
              onClick={handleClose}
            />
            <MdLibraryAddCheck
              size={30}
              className="cursor-pointer text-main2 hover:text-greenAccent hover:shadow-xl"
              id={info.username}
              onClick={handleConfirm}
            />
          </div>
        </div>
      )}
      {updateUser && deleteUser && (
        <>
          {!isLoading && data && (
            <div className="my-12">
              <h2 className="text-center text-2xl">{data.message}</h2>
            </div>
          )}

          {/* While fetching, display load spinner */}
          {isLoading && (
            <div className="mt-12 text-center">
              <LoadingSpinner />
            </div>
          )}
          {/* Display error message if fetch has an error */}
          {!isLoading && error && (
            <div className="my-12">
              <h2 className="text-center text-2xl">{error}</h2>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AccountDetails;
