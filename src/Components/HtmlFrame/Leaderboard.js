import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable"; // The default
import { Portal } from "react-portal";
import { MdClose } from "react-icons/md";
import { AiOutlineDrag } from "react-icons/ai";
import { isMobile } from "react-device-detect";
import "./HtmlFrame.scss";
import axios from "axios";

function Leaderboard(props) {
  const { setshowFrame } = props;
  const [leaderboard, setLeaderboard] = useState([]);
  const offset = isMobile ? { x: "-50%", y: "-40%" } : { x: "-50%", y: "-50%" };
  const nodeRef = useRef(null);
  const dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    useGrouping: true,
    maximumFractionDigits: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tradingVolume = await axios.get(
          "https://cockper.site/get-leaderboard"
        );
        console.log(tradingVolume.data);
        setLeaderboard([...tradingVolume.data]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const closeFrame = () => {
    setTimeout(() => {
      setshowFrame(false);
    }, 0);
  };

  const renderLeaderboard = () => {
    const jsx = leaderboard.slice(0, 10).map((el) => {
      const arr = Object.entries(el);
      const wallet = arr[0][0];
      const rewards = arr[0][1];
      return (
        <div className="task-container reward-wallet">
          <span className="wallet">{wallet}</span>
          <span className="rewards">{rewards.toFixed(3)} ETH</span>
        </div>
      );
    });
    return jsx;
  };

  return (
    <Portal node={document && document.getElementById("root")}>
      <Draggable
        nodeRef={nodeRef}
        positionOffset={offset}
        handle=".frame-draggable"
      >
        <div ref={nodeRef} className="frame-container tokenInfo">
          <header className="frame-header">
            <div className="frame-frameInfo">Leaderboard</div>
            <AiOutlineDrag className="frame-draggable" size="35px" />
            <MdClose className="frame-exit" size="35px" onClick={closeFrame} />
          </header>
          <div className="frame-content rewards">
            {leaderboard.length > 0 ? renderLeaderboard() : null}
          </div>
        </div>
      </Draggable>
    </Portal>
  );
}

export default Leaderboard;
