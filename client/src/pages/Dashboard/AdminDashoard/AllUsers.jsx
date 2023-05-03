import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosConfig from "../../../axiosConfig";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axiosConfig.get("/users");
        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input type="text" placeholder="Search by name" onChange={handleSearch} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
