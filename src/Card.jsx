export default function Card({id, imgUrl, onClick}) {
    // console.log(imgUrl);
    function handleClick() {
        onClick(id)
    }
    return (
        <div className="card" onClick={handleClick} >
            <img className="card-image" src={imgUrl} alt="card image" />
        </div>
    );
}
