import { useState, useEffect } from "react";
import styled from "styled-components";
import randomRange from "../utility/randomRange";

import Petals from "../components/Petals";

import normalFace from "../assets/faces/normal_face.png";
import lovesMeFace from "../assets/faces/loves_me_face.png";
import lovesMeNotFace from "../assets/faces/loves_me_not_face.png";
import reallyLovesMeFace from "../assets/faces/really_loves_me_face.png";
import reallyLovesMeNotFace from "../assets/faces/really_loves_me_not_face.png";

import lovesMeText from "../assets/text/loves_me_text.png";
import lovesMeNotText from "../assets/text/loves_me_not_text.png";
import reallyLovesMeText from "../assets/text/really_loves_me_text.png";
import reallyLovesMeNotText from "../assets/text/really_loves_me_not_text.png";

import lovesMeIco from "../assets/ico/really_loves_me.ico";
import lovesMeNotIco from "../assets/ico/really_loves_me_not.ico";

const Flower = () => {
  const randomNumber = randomRange(11, 19);

  const [numberOfPetals, setNumberOfPetals] = useState(randomNumber);
  const [love, setLove] = useState(true);
  const [finalVerdict, setFinalVerdict] = useState();
  const [faceImage, setFaceImage] = useState(normalFace);
  const [loveText, setLoveText] = useState();

  const removePetal = () => {
    if (numberOfPetals >= 0) {
      setNumberOfPetals(numberOfPetals - 1);
      setLove(!love);

      changeFace();
    }
  };

  const changeFace = () => {
    if (love === true && numberOfPetals > 1) {
      setFaceImage(lovesMeFace);
      setLoveText(lovesMeText);
    }
    if (love === false && numberOfPetals > 1) {
      setFaceImage(lovesMeNotFace);
      setLoveText(lovesMeNotText);
    }
    if (love === true && numberOfPetals === 1) {
      setFaceImage(reallyLovesMeFace);
      setLoveText(reallyLovesMeText);
      setFinalVerdict("Really Loves Me");
      document.title = "Really Loves Me!";
    }
    if (love === false && numberOfPetals === 1) {
      setFaceImage(reallyLovesMeNotFace);
      setLoveText(reallyLovesMeNotText);
      setFinalVerdict("Really Loves Me Not");
      document.title = "Really Loves Me... Not!";
    }
  };

  if (!numberOfPetals && numberOfPetals !== 0) {
    setNumberOfPetals(Math.floor(Math.random() * 5) + 5);
  }

  useEffect(() => {
    const faviconUpdate = async () => {
      const favicon = document.getElementById("favicon");
      if (numberOfPetals === 1 && finalVerdict === "Really Loves Me") {
        favicon.href = lovesMeIco;
      }
      if (numberOfPetals === 1 && finalVerdict === "Really Loves Me Not") {
        favicon.href = lovesMeNotIco;
      }
    };

    faviconUpdate();
  }, [numberOfPetals]);

  return (
    <>
      <Container>
        <Petals numberOfPetals={numberOfPetals} />
        <FlowerHead src={faceImage} draggable={false} />
        <LoveText src={loveText} draggable={false} />
      </Container>
      <RemoveButton onClick={removePetal}>Pick a Petal</RemoveButton>
    </>
  );
};

const Container = styled.div`
  width: 300px;
  height: 300px;
`;

const FlowerHead = styled.img`
  position: relative;
  top: 117px;
  left: 117px;
`;

const RemoveButton = styled.button`
  margin: 25px;
`;

const LoveText = styled.img`
  position: relative;
  left: 23.5px;
`;

export default Flower;
