import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ Icon, label, to }) => {
	return (
		<NavLink to={to} className={({ isActive }) => (isActive ? "active" : "")}>
			<li className="navItem" title={label}>
				<Icon />
				<p>{label}</p>
			</li>
		</NavLink>
	);
};

export default NavItem;
