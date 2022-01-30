import React, { useState } from "react";
import { getElementByClassNameAndPos, SVGHelper } from "./YPath";
import RectAngleComponent from './RectAngleComponent'
import SVGComponent from "./SVGComponent"
let currentSVG = null;
let isMouseDown = false;
let sourceDir = "";
let grabbedBlock = false;
let grabbedPos = { x: -1, y: -1 }

let pathsMap = new Map();

const ContainerComponent = () => {
    let [rectElements, setRectElements] = useState([]);
    // let [pathElements, setPathElements] = useState([]);
    let [paths, setPaths] = useState([]);
    // let [pathData, setPathData] = useState([]);

    const onAddBtnClick = (event) => {
        setRectElements(rectElements.concat(<RectAngleComponent key={rectElements.length} />));
    };


    const onMouseMove = (e) => {
        
        if (isMouseDown) {

            if (grabbedBlock) {
                // console.log(grabbedPos)
                let dx = e.clientX - grabbedPos.x
                let dy = e.clientY - grabbedPos.y
                let l = grabbedBlock.style.left;
                let val = + l.replace("px", "");
                val += dx;
                grabbedBlock.style.left = val + "px";
                let l2 = grabbedBlock.style.top;
                let val2 = + l2.replace("px", "");
                val2 += dy;
                grabbedBlock.style.left = val + "px";
                grabbedBlock.style.top = val2 + "px";
                if (currentSVG) {
                    if (grabbedBlock == currentSVG.source.domBlockBorderElement.parentElement) {
                        currentSVG.setSource(currentSVG.source.domBlockBorderElement, currentSVG.source.dir)
                        currentSVG.moveTo(currentSVG.destination.pos.x, currentSVG.destination.pos.y, currentSVG.destination.dir)
                    }
                    else if (grabbedBlock == currentSVG.destination.domBlockBorderElement.parentElement) {
                        currentSVG.destination.pos.x = currentSVG.destination.domBlockBorderElement.getBoundingClientRect().x + currentSVG.destination.domBlockBorderElement.getBoundingClientRect().width / 2;
                        currentSVG.destination.pos.y = currentSVG.destination.domBlockBorderElement.getBoundingClientRect().y + currentSVG.destination.domBlockBorderElement.getBoundingClientRect().height / 2;
                        currentSVG.moveTo(currentSVG.destination.pos.x, currentSVG.destination.pos.y, currentSVG.destination.dir)
                    }
                }
                grabbedPos.x = e.clientX;
                grabbedPos.y = e.clientY;
                return;
            }
            let dir = "";
            // console.log(e)

            let dst = getElementByClassNameAndPos(e.clientX, e.clientY, "border");
            console.log("dst")
            console.log(dst)
            if (dst != null && currentSVG && dst != currentSVG.source.domBlockBorderElement) {
                let dirs = ["left", "right", "down", "up"]
                dirs.forEach(d => {
                    if (dst.classList.contains(d)) {
                        dir = d;
                    }
                });
                currentSVG.destination.domBlockBorderElement = dst
                currentSVG.destination.pos.x = dst.getBoundingClientRect().x + dst.getBoundingClientRect().width / 2;
                currentSVG.destination.pos.y = dst.getBoundingClientRect().y + dst.getBoundingClientRect().height / 2;
                currentSVG.destination.dir = dir;

            } else {
                if (currentSVG) {
                    currentSVG.destination.domBlockBorderElement = null
                }
            }
            if (currentSVG) {
                console.log("80")
                currentSVG.moveTo(e.clientX - document.getElementById('canvas').clientLeft, e.clientY - document.getElementById('canvas').clientTop, dir);
                let patElement = currentSVG.getPathElement();
                let data = patElement.getAttribute('d')
                paths = data;
                setPaths(paths); //

                // setPathElements(pathElements.concat(<PathComponent key={pathElements.length} pathElement={pe} />)); //
            }

        }
    }
    const onMouseDown = (e) => {

        isMouseDown = true;
        // console.log('TARGET: ')
        // console.log(e.target)
        let dst = getElementByClassNameAndPos(e.clientX, e.clientY, "block");
        let dst2 = getElementByClassNameAndPos(e.clientX, e.clientY, "border");

        if (dst && dst.classList.contains("block")) {
            grabbedBlock = dst;
            grabbedPos.x = e.clientX;
            grabbedPos.y = e.clientY;
        }

        else if (dst2 && dst2.classList.contains("border")) {
            console.log("contains border")
            if (!currentSVG) {
                let dirs = ["left", "right", "down", "up"]
                let dir;

                dirs.forEach(d => {
                    if (e.target.classList.contains(d)) {
                        dir = d;
                    }
                }); 
                // currentSVG = new SVGHelper(document.getElementById('canvas'));
                // currentSVG.setSource(e.target, dir);
                // let pe = currentSVG.getPathElement();
                // let data = pe.getAttribute('d');
                if (pathsMap.has()) {
                    
                }
                paths.push(data);
                setPaths(data); //

                // setPathElements(pathElements.concat(<PathComponent key={pathElements.length} pathElement={pe} />)); //
                // setpathElements(pathElements.concat(<PathComponent key={pathElements.length} data={"asdasdsadasd"} />));
            }
        }

        // alert()
    }

    const onMouseUp = (e) => {
        // alert()
        isMouseDown = false;
        grabbedBlock = false;
    }

    return (
        <>
            <div id="canvas" onMouseMove={onMouseMove} onMouseDown={onMouseDown} onMouseUp={onMouseUp} >
                <button onClick={onAddBtnClick}>Add input</button>
                {rectElements}
                {/* <SVGComponent pathElements={pathElements} /> */}
                <SVGComponent paths={ paths }/>
            </div>
        </>
    );
};

export default ContainerComponent;