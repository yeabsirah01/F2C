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
import { Table, Button, LoadingOverlay, Modal, Image } from "@mantine/core";
// import axiosConfig from "./axiosConfig";

const WaitlistTable = () => {
  const [waitlist, setWaitlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [modalLetterText, setModalLetterText] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [modalLetter, setModalLetter] = useState("");

  const handleFarmerClick = async (user) => {
    setIsLoading(true);
    try {
      const imageResponse = await axiosConfig.get(`/waitlist/${user.imageId}`);
      setModalImageSrc(imageResponse.data);
      setModalOpen(true);
      if (user.applicationLetterId) {
        const letterResponse = await axiosConfig.get(
          `/waitlist/${user.applicationLetterId}`
        );
        setModalLetter(letterResponse.data);
      } else {
        setModalLetter("");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalImageSrc("");
    setModalLetter("");
  };

  const handleImageClick = (imageSrc) => {
    setModalImageSrc(imageSrc);
    setModalOpen(true);
  };

  const handleLetterClick = (letterText) => {
    setModalLetterText(letterText);
    setModalOpen(true);
  };
  const token = `Bearer ${localStorage.getItem("cookie")}`;
  useEffect(() => {
    const getWaitlist = async () => {
      setIsLoading(true);
      try {
        const response = await axiosConfig.get("/waitlist");
        if (response.status === 200) {
          setWaitlist(response.data);
          console.log(response.data);
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

  console.log(waitlist);
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

  // const rows = waitlist
  //   .slice()
  //   .reverse()
  //   .map((element) => (
  //     <tr key={element.user.firstName}>
  //       <td>{element.user.firstName}</td>
  //       <td>{element.status}</td>
  //       <td>{element.symbol}</td>
  //       <td>
  //         {element.status === "pending" && (
  //           <>
  //             <button onClick={() => handleApprove(element._id)}>
  //               Approve
  //             </button>
  //             <button onClick={() => handleReject(element._id)}>Reject</button>
  //           </>
  //         )}
  //       </td>
  //     </tr>
  //   ));
  console.log(waitlist);
  return (
    <>
      <div>
        <h2>Waitlist do some sorting as you do to products</h2>
        <LoadingOverlay visible={isLoading} />
        <Table striped>
          <thead>
            <tr>
              <th>User</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {waitlist.map((item) => (
              <tr key={item._id}>
                <td
                // onClick={() => handleFarmerClick(item.user)}
                // onMouseLeave={() => setModalOpen(false)}
                >
                  {item.user.firstName}
                </td>
                <td>{item.status}</td>
                <td>
                  <img
                    src={`http://localhost:5000/${item.profilePicture}`}
                    alt="My pic "
                    crossOrigin="cross-origin"
                    width={40}
                  />
                </td>
                <td>
                  <img
                    src={`http://localhost:5000/${item.farmingLicense}`}
                    alt="My pic "
                    crossOrigin="cross-origin"
                    width={40}
                  />
                </td>
                <td>
                  <img
                    src={`http://localhost:5000/${item.nationalIDPhoto}`}
                    alt="My pic "
                    crossOrigin="cross-origin"
                    width={40}
                  />
                </td>
                <td>
                  <img
                    src={`http://localhost:5000/${item.farmSamplePhoto}`}
                    alt="My pic "
                    crossOrigin="cross-origin"
                    width={40}
                  />
                </td>

                <td>
                  {item.status === "pending" && (
                    <>
                      <Button onClick={() => handleApprove(item._id)}>
                        Approve
                      </Button>
                      <Button onClick={() => handleReject(item._id)}>
                        Reject
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Modal Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalImageSrc && <img src={modalImageSrc} alt="Modal Image" />}
            {modalLetterText && <p>{modalLetterText}</p>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal> */}
      </div>
    </>
  );
};

export default WaitlistTable;
