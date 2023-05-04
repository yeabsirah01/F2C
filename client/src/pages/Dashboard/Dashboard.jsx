// import "./styles.css";
import { FaShoppingCart } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { MdAddCircle } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import { SiShopify } from "react-icons/si";
import NavItem from "./navItem";
import React, { useState } from "react";
import { logout } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
// const Dashboard = ({ children }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };
//   const { role, firstName } = useSelector((state) => state.user);

//   return (
//     <div className={isOpen ? "layout open" : "layout"}>
//       <div className="sidebar">
//         <ul className="navItems">
//           {isOpen ? (
//             <VscChromeClose onClick={toggleSidebar} className="hamburger" />
//           ) : (
//             <GiHamburgerMenu onClick={toggleSidebar} className="hamburger" />
//           )}
//           <NavItem Icon={AiFillHome} label="Home" to="/" />

//           {role === "Farmer" && (
//             <>
//               <NavItem Icon={MdAddCircle} label="Create product" to="create" />
//               <NavItem Icon={FaUserCircle} label="Profile" to="profile" />
//             </>
//           )}
//           {role === "Admin" && (
//             <>
//               <NavItem Icon={MdAddCircle} label="Waitlist" to="wait" />
//             </>
//           )}
//           <NavItem Icon={FaShoppingCart} label="Cart" to="cart" />
//         </ul>
//         <div className="logout">
//           <BiLogOutCircle
//             onClick={() => {
//               dispatch(logout());
//             }}
//           />
//         </div>
//       </div>
//       <div className="content">
//         <header>
//           <div>
//             <SiShopify />
//             <p>Shoplify</p>
//           </div>
//           <p>Hi, {firstName}</p>
//         </header>
//         {children}
//       </div>
//     </div>
//   );
// };
import { Link } from "react-router-dom";
import {
  AppShell,
  Navbar,
  MediaQuery,
  Burger,
  ScrollArea,
} from "@mantine/core";
import { Route, Routes, useLocation } from "react-router-dom";
import CreateProduct from "./../../pages/createProduct/index";
import Profile from "./../../pages/profile";
import WaitlistTable from "./AdminDashoard/Waitlist";
import UpdateUserInfo from "./UserDashboard/UpdateUserInfo";
import AllUsers from "./AdminDashoard/AllUsers";
import UserDetails from "./AdminDashoard/UserDetails";
// import { useSelector } from "react-redux";

function Breadcrumbs() {
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter((part) => part !== "");

  return (
    <div>
      {parts.map((part, index) => (
        <span key={index}>
          {index > 0 && " > "}
          <a href={`/${parts.slice(0, index + 1).join("/")}`}>{part}</a>
        </span>
      ))}
    </div>
  );
}

function Dashboard({ children }) {
  const { role, firstName } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [opened, setOpened] = React.useState(false);

  return (
    <AppShell
      navbar={
        <Navbar width={{ base: 200 }} hiddenBreakpoint="sm" hidden={!opened}>
          {/* Navbar content */}
          <div className="sidebar">
            <ul className="navItems">
              <li>
                <Burger opened={opened} onClick={() => setOpened(!opened)} />
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/dashboard/updateuserinfo">My Profile</Link>
              </li>
              {role === "Farmer" && (
                <>
                  <li>
                    <Link to="/dashboard/create">Create product</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/profile">Profile</Link>
                  </li>
                </>
              )}
              {role === "Admin" && (
                <>
                  <li>
                    <Link to="/dashboard/waitlist">Waitlist</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/users">All Users</Link>
                  </li>
                </>
              )}
              <li>
                <Link to="/dashboard/cart">Cart</Link>
              </li>
              <li>
                <button onClick={() => dispatch(logout())}>Logout</button>
              </li>
            </ul>
          </div>
        </Navbar>
      }
    >
      <div>
        <Breadcrumbs />
      </div>
      <div>
        <Routes>
          <Route exact path="/create" element={<CreateProduct />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/waitlist" element={<WaitlistTable />} />
          <Route exact path="/users" element={<AllUsers />} />
          <Route exact path="/updateuserinfo" element={<UpdateUserInfo />} />
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </div>
    </AppShell>
  );
}

export default Dashboard;
