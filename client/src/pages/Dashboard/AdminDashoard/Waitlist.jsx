// import { useEffect, useState } from "react";
// import axios from "axios";
import axiosConfig from "../../../axiosConfig";

// const WaitlistTable = () => {
//   const [waitlist, setWaitlist] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const getWaitlist = async () => {
//       try {
//         const response = await axiosConfig.get("/waitlist");

//         if (response.status === 200) {
//           setWaitlist(response.data);
//           setIsLoading(false);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     getWaitlist();
//   }, []);

//   const handleApprove = async (waitlistId) => {
//     try {
//       const response = await axiosConfig.put(`/waitlist/${waitlistId}`, {
//         status: "approved",
//       });

//       if (response.status === 200) {
//         // Update the waitlist with the new status
//         const updatedWaitlist = waitlist.map((item) =>
//           item._id === response.data._id
//             ? { ...item, status: response.data.status }
//             : item
//         );
//         setWaitlist(updatedWaitlist);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleReject = async (waitlistId) => {
//     try {
//       const response = await axiosConfig.put(`/waitlist/${waitlistId}`, {
//         status: "rejected",
//       });

//       if (response.status === 200) {
//         // Remove the waitlist item from the list
//         const updatedWaitlist = waitlist.filter(
//           (item) => item._id !== waitlistId
//         );
//         setWaitlist(updatedWaitlist);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h2>Waitlist</h2>
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>User</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {waitlist.map((item) => (
//               <tr key={item._id}>
//                 <td>{item.user.firstame}</td>
//                 <td>{item.status}</td>
//                 <td>
//                   {item.status === "pending" && (
//                     <>
//                       <button onClick={() => handleApprove(item._id)}>
//                         Approve
//                       </button>
//                       <button onClick={() => handleReject(item._id)}>
//                         Reject
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default WaitlistTable;

import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, LoadingOverlay } from "@mantine/core";
// import axiosConfig from "./axiosConfig";

const WaitlistTable = () => {
  const [waitlist, setWaitlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getWaitlist = async () => {
      setIsLoading(true);
      try {
        const response = await axiosConfig.get("/waitlist");
        if (response.status === 200) {
          setWaitlist(response.data);
        }
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    getWaitlist();
  }, []);

  const handleApprove = async (waitlistId) => {
    try {
      const response = await axiosConfig.put(`/waitlist/${waitlistId}`, {
        status: "approved",
      });

      if (response.status === 200) {
        // Update the waitlist with the new status
        const updatedWaitlist = waitlist.map((item) =>
          item._id === response.data._id
            ? { ...item, status: response.data.status }
            : item
        );
        setWaitlist(updatedWaitlist);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (waitlistId) => {
    try {
      const response = await axiosConfig.put(`/waitlist/${waitlistId}`, {
        status: "rejected",
      });

      if (response.status === 200) {
        // Remove the waitlist item from the list
        const updatedWaitlist = waitlist.filter(
          (item) => item._id !== waitlistId
        );
        setWaitlist(updatedWaitlist);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const ths = (
    <tr>
      <th>Element position</th>
      <th>Element status</th>
      <th>Symbol</th>
      <th>Atomic mass</th>
    </tr>
  );

  const rows = waitlist
    .slice()
    .reverse()
    .map((element) => (
      <tr key={element.user.firstName}>
        <td>{element.user.firstName}</td>
        <td>{element.status}</td>
        <td>{element.symbol}</td>
        <td>
          {element.status === "pending" && (
            <>
              <button onClick={() => handleApprove(element._id)}>
                Approve
              </button>
              <button onClick={() => handleReject(element._id)}>Reject</button>
            </>
          )}
        </td>
      </tr>
    ));

  return (
    <>
      <Table striped highlightOnHover captionSide="bottom">
        <caption>Some elements from periodic table</caption>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
        <tfoot>{ths}</tfoot>
      </Table>
    </>
  );
};

export default WaitlistTable;
