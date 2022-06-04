import { Bar } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import { BarchartActions } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { Chart as ChartJS } from "chart.js/auto";

const BarChart = ({ posts }) => {
  const labelsMonth = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dispatch = useDispatch();
  const postsMonthly = useSelector(
    (state) => state.BarchartReducer.postsMonthly
  );
  useEffect(() => {
    let l = posts.length;
    // console.log("Barchart Comp", posts);
    let tempmonthlyPosts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (l > 0) {
      let i = 0;
      let month;
      while (i < l) {
        month = parseInt(posts[i].published_at.substring(5, 7));
        tempmonthlyPosts[month - 1] = tempmonthlyPosts[month - 1] + 1;
        i = i + 1;
      }
      console.log(tempmonthlyPosts);
      dispatch(BarchartActions.assignPostsMonthly(tempmonthlyPosts));
    }
  }, [posts]);

  return (
    <div>
      {posts && (
        <Bar
          data={{
            labels: labelsMonth,
            datasets: [
              {
                label: "Posts Per Month",
                data: postsMonthly,
                backgroundColor: ["rgba(99, 99, 95)"],
              },
            ],
          }}
        />
      )}
    </div>
  );
};

export default BarChart;
