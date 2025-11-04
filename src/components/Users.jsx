import React, { use, useState } from "react";

const Users = ({ usersPromise }) => {
  const initialUsers = use(usersPromise);
  const [users, setUsers] = useState(initialUsers);
  console.log(usersPromise);

  const handleAddUsers = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    console.log(name, email);

    const newUser = { name, email };

    //save user to the server
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after saving user", data);
        if (data.insertedId) {
          newUser._id = data.insertedId;
          const newUsers = [...users, newUser];
          setUsers(newUsers);
          alert("users added successfuly");
          e.target.reset();
        }
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };
  return (
    <div>
      <form onSubmit={handleAddUsers}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" value="Add User" />
      </form>
      <p>-=-=-=-=-=-=-=-=-</p>
      <div>
        {users.map((user) => (
          <p key={user._id}>
            {user.name} : {user.email}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Users;
