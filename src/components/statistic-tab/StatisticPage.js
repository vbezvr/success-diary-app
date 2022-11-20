import { get, ref } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js"; 
import { useDispatch, useSelector } from "react-redux";
import { context } from "../..";
import { GeneralProgressBar } from "./GeneralProgressBar";
import { setHabitData } from "../../features/actions";


function StatisticPage() {
  const { db } = useContext(context);
  const { uid } = useSelector((state) => state.userConfig);
  const {data} = useSelector((state) => state.habitData);
  const dispatch = useDispatch();
  const habitRef = ref(db, `habits/${uid}`);

  useEffect(() => {
    get(habitRef).then((snap) => {
      if (snap.exists()) {
        const snapSize = Object.keys(snap.val()).length;
        const habitDataSize = Object.keys(data).length;
        if (habitDataSize < snapSize) {
          dispatch(setHabitData(snap.val()));
        }
      }
    })
  })

//   const monthsLabels = {
//     '01': "January",
//     '02': "February",
//     '03': "March",
//     '04': "April",
//     '05': "May",
//     '06': "June",
//     '07': "July",
//     '08': "August",
//     '09': "September",
//     '10': "October",
//     '11': " November",
//   };

//   const data = handleDatesByCount(dates);
//   const labels = Object.keys(data).map((elem) => monthsLabels[elem]);

//   const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top',
//     },
//     title: {
//       display: true,
//       text: 'Month history',
//     },
//   },
// };

//   const barData = {
//     labels,
//     datasets: [
//       {
//         data: Object.values(data),
//         borderColor: "#36A2EB",
//         backgroundColor: "rgba(255, 99, 132, 0.5)",
//       },
//     ],
//   };
  

//   function handleDatesByCount(data) {
//     if (data) {
//       const monthsData = {};
//       data = data.map((elem) => elem.split('-'));
//       data.forEach((date) => {
//         const month = date[1];
//         if (month in monthsData) {
//           monthsData[month] += 1;
//         } else {
//           monthsData[month] = 1;
//         }
//       });

//       return monthsData;
//     }
//   }

//   useEffect(() => {
//     get(habitRef).then((snap) => {
//       if (snap.exists()) {
//         const snapSize = snap.val().length - 1;
//         if (dates.length !== snapSize) {
//           setDates(snap.val().slice(1));
//         }

//       }
//     });
//   });

  return (
    // <div
    //   style={{
    //     width: '600px',
    //   }}
    // >
    //   <Bar data={barData} options={options} />
    // </div>
    <div className="content-wrapper">
      <GeneralProgressBar />
      <div className="wrapper-left">
        
      </div>
    </div>
  );
}

export { StatisticPage };
