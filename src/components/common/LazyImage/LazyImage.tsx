import { useState } from "react";
import { useInView } from "react-intersection-observer";
import styles from "./styles.module.css"
const LazyImage = ({ src, alt }: { src: string; alt: string }) => {
    const { ref, inView } = useInView({ triggerOnce: true });
    const [loaded, setLoaded] = useState(false);

    return (
        <div className={styles.productImg} ref={ref}>
            {inView ? (
                <img
                    src={src}
                    alt={alt}
                    onLoad={() => setLoaded(true)}
                    style={{
                        opacity: loaded ? 1 : 0,
                    }}
                />
            ) : (
                <div style={{ width: "100%", height: "20px", background: "#f0f0f0" }} />
            )}
        </div>
    );
};

export default LazyImage;
