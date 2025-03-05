import { memo } from "react"
import styles from "./styles.module.css"

const  Heading = memo(({ title  } : { title : string}) => {
    // console.log("render heading")
    return (
        <h2 className={styles.heading}>{title}</h2>
    )
})
export default Heading;
