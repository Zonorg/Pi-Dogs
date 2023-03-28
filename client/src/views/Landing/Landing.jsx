import { useNavigate } from "react-router-dom";
import styles from "./Landing.module.css";
import logo from "./logo.jpg"

const Landing = () => {
  const navigate = useNavigate();
  function login() {
    navigate("/home");
  }

  return (
    <div className={styles.containerLanding}>
      <img src={logo} alt="Logo" />
      <h1>The Dog Wiki</h1>
      <button className={styles.enterButton} onClick={login}>Enter</button>
    </div>
  );
};

export default Landing;
