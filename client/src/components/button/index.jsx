import "./styles.css";

const Button = ({ label, children, style, size = 12, ...props }) => {
	return (
		<button className="btn" type="submit" style={{ gridColumn: `span ${size}`, ...style }} {...props}>
			{label}
			{children}
		</button>
	);
};

export default Button;
