import { useState, useEffect } from "react";
import Card from "./Card.jsx";
import BlankCard from "./BlankCard.jsx"

export default function Container() {
    const [images, setImages] = useState([]);
    const [randomImages, setRandomImages] = useState([]);
    const [startButtonVisible, setStartButtonVisible] = useState(true)
    const [bestScore, setBestScore] = useState(0)
    const [currentScore, setCurrentScore] = useState(0)
    const [clickedImages, setClickedImages] = useState([])
    const [text, setText] = useState(["Test your memory! All you have to do is click a different picture 21 times in a row. Good luck."])
    const [blankCards, setBlankCards] = useState(true)
    const [cover, setCover] = useState()



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
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://api.unsplash.com/search/photos?query=cover&per_page=1', {
                    headers: {
                        Authorization: "Client-ID sCtuAH1Yrq9fmA_b7FZJhLvNhSbAGgHkl589dlIRpRk"
                    }
                });
                const data = await response.json();
                const coverUrl = data.results.length > 0 ? data.results[0].urls.small : ''; 
                setCover(coverUrl);
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
                setText("Try again.")
                resetGame()
        } else {
            if (clickedImages.length === 20) {
                setText("WOW, good job. YOU WON THE GAME!")
                resetGame()
                
            } else {
            setRandomImages(shuffle([...images]));
            setCurrentScore(c => c + 1)
            if (bestScore < (currentScore + 1)) {
                setBestScore(b => b + 1)
            }
            setClickedImages(ci => [...ci, index])
        }
        }
    }
    function resetGame() {
        setClickedImages([])
        setCurrentScore(0)
        
    }
    
    function setupStart() {
        setRandomImages(images)
        setStartButtonVisible(false)
        setBlankCards(false)
    }
    const blankArray = new Array(21).fill(null);

    return (
        <>
        <div className="setup-container">
            <div>
            <p>{text}</p>
                {startButtonVisible && (
                    <button onClick={setupStart} className="start-button">Start the game</button>
                )}
            </div>
            <div>
                <p>Current score: {currentScore}</p>
                <p>Best score: {bestScore}</p>
            </div>
            
        </div>
        
            <div className="card-container">
            {blankCards && (
                    blankArray.map((_, index) => (
                        <BlankCard key={index} cover={cover} />
                    ))
                )}
                {randomImages.map(({ id, urls }) => (
                    <Card key={id} imgUrl={urls.small} id={id} onClick={handleClick} />
                ))}
            </div>
        </>
    );
}
