import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

export default function RootPage() {
  return (
    <main>
      <NavBar />
      <Outlet />
    </main>
  );
}
