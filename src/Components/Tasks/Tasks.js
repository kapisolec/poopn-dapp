import { WalletDispatcher } from "../../Scripts/WalletDispatcher";
import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import tasks from "./tasks.json";
import Task from "./Task";
import "./Tasks.scss";

function Tasks(props) {
  const { wallet } = props;
  const [doneTasks, setDoneTasks] = useState({});

  const getDoneTasks = async () => {
    const response = await axios.post(
      "http://195.201.6.251:3001/getDoneTasks",
      {
        wallet: wallet,
      }
    );
    setDoneTasks(response.data);
  };

  useEffect(() => {
    getDoneTasks();
  }, []);

  function renderTasks() {
    return tasks.map((obj) => (
      <Task
        getDoneTasks={getDoneTasks}
        wallet={wallet}
        {...obj}
        key={obj.name}
        done={
          doneTasks[obj.name] || doneTasks[obj.name] === false ? true : false
        }
      />
    ));
  }

  return <div className="app-tasks">{renderTasks()}</div>;
}

export default Tasks;
