import React, { useState, useEffect, useRef } from "react";
import { MdPublic, MdPrivateConnectivity } from "react-icons/md";

const AccountDetails = ({ access, userInfo, updateUser, deleteUser }) => {
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
  const [newInfo, setNewInfo] = useState({
    username: userInfo.username,
    password: userInfo.hash,
    displayName: userInfo.display_name,
    profilePicture: userInfo.profile_picture,
    profession: userInfo.profession,
    email: userInfo.email,
    bio: userInfo.bio,
  });

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
      body: newInfo,
      signal: controller.signal,
    };

    if (updateUser) {
      console.log(
        "AccountDetails - ",
        "updateUser useEffect triggered:",
        "ADMIN - PATCH /updateUsers"
      );
      fetchData(fetchURL, fetchOptions);
    }
  }, [updateUser]);

  return (
    <>
      <div className="mt-12 flex flex-wrap motion-safe:animate-fadeIn w-9/12">
        {accessIcon(userInfo.access_type)}
        <h2 className={textColours[userInfo.access_type]}>
          {userInfo.access_type}
        </h2>
        {/* <h2 className="mt-4 text-2xl italic w-3/10">{userInfo.access_type}</h2> */}

        <div className="w-2/12">
          <h2 className="mb-4 text-2xl italic">alias:</h2>
          <h2 className="mb-4 text-2xl italic">profession:</h2>
          <h2 className="mb-4 text-2xl italic">email:</h2>
          <h2 className="mb-4 text-2xl italic">bio:</h2>
        </div>

        <div className="w-5/12">
          <h2 className="mb-4 text-2xl italic">{userInfo.display_name}</h2>
          <h2 className="mb-4 text-2xl italic">{userInfo.profession}</h2>
          <h2 className="mb-4 text-2xl italic">{userInfo.email}</h2>
          <h2 className="mb-4 text-2xl italic">{userInfo.bio}</h2>
        </div>
      </div>
    </>
  );
};

export default AccountDetails;
