import PathComponent from "./PathComponent"

const SVGComponent = (props) => {
    console.log("props", props)
    let data = props.paths
    console.log("props data", data)
    if (data && data.length > 0) {
        return (
            < svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" style={{ zIndex: -1 }} >
                {
                    data.forEach(d => {
                        <PathComponent data={d} />
                    })
                }
            </svg >
        )
    }
    else
    return (
        < svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" style={{ zIndex: -1 }} >
        </svg >
    )
}

export default SVGComponent;