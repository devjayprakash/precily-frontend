import React, { useEffect, useState } from "react";
import AddUser from "./components/addUser";
import BottomContent from "./components/bottomContent";
import Navbar from "./components/navbar";
import UserData from "./components/usersData";
import axios from "axios";

export interface User {
  _id?: string;
  name: string | null | undefined;
  email: string | null | undefined;
  address: string | null | undefined;
  phoneNumber: string | null | undefined;
}

enum ResizeType {
  BOTTOM,
  SIDE,
}

function App() {
  let [sideNavWidth, setSideNavWidth] = useState(324);
  let [topPartHeight, setTopPartHeight] = useState(401);
  let [allUsers, setAllUsers] = useState<Array<User>>([]);

  useEffect(() => {
    axios
      .get("https://precily-bakend.herokuapp.com/api/v1/user/allUsers")
      .then(({ data }) => {
        if (data.result === true) {
          setAllUsers(data.users);
        }
      })
      .catch((err: Error) => {
        console.log("err");
      });
  }, []);

  let resize = (e: any, type: ResizeType) => {
    if (type === ResizeType.SIDE) {
      setSideNavWidth(e.x);
    } else {
      if (e.y + window.scrollY > 400) {
        setTopPartHeight(e.y + window.scrollY);
      }
    }
  };

  let resizerMouseDown = (type: ResizeType) => {
    document.onmousemove = (e) => {
      resize(e, type);
    };
    document.onmouseup = (e) => {
      document.onmousemove = null;
      document.onmouseup = null;
      resize(e, type);
    };
  };

  return (
    <>
      <div className={"bg-gray-100"}>
        <div
          style={{
            height: topPartHeight,
          }}
          className={"flex w-full pt-14 flex-row p-3"}
        >
          <div
            id={"sidebav"}
            style={{
              flexBasis: sideNavWidth,
            }}
            className={"w-3/12 bg-white shadow-md rounded-md"}
          >
            <AddUser
              userAdded={(user: User) => {
                setAllUsers([...allUsers, user]);
              }}
            />
          </div>
          <div
            className={"hover:bg-gray-300 w-2"}
            style={{ cursor: "e-resize" }}
            onMouseDown={() => resizerMouseDown(ResizeType.SIDE)}
          ></div>
          <div
            className={"flex-grow bg-white shadow-md md:mt-0 mt-3  rounded-md"}
          >
            <UserData
              deleteThisUser={(userId: string) => {
                setAllUsers(
                  allUsers.filter((user) => {
                    return user._id !== userId;
                  })
                );
              }}
              users={allUsers}
            />
          </div>
        </div>
        <div
          onMouseDown={() => resizerMouseDown(ResizeType.BOTTOM)}
          className={"w-full h-2 hover:bg-gray-300"}
          style={{ cursor: "n-resize" }}
        ></div>
        <BottomContent />
        <Navbar />
      </div>
    </>
  );
}

export default App;
