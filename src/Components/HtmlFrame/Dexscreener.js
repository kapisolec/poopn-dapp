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
              url="https://dexscreener.com/bsc/0x321fd4ef6b02b49f86d3f76a132b65fff73c7e96"
              sandbox=""
            />
          </div>
        </div>
      </Draggable>
    </Portal>
  );
}

export default HtmlFrame;
