/* eslint-disable */
import { WalletDispatcher } from "../../Scripts/WalletDispatcher";
import { FaInfo } from "react-icons/fa";
// import { connector } from "../../Scripts/trustWallet";
import { MdLeaderboard } from "react-icons/md";
import { ReactComponent as Wallet } from "../../svgs/wallet.svg";
import { ReactComponent as UniswapLogo } from "../../svgs/Uniswap_Logo.svg";
import { ReactComponent as DextoolsIcon } from "../../svgs/dextools.svg";
import { ReactComponent as DexscreenerIcon } from "../../svgs/dexscreener.svg";
import { useEffect, useState } from "react";
import "./App.scss";
import HtmlFrame from "../HtmlFrame/HtmlFrame";
import Dexscreener from "../HtmlFrame/Dexscreener";
import Uniswap from "../HtmlFrame/Uniswap";
import Leaderboard from "../HtmlFrame/Leaderboard";
import { Portal } from "react-portal";

const walletDispatcher = new WalletDispatcher();

function App() {
  const [wallet, setwallet] = useState(null);
  const [connected, setConnected] = useState(false);
  const [showFrame, setShowFrame] = useState(false);
  const [showUniswap, setShowUniswap] = useState(false);
  const [showDex, setShowDex] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const checkIfConnected = async () => {
    if (connected) return;
    try {
      const wallet = await walletDispatcher.initialize();
      if (wallet) {
        setwallet(wallet);
        setConnected(true);
      }
    } catch (error) {}
  };

  useEffect(() => {
    checkIfConnected();
  }, []);

  const renderHtmlFrame = () => {
    if (showFrame) {
      return (
        <HtmlFrame
          setshowFrame={setShowFrame}
          wallet={wallet}
          showFrame={showFrame}
        />
      );
    }
    return null;
  };

  const renderUniswap = () => {
    if (showUniswap) {
      return <Uniswap setshowFrame={setShowUniswap} showFrame={showUniswap} />;
    }
    return null;
  };

  const renderDextools = () => {
    if (showDex) {
      return <Dexscreener setshowFrame={setShowDex} showFrame={showDex} />;
    }
    return null;
  };

  const renderLeaderboard = () => {
    if (showLeaderboard) {
      return (
        <Leaderboard
          setshowFrame={setShowLeaderboard}
          showFrame={showLeaderboard}
        />
      );
    }
    return null;
  };

  return (
    <div className="app">
      {/* <img className="app-cherry left top" src={cherryBranch} alt="" />
      <img className="app-cherry right top" src={cherryBranch} alt="" /> */}
      <Portal node={document && document.getElementById("root")}>
        <div className="video-container">
          <video width="100%" height="100%" autoPlay muted>
            <source src="/poopvid.mp4" type="video/mp4" />
          </video>
        </div>
      </Portal>
      <header className="app-header">
        <MdLeaderboard
          className="app-leaderboard"
          size="40px"
          color="white"
          onClick={() => setShowLeaderboard(true)}
        />
        <FaInfo
          className="app-info"
          size="35px"
          color="white"
          onClick={() => setShowFrame(true)}
        />
        <DextoolsIcon className="app-dextools" />
        <DexscreenerIcon
          className="app-dexscreener"
          onClick={() => setShowDex(true)}
        />
        <UniswapLogo
          className="app-uniswap"
          onClick={() => setShowUniswap(true)}
        />
        <Wallet
          className="app-wallet"
          onClick={() => setwallet(checkIfConnected())}
        />
      </header>

      {renderHtmlFrame()}
      {renderUniswap()}
      {renderDextools()}
      {renderLeaderboard()}
    </div>
  );
}

export default App;
