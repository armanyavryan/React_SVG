
const ArrowComponent = ({ rotation }) => {
    return <g transform={rotation}>
        <path d="l -8,4 l 8,-12 l 8,12z" fill="#000">
        </path>
    </g>
}

export default ArrowComponent;