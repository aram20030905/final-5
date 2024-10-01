import { NavLink } from "react-router-dom";
import "./navigation.css"

function Navigation(){
    return(
        <div class="menu">
            <NavLink to="about">Մեր Մասին</NavLink>
            <NavLink to="product">Ապրանքներ</NavLink>
            <NavLink to="work">Աշխատանք</NavLink>
            <NavLink to="contact">Կապ</NavLink>
        </div>
    )
}

export default Navigation