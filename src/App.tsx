import { lazy, useState } from "react";
import classes from "./App.module.scss";
import { Link, Outlet } from "react-router-dom";
type Props = {};

const About = lazy(() => import("./components/About/About"));

const App = (props: Props) => {
  const [count, setCount] = useState(0);
  const TODO = () => {
    throw new Error("custom Error");
  };
  const handleClick = () => {
    () => setCount(count + 1);
    TODO();
  };
  return (
    <div>
      <p>{count}</p>
      <button className={classes.button} onClick={handleClick}>
        +1 <span>Ff</span>
      </button>
      <div className={classes.container}>fdsfd</div>
      <div className="">
        <Link to={"/about"}>about</Link>
        <br />
        <Link to={"/shop"}>shop</Link>
      </div>
      {/* <Suspense>
        <About />
      </Suspense>
      <Company /> */}
      {<Outlet />}
    </div>
  );
};

export default App;
