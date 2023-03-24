import React, { useState } from "react";
import { postKontrak } from "./api";
import fs from "fs";

const ExampleComponent = () => {
  const [data, setData] = useState("");

  const handlePostKontrak = async () => {
    const response = await postKontrak({
      /* your data here */
    });
    setData(response);
    fs.writeFile("output.txt", response, (err) => {
      if (err) console.log(err);
      console.log("Data written to file.");
    });
  };

  return (
    <div>
      <button onClick={handlePostKontrak}>Post Kontrak</button>
      <p>Response: {data}</p>
    </div>
  );
};

export default ExampleComponent;
