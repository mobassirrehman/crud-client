import "./App.css";
import Users from "./components/Users";

const usersPromise = fetch("http://localhost:3000/users").then((res) =>
  res.json()
);
function App() {
  return (
    <>
      <h1>Simple Crud</h1>
      <Users usersPromise={usersPromise}></Users>
    </>
  );
}

export default App;
