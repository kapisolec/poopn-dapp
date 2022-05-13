import { useRef } from "react";
import Draggable from "react-draggable"; // The default
import { Portal } from "react-portal";
import { MdClose } from "react-icons/md";
import { AiOutlineDrag } from "react-icons/ai";
import { isMobile } from "react-device-detect";
import Iframe from "react-iframe";
import "./HtmlFrame.scss";

function HtmlFrame(props) {
  const { setshowFrame } = props;
  const nodeRef = useRef(null);

  const closeFrame = () => {
    setTimeout(() => {
      setshowFrame(false);
    }, 0);
  };

  const offset = isMobile ? { x: "-50%", y: "-40%" } : { x: "-50%", y: "-50%" };

  return (
    <Portal node={document && document.getElementById("root")}>
      <Draggable
        nodeRef={nodeRef}
        positionOffset={offset}
        handle=".frame-draggable"
      >
        <div ref={nodeRef} className="frame-container">
          <header className="frame-header">
            <div className="frame-frameInfo">Dexscreener</div>
            <AiOutlineDrag className="frame-draggable" size="35px" />
            <MdClose className="frame-exit" size="35px" onClick={closeFrame} />
          </header>
          <div className="frame-content">
            <Iframe
              url="https://dexscreener.com/ethereum/0x11b815efb8f581194ae79006d24e0d814b7697f6"
              sandbox=""
            />
          </div>
        </div>
      </Draggable>
    </Portal>
  );
}

export default HtmlFrame;
