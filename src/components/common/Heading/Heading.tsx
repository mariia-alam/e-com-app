import { memo } from "react"

const  Heading = memo(({ title  } : { title : string}) => {
    return (
        <h2 className="my-4" style={{color:"var(--accent-color"}}>{title}</h2>
    )
})
export default Heading;
