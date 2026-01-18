import "./landing.css";
import logo from "../../assets/servigo-logo.png";

function Landing() {
  return (
    <div className="landing-container">
      <img src={logo} alt="ServiGo Logo" className="logo" />

      <div className="button-group">
        <button className="btn login">LOG IN</button>
        <button className="btn signup">SIGN UP</button>
      </div>
    </div>
  );
}

export default Landing;