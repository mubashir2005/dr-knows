import React from "react";
import "./App.css";
// @ts-ignore
import * as ml5 from "ml5";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

import Knows from "./knows.png"

function App() {
  const imageRef = useRef<any>();
  const [results, setResults] = useState([]);
  const [file, setFile] = useState();
  const fileRef = useRef<HTMLInputElement>(null);
  const classifyImg = () => {
      const classifier = ml5.imageClassifier('MobileNet', ()=>{
          console.log('Model has loaded')
      });

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
    <div className="app">
      <h1 className="app__title">Dr Knows</h1>
      <img src={Knows} alt="Knows" className="app__image"/>
      <p className="app__intro">The All knowing Dr Knows can tell you what's inside an image or what an image is of</p>
      <h2 className="app__problem">We know your problem so we have a solution</h2>
      <p className="app__desc">Just pick an image and we'll do the rest for you</p>
       <h1 className="app__start">Get started now</h1>
      <div className="app__classify">
        <img ref={imageRef} id="image" alt="" />
          <label className="file">
              <input ref={fileRef} type="file" id="file" aria-label="File browser example" onChange={fileSelectHandler}  className="app__picker" />
                  <span className="file-custom"></span>
          </label>
        {results?.map(({ label, confidence }) => (
            <div key={confidence}>
              <h4>
                {label}: <em>{confidence}</em>
              </h4>
            </div>
        ))}
      </div>

    </div>
  );
}

export default App;
