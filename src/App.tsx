import { lazy, Suspense, useState } from "react";
import Company from "./components/Company/Company";
// import classes from "./App.module.scss"
type Props = {};

const About = lazy(() => import("./components/About/About"));

const App = (props: Props) => {
  // console.log(classes);
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>
        +1 <span>Ff</span>
      </button>
      <div >fdsfd</div>
      <Suspense>
        <About />
      </Suspense>
      <Company />
    </div>
  );
};

export default App;
