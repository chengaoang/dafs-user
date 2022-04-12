import './MyButton.css';
import { NavLink } from "react-router-dom";

function MyButton ({to,children,onClick,style}){
    return (
        <NavLink
            // TODO
            className={"myButton"}
            to={to}
            onClick={onClick}
        >
            {children}
        </NavLink>
    )
}
export default MyButton;
