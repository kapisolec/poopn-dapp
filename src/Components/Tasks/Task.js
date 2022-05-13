import { FaShareSquare } from "react-icons/fa";
import { MdOutlineClose, MdCheck } from "react-icons/md";
import axios from "axios";
import "./Task.scss";
import { Portal } from "react-portal";
import { useRef, useState, useReducer } from "react";

const tilt = (el) => {
  function handleMove(e) {
    /* Store the x position */
    const xVal = e.layerX;
    /* Store the y position */
    const yVal = e.layerY;
    const yRotation = 10 * ((xVal - width / 2) / width);
    /* Calculate the rotation along the X-axis */
    const xRotation = -10 * ((yVal - height / 2) / height);

    /* Generate string for CSS transform property */
    const string =
      "perspective(500px) scale(1.1) rotateX(" +
      xRotation +
      "deg) rotateY(" +
      yRotation +
      "deg)";

    /* Apply the calculated transformation */
    el.style.transform = string;
  }

  const height = el.clientHeight;
  const width = el.clientWidth;

  /*
   * Add a listener for mousemove event
   * Which will trigger function 'handleMove'
   * On mousemove
   */
  el.addEventListener("mousemove", handleMove);

  /* Define function a */

  /* Add listener for mouseout event, remove the rotation */
  el.addEventListener("mouseout", function () {
    el.style.transform = "perspective(500px) scale(1) rotateX(0) rotateY(0)";
  });

  /* Add listener for mousedown event, to simulate click */
  el.addEventListener("mousedown", function () {
    el.style.transform = "perspective(500px) scale(0.9) rotateX(0) rotateY(0)";
  });

  /* Add listener for mouseup, simulate release of mouse click */
  el.addEventListener("mouseup", function () {
    el.style.transform = "perspective(500px) scale(1.1) rotateX(0) rotateY(0)";
  });
};

function Task(props) {
  const { name, description, website, action, done, wallet, getDoneTasks } =
    props;
  const taskContainer = useRef(null);

  const taskDone = async () => {
    if (done) {
      console.log("task already done");
    } else {
      console.log("should be done");
      const response = await axios.post(
        "http://195.201.6.251:3001/registerTask",
        {
          wallet: wallet,
          task: name,
        }
      );
      console.log(response);
      if (response.data == true) {
        getDoneTasks();
      }
    }
  };

  const checkIfTaskDone = () => {
    if (done === true) {
      return (
        <MdCheck
          className="task-icon"
          size="25px"
          color="green"
          stroke="#000"
        />
      );
    } else {
      return (
        <MdOutlineClose
          className="task-icon"
          size="25px"
          color="red"
          stroke="#000"
        />
      );
    }
  };

  // useEffect(() => tilt(taskContainer.current), []);
  // // tilt(taskContainer.current);
  return (
    <a
      ref={taskContainer}
      className="task-container"
      onMouseEnter={() => tilt(taskContainer.current)}
      href={website}
      target="_blank"
      onClick={taskDone}
    >
      <div className="task-description">{description}</div>
      <div className="task-icons">
        {checkIfTaskDone()}
        <FaShareSquare
          className="task-icon"
          size="25px"
          color="white"
          stroke="#000"
        />
      </div>
    </a>
  );
}

export default Task;
