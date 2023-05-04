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

const WaitlistTable = () => {
  const [waitlist, setWaitlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedText, setSelectedText] = useState(null);

  const token = `Bearer ${localStorage.getItem("cookie")}`;
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

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setSelectedText(null);
  };

  const handleTextClick = (text) => {
    setSelectedText(text);
  };

  return (
    <>
      <div>
        <h2>Waitlist do some sorting as you do to products</h2>
        <LoadingOverlay
          loaderProps={{ size: "sm", color: "green", variant: "bars" }}
          visible={isLoading}
        />
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
                <td>{item.user.firstName}</td>
                <td>{item.status}</td>
                <td>
                  <img
                    src={`http://localhost:5000/${item.profilePicture}`}
                    alt="My pic"
                    crossOrigin="cross-origin"
                    width={40}
                    onClick={() =>
                      handleImageClick(
                        `http://localhost:5000/${item.profilePicture}`
                      )
                    }
                  />
                </td>
                <td>
                  <img
                    src={`http://localhost:5000/${item.farmingLicense}`}
                    alt="My pic"
                    crossOrigin="cross-origin"
                    width={40}
                    onClick={() =>
                      handleImageClick(
                        `http://localhost:5000/${item.farmingLicense}`
                      )
                    }
                  />
                </td>
                <td>
                  <img
                    src={`http://localhost:5000/${item.nationalIDPhoto}`}
                    alt="My pic"
                    crossOrigin="cross-origin"
                    width={40}
                    onClick={() =>
                      handleImageClick(
                        `http://localhost:5000/${item.nationalIDPhoto}`
                      )
                    }
                  />
                </td>
                <td>
                  <img
                    src={`http://localhost:5000/${item.farmSamplePhoto}`}
                    alt="My pic"
                    crossOrigin="cross-origin"
                    width={40}
                    onClick={() =>
                      handleImageClick(
                        `http://localhost:5000/${item.farmSamplePhoto}`
                      )
                    }
                  />
                </td>
                <td>
                  <button onClick={() => handleTextClick(item.letter)}>
                    click
                  </button>
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

        {selectedImage && (
          <Modal
            opened={true}
            onClose={handleCloseModal}
            title="Image"
            size="xl"
          >
            <img
              alt={"modal"}
              src={selectedImage}
              fit="contain"
              crossOrigin="cross-origin"
            />
          </Modal>
        )}
        {selectedText && (
          <Modal
            opened={true}
            onClose={handleCloseModal}
            title="Image"
            size="xl"
          >
            <p>{selectedText}</p>
          </Modal>
        )}
      </div>
    </>
  );
};

export default WaitlistTable;
