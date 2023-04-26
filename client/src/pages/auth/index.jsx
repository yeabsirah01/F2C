import Login from "./Login";
import Register from "./Register";
import { useState } from "react";
import "./styles.css";
import fruit1 from "../../assets/fruit1.png";
import fruit2 from "../../assets/fruit2.png";
import fruit3 from "../../assets/fruit3.png";
import fruit4 from "../../assets/fruit4.png";
import fruit5 from "../../assets/fruit5.png";
import vine from "../../assets/vine.png";

const AuthPage = () => {
	const [action, setAction] = useState("login");
	return (
		<main className="authPage">
			<div className="authPage__left">
				{action === "login" ? <Login setAction={setAction} /> : <Register setAction={setAction} />}
			</div>
			<div className={action === "login" ? "authPage__right login" : "authPage__right register"}>
				<div className="fruits">
					<img src={fruit2} alt="" />
					<img src={fruit1} alt="" />
					<img src={fruit3} alt="" />
				</div>
				<div className="fruits">
					<img src={fruit4} alt="" />
					<img src={vine} alt="" />
					<img src={fruit5} alt="" />
				</div>
				<div className="circle"></div>
				<div className="backdrop"></div>
			</div>
		</main>
	);
};

export default AuthPage;
