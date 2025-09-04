import {
  Box,
  LinearProgress,
  linearProgressClasses,
  styled,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const TaskProgressView = ({ subTaskData }) => {
  const [completedCount, setCompletedCount] = useState(0);
  function getTaskCompleted() {
    let completedCount = subTaskData?.filter(
      (x) => x.Status === "Completed"
    ).length;

    setCompletedCount(Math.round((completedCount / subTaskData.length) * 100));
  }
  useEffect(() => {
    getTaskCompleted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subTaskData]);
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
      ...theme.applyStyles("dark", {
        backgroundColor: theme.palette.grey[800],
      }),
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: "#48bebcff",
      ...theme.applyStyles("dark", {
        backgroundColor: "#48bebcff",
      }),
    },
  }));
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 525,
          paddingY: 2,
          paddingX: 3,
          backgroundColor: "#fff",
          borderRadius: 3,
          margin: 2,
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: 500,
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" color="#000" fontWeight={600}>
            Task Progress
          </Typography>
          <Box
            sx={{
              borderRadius: 50,
              backgroundColor: "#e6fffa",
            }}
          >
            <Typography
              fontSize={12}
              fontWeight={600}
              width={100}
              align="center"
              height={10}
              padding={1}
              color="#319795"
            >
              {completedCount}% Complete
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            marginY: 1,
          }}
        >
          <BorderLinearProgress variant="determinate" value={completedCount} />
        </Box>
      </Box>
    </>
  );
};

export default TaskProgressView;
