import * as React from "react";
import axios from "axios";

interface AddUserProp {
  userAdded: Function;
}

let themes = {
  error: "w-full border-2 border-red-500 bg-red-100 text-red-700 p-3",
  info: "w-full border-2 border-green-500 bg-green-100 text-green-700 p-3",
};

const AddUser: React.SFC<AddUserProp> = ({ userAdded }) => {
  let [name, setName] = React.useState<string>("");
  let [email, setEmail] = React.useState<string>("");
  let [address, setAddress] = React.useState<string>("");
  let [phoneNumber, setPhoneNumber] = React.useState<string>("");

  let [info, setInfo] = React.useState({
    show: false,
    msg: "",
    theme: "",
  });

  let addNewUser = () => {
    let data = {
      name,
      email,
      address,
      phoneNumber,
    };

    axios
      .post("https://precily-bakend.herokuapp.com/api/v1/user/createUser", data)
      .then(({ data }) => {
        if (data.result) {
          console.log("user added successfully");
          userAdded(data.user);
          setInfo({
            show: true,
            msg: "New user added successfully",
            theme: themes.info,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setInfo({
          msg: "Please give valid info to add user",
          show: true,
          theme: themes.error,
        });
      });
  };

  return (
    <div className="p-3">
      {info.show && <div className={info.theme}>{info.msg}</div>}
      <div className={"text-xl"}>Add new user</div>
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
        type="text"
        className={
          "px-3 py-2 bg-gray-100 mt-2 w-full rounded-md focus:bg-purple-100 outline-none"
        }
        placeholder="Name"
      />
      <input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type="text"
        className={`px-3 py-2 bg-gray-100 mt-2 w-full rounded-md  outline-none focus:bg-purple-100 `}
        placeholder="Email id"
      />
      <input
        onChange={(e) => {
          setAddress(e.target.value);
        }}
        type="text"
        className={
          "px-3 py-2 bg-gray-100 mt-2 w-full rounded-md focus:bg-purple-100 outline-none"
        }
        placeholder="Address"
      />

      <input
        onChange={(e) => {
          setPhoneNumber(e.target.value);
        }}
        type="text"
        className={
          "px-3 py-2 bg-gray-100 mt-2 w-full rounded-md focus:bg-purple-100 outline-none"
        }
        placeholder="Phone number"
      />
      <button
        onClick={() => {
          addNewUser();
        }}
        className={"bg-purple-500 text-white px-4 py-1 mt-3 shadow-md"}
      >
        Add user
      </button>
    </div>
  );
};

export default AddUser;
