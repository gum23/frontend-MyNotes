import { FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused } from '@react-navigation/native'

import { getTasks, deleteTask } from "../api.js";

import TaskItem from "./TaskItem.js";

const TasksList = () => {
  const [tasks, setTasks] = useState([]);
  const [refresing, setRefresing] = useState(false);

  const isFocused = useIsFocused();

  const loadTask = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTask();
  }, [isFocused]);

  const handleDelete = async (id) => {
    await deleteTask(id);
    await loadTask();
  }

  const renderItem = ({ item }) => {
    return <TaskItem task={item} handleDelete={handleDelete} />;
  };

  const onRefresh = React.useCallback(async () => {
    setRefresing(true);
    await loadTask();
    setRefresing(false);
  });

  return (
    <FlatList
      style={{ width: "100%" }}
      data={tasks}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={refresing}
          colors={["#78e08f"]}
          onRefresh={onRefresh}
          progressBackgroundColor="#0a3d62"
        />
      }
    />
  );
};

export default TasksList;
