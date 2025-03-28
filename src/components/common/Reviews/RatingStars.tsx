import  { useState, useEffect, memo } from "react";
import { FaStar } from "react-icons/fa";

interface RatingStarsProps {
    onRate: (rating: number) => void;
    currentRating: number | null;
}

const RatingStars: React.FC<RatingStarsProps> = memo(({ onRate, currentRating }) => {
    const [hover, setHover] = useState<number | null>(null);
    const [rating, setRating] = useState<number | null>(currentRating);

    console.log("rating")
    useEffect(() => {
        setRating(currentRating);
    }, [currentRating]);

    const handleClick = (newRating: number) => {
        setRating(newRating);
        onRate(newRating);
    };


    return (
        <div>
            {[...Array(5)].map((_, index) => {
                const currentRating = index + 1;
                return (
                    <FaStar
                        key={index}
                        size={30}
                        color={currentRating <= (hover ?? rating ?? 0) ? "#ffc107" : "#e4e5e9"}
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}
                        onClick={() => handleClick(currentRating)}
                        style={{ cursor: "pointer" }}
                    />
                );
            })}
        </div>
    );
});

export default RatingStars;
