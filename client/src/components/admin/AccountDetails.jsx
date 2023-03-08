import React, { useState, useEffect, useRef } from "react";
import useFetch from "../../hooks/useFetch";
import {
  MdPublic,
  MdPrivateConnectivity,
  MdLibraryAddCheck,
  MdClose,
  MdCheck,
} from "react-icons/md";
import TextAreaAdmin from "../Interactions/TextAreaAdmin";

const AccountDetails = ({
  access,
  userInfo,
  userId,
  updateUser,
  deleteUser,
  setUpdateUser,
}) => {
  // variables ----------------------------------------------------------------------------------------------------
  const textColours = {
    Public: "text-main2 text-2xl font-bold tracking-widest w-4/12 mr-auto",
    Private: "text-main4 text-2xl font-bold tracking-widest w-4/12 mr-auto",
  };

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

  // states -------------------------------------------------------------------------------------------------------
  const [info, setInfo] = useState({
    username: userInfo.username,
    password: userInfo.hash,
    displayName: userInfo.display_name,
    profilePicture: userInfo.profile_picture,
    profession: userInfo.profession,
    email: userInfo.email,
    bio: userInfo.bio,
  });
  const [confirmUpdate, setConfirmUpdate] = useState(false);
  const { fetchData, isLoading, data, error } = useFetch();

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
    setUpdateUser((prevUpdateUser) => {
      console.log("AccountDetails - ", "toggle updateUser for:", userId);
      return {
        ...prevUpdateUser,
        [userId]: !prevUpdateUser[userId],
      };
    });
  };
  const handleConfirm = (event) => {
    event.preventDefault();
    console.log("AccountDetails - ", "confirming change for:", userId);
  };

  // effects ------------------------------------------------------------------------------------------------------
  // #1 - http request - updateUser dependent on updateUser truthy
  useEffect(() => {
    const controller = new AbortController();
    const fetchURL = `http://127.0.0.1:5001/updateUser`;
    const fetchOptions = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      body: info,
      signal: controller.signal,
    };

    if (confirmUpdate) {
      console.log(
        "AccountDetails - ",
        "updateUser useEffect triggered:",
        "ADMIN - PATCH /updateUsers"
      );
      fetchData(fetchURL, fetchOptions);
    }
  }, [confirmUpdate]);

  return (
    <div className="flex flex-wrap">
      <div className="mt-12 flex flex-wrap motion-safe:animate-fadeIn w-9/12">
        {accessIcon(userInfo.access_type)}
        <h2 className={textColours[userInfo.access_type]}>
          {userInfo.access_type}
        </h2>
        {/* <h2 className="mt-4 text-2xl italic w-3/10">{userInfo.access_type}</h2> */}

        <div className="w-7/12">
          {/* field 1: alias */}
          <div className="flex flex-wrap mb-4">
            <h2 className="w-3/10 my-auto text-2xl italic">alias:</h2>
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
              <h2 className="my-auto text-2xl italic">{info.displayName}</h2>
            )}
          </div>

          {/* field 2: alias */}
          <div className="flex flex-wrap mb-4">
            <h2 className="w-3/10 my-auto text-2xl italic">profession:</h2>
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
              <h2 className="my-auto text-2xl italic">{info.profession}</h2>
            )}
          </div>

          {/* field 3: email */}
          <div className="flex flex-wrap mb-4">
            <h2 className="w-3/10 my-auto text-2xl italic">email:</h2>
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
              <h2 className="my-auto text-2xl italic">{info.email}</h2>
            )}
          </div>

          {/* field 4: bio */}
          <div className="flex flex-wrap mb-4">
            <h2 className="w-3/10 my-auto text-2xl italic">bio:</h2>
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
              <h2 className="my-auto text-2xl italic">{info.bio}</h2>
            )}
          </div>
        </div>
      </div>

      {/* confirmation icons */}
      <div className="flex flex-wrap justify-end mt-auto ml-auto">
        <MdClose
          size={30}
          className="mr-4 cursor-pointer text-main2 hover:text-orangeMain hover:shadow-xl"
          id="Close"
          onClick={handleClose}
        />
        <MdLibraryAddCheck
          size={30}
          className="cursor-pointer text-main2 hover:text-greenAccent hover:shadow-xl"
          id="Confirm"
          onClick={handleConfirm}
        />
      </div>
    </div>
  );
};

export default AccountDetails;
