import React from "react";
import { Loader } from "@mantine/core";

function Loading({ isLoading }) {
  return (
    <>
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          {/* <Loader color="green" variant="bars" /> */}
          <Loader />
        </div>
      )}
    </>
  );
}

export default Loading;
