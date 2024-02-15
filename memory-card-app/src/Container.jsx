import { useState, useEffect } from "react";
import Card from "./Card.jsx";

export default function Container() {
    const [images, setImages] = useState([]);
    const [randomImages, setRandomImages] = useState([]);
    const [startButtonVisible, setStartButtonVisible] = useState(true)
    const [currentScore, setCurrentScore] = useState(0)
    const [clickedImages, setClickedImages] = useState([])


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://api.unsplash.com/search/photos?query=icon&per_page=21', {
                    headers: {
                        Authorization: "Client-ID sCtuAH1Yrq9fmA_b7FZJhLvNhSbAGgHkl589dlIRpRk"
                    }
                });
                const data = await response.json();
                const dataUrls = data.results.map((result, index) => ({ ...result, id: index }));
                setImages(dataUrls);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }
        fetchData();
    }, []);

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    function handleClick(index) {
        console.log(index);
        if (clickedImages.includes(index)) {
            console.log("game over")
        } else {
            setRandomImages(shuffle([...images]));
            setCurrentScore(c => c + 1)
            setClickedImages(ci => [...ci, index])
        }
    }

    function setupStart() {
        setRandomImages(images)
        setStartButtonVisible(false)
    }

    return (
        <>
        <p>`Current score: {currentScore}`</p>
            <div className="card-container">
            {startButtonVisible && (
                <button onClick={setupStart} className="start-button">Start the game</button>
            )}
                {randomImages.map(({ id, urls }) => (
                    <Card key={id} imgUrl={urls.small} id={id} onClick={handleClick} />
                ))}
            </div>
        </>
    );
}
