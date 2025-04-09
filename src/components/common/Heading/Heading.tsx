import { memo } from "react"

const  Heading = memo(({ title  } : { title : string}) => {
    return (
        <h2 className="my-5 text-center fs-3" style={{color:"var(--accent-color"}}>{title}</h2>
    )
})
export default Heading;
