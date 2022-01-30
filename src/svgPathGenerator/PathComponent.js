import ArrowComponent from './ArrowComponent'
import getPath from './PathFinder'
// const PathComponent = (props) => {
//     console.log("1111", props)
//     let rotation = props.rotation;
//     // let path = props.pathElement.getAttribute('d') + ""
//     let data = props.data
//     let strokeColor = "#000"
//     return (
//         <g>
//             <path d={data} stroke={strokeColor} fill="none" />
//             <ArrowComponent rotation={rotation} />
//         </g>
//     )
// }

const PathComponent = (props) => {
    let rectangle_1 = props.rectangle_1
    let rectangle_2 = props.rectangle_2
    let end_rect_connection_side = props.connection_path.end_rect_connection_side
    let rotation = 0;

    let coords = getPath(rectangle_1, rectangle_2);
    let datas = []
    for (let index = 0; index < coords.length - 1; index++) {
        const element = coords[index];
        datas.push("M" + coords[index].x + "," + coords[index].y + "L" + coords[index+1].x + "," + coords[index+1].y)
    }

    switch (end_rect_connection_side) {
        case "left":
            rotation = Math.PI / 2;
            break;
        case "right":
            rotation = -Math.PI / 2;
            break;
        case "up":
            rotation = Math.PI;
            break;

    }
    let strokeColor = "#000"
    return (
        <g>
            {datas.forEach(d => {
                <path d={d} stroke={strokeColor} fill="none" />    
            })
            }
            <ArrowComponent rotation={rotation} />
        </g>
    )
}

export default PathComponent;