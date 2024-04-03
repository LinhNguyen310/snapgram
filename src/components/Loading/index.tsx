import Spline from "@splinetool/react-spline";
import { MultiStepLoader } from "../ui/multi-step-loader";

const loadingStates = [
    {
      text: "Buying a condo",
    },
    {
      text: "Travelling in a flight",
    },
    {
      text: "Meeting Tyler Durden",
    },
    {
      text: "He makes soap",
    },
    {
      text: "We goto a bar",
    },
    {
      text: "Start a fight",
    },
    {
      text: "We like it",
    },
    {
      text: "Welcome to F**** C***",
    },
  ];
const Loading = () => {
  return (
    <div className="flex">
        <div className="h-screen">
            <Spline scene="https://prod.spline.design/symgusU-38fgRHSL/scene.splinecode" />
        </div>
        <div className="items-center">
            <h1>hllp</h1>
        </div>
    </div>
  );
};

export default Loading;