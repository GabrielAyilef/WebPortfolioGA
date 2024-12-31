import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./poseDetail.css";
import arrowpurple from "../../../../../assets/arrowpurple.png";
import { useDarkMode } from "../../Context/DarkMode";
import BreatheDelay from "../../Breathe/breathedelay/BreatheDelay";
import { useLayout } from "../../Context/Layout";
import useScrollOnMount from "../../../../../utilities/useScrollOnMount";

function PoseDetail() {
  const [asana, setAsana] = useState(null);
  const { name } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const receivedSignal = location.state;
  const { darkProject } = useDarkMode();
  const { desktop } = useLayout();

  useScrollOnMount();
  function goBack() {
    navigate(-1);
  }
  useEffect(() => {
    async function fetchAllAsanas() {
      try {
        const response = await fetch(
          "https://yoga-api-nzy4.onrender.com/v1/poses"
        );
        const data = await response.json();

        localStorage.setItem("asanas", JSON.stringify(data));
        return data;
      } catch (error) {
        console.error("Error fetching all asanas:", error);
        return [];
      }
    }

    async function fetchAsana() {
      const localStorageAsanas = JSON.parse(localStorage.getItem("asanas"));

      if (localStorageAsanas) {
        const filteredAsana = localStorageAsanas.find(
          (item) => item.english_name === name
        );
        setAsana(filteredAsana);
      } else {
        const allAsanas = await fetchAllAsanas();
        const filteredAsana = allAsanas.find(
          (item) => item.english_name === name
        );
        setAsana(filteredAsana);
      }
    }

    fetchAsana();
  }, [name]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch(
  //         "https://yoga-api-nzy4.onrender.com/v1/poses"
  //       );
  //       const data = await response.json();

  //       setAsanas(data);

  //       localStorage.setItem("asanas", JSON.stringify(data));
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }
  //   const localStorageData = JSON.parse(localStorage.getItem("asanas"));
  //   if (localStorageData) {
  //     setAsanas(localStorageData);
  //   } else {
  //     fetchData();
  //   }
  // }, []);
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch(
  //         `https://yoga-api-nzy4.onrender.com/v1/poses?name=${name}`
  //       );

  //       const data = await response.json();

  //       setAsana(data);
  //     } catch (error) {
  //       console.error("Error getting asana data:", error);
  //     }
  //   }
  //   const localStorageAsana = JSON.parse(localStorage.getItem("asanas"));

  //   if (localStorageAsana) {
  //     const filteredAsana = localStorageAsana.find(
  //       (item) => item.english_name === name
  //     );
  //     setAsana(filteredAsana);
  //   } else {
  //     fetchData();
  //   }
  // }, []);

  if (!asana) {
    return <BreatheDelay />;
  }

  return (
    <div
      className={`container-posedetail ${darkProject ? "dark" : ""} ${
        desktop ? "desktop" : ""
      }`}
    >
      <div className="container-posedetail-info">
        <div className="back-to-container">
          <button onClick={goBack}>
            <img src={arrowpurple} alt="icon return" />
          </button>
        </div>
        <div className="details-desktop">
          <div className="asana-nameasana">
            <img
              className="img-svg"
              src={asana.url_png}
              alt={`${asana.english_name} pose`}
            />
            <h2>
              {asana.english_name} ({asana.sanskrit_name})
            </h2>
          </div>
          <div className="text-asanas">
            {receivedSignal && (
              <>
                <h3>Benefits</h3>
                <p>{asana.pose_benefits}</p>
              </>
            )}
            <h3>Description</h3>
            <p>{asana.pose_description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PoseDetail;
