import * as React from "react";
import { User } from "../App";
import axios from "axios";

export interface UserDataProps {
  users: Array<User>;
  deleteThisUser: Function;
}

const UserData: React.SFC<UserDataProps> = ({ users, deleteThisUser }) => {
  let updateData = (userId: string | undefined) => {
    //@ts-ignore
    let name = document.getElementById(`${userId}_name`)?.innerText;
    //@ts-ignore
    let email = document.getElementById(`${userId}_email`)?.innerText;
    //@ts-ignore
    let address = document.getElementById(`${userId}_address`)?.innerText;

    //@ts-ignore
    let phoneNumber = document.getElementById(`${userId}_phone`)?.innerText;

    if (
      name !== null &&
      email !== null &&
      address !== null &&
      phoneNumber !== null
    ) {
      let newUser: User = {
        name,
        email,
        phoneNumber,
        address,
      };
      axios
        .post(
          `https://precily-bakend.herokuapp.com/api/v1/user/updateUser/${userId}`,
          newUser
        )
        .then(({ data }) => {
          if (data.result) {
            console.log("updated successfully");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  let deleteUser = (userId: string | undefined) => {
    axios
      .delete(
        `https://precily-bakend.herokuapp.com/api/v1/user/deleteUser/${userId}`
      )
      .then(({ data }) => {
        if (data.result) {
          console.log("user deleted successfully");
          deleteThisUser(userId);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col h-full overflow-scroll">
      <div className="p-3">Double click on any value to edit</div>
      <div className="-my-2 sm:-mx-6 lg:-mx-8 ">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Address
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Phone number
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => {
                  return (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div
                              id={`${user._id}_name`}
                              contentEditable
                              suppressContentEditableWarning={true}
                              className="text-sm font-medium text-gray-900"
                            >
                              {user.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          contentEditable
                          suppressContentEditableWarning={true}
                          id={`${user._id}_email`}
                          className="text-sm text-gray-900"
                        >
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          contentEditable
                          suppressContentEditableWarning={true}
                          id={`${user._id}_address`}
                          className="text-sm text-gray-900"
                        >
                          {user.address}
                        </span>
                      </td>
                      <td
                        contentEditable
                        suppressContentEditableWarning={true}
                        id={`${user._id}_phone`}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {user.phoneNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => {
                            updateData(user._id);
                          }}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => {
                            deleteUser(user._id);
                          }}
                          className="text-red-600 ml-3 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserData;
