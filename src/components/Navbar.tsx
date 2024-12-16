import {  Button, Title } from "rizzui";
import logo from "../assets/LOGO.svg"
interface NavbarProps {
    onLogout: () => void;
}

const Navbar = ({ onLogout }: NavbarProps) => {
    return (
        <nav className="flex items-center justify-between  p-4">

            <img src={logo} className=" 3xl:h-8" />
            <Title as="h4">Dashboard</Title>
            <Button variant="text" onClick={onLogout} className="text-primary underline">Sign Out</Button>
        </nav>
    );
};

export default Navbar;
