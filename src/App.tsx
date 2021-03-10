import React from "react";
import "./App.css";
// @ts-ignore
import * as ml5 from "ml5";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const imageRef = useRef<any>();
  const [results, setResults] = useState([]);
  const [file, setFile] = useState();
  const fileRef = useRef<HTMLInputElement>(null);
  const classifyImg = () => {
    const classifier = ml5.imageClassifier("MobileNet", () =>
      console.log("The model has loaded")
    );

    //Make an AI prediction
    classifier.predict(imageRef.current, 5, (err: any, results: any) => {
      console.log(results);
      setResults(results);
    });
  };

  useEffect(() => {
    classifyImg();
  }, [file]);
  const fileSelectHandler = (event: any) => {
    setFile(event.target.files[0]);
    let selectedFile = event.target.files[0];
    let reader = new FileReader();

    imageRef.current.title = selectedFile.name;

    reader.onload = function (event: any) {
      imageRef.current.src = event.target.result;
    };

    reader.readAsDataURL(selectedFile);

    setFile(event.target.files[0]);
  };

  return (
    <div className="App">
      <h1>Let's build a dope ML app</h1>
      <img ref={imageRef} id="image" alt="" />
      <input ref={fileRef} type="file" onChange={fileSelectHandler} />
      {results?.map(({ label, confidence }) => (
        <div key={confidence}>
          <h4>
            {label}: <em>{confidence}</em>
          </h4>
        </div>
      ))}
    </div>
  );
}

export default App;
