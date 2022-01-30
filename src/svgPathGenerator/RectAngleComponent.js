
const RectAngleComponent = () => {
    return (

        <div className="block" key={Math.random()}>
            <div  className="border left"></div>
            <div  className="border up"></div>
            <div  className="border right"></div>
            <div  className="border down"></div>
        </div>
    );
}
export default RectAngleComponent;