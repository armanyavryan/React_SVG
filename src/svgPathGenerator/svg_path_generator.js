import React, { useState } from "react";
import {getElementByClassNameAndPos, SVGHelper } from "./YPath";
let currentSVG = null;
let isMouseDown = false;
let sourceDir = "";
let grabbedBlock = false;
let grabbedPos = { x: -1, y: -1 }


const PathComponent = (data) => {
    alert(data)
    return (
        <path d="M00L50,50" stroke="#000" strokeWidth={1}></path>
    )
}

const RectAngleComponent = () => {
    return (
        <div className="block" key={Math.random()}>
            <div onMouseDown={() => { sourceDir = "left"}} className="border left"></div>
            <div onMouseDown={() => { sourceDir = "up"}} className="border up"></div>
            <div onMouseDown={() => { sourceDir = "right"}} className="border right"></div>
            <div onMouseDown={() => { sourceDir = "down"}} className="border down"></div>
        </div>
    );
};

const ContainerComponent = () => {
    let [rectsCount, setRectsCount] = useState([]);
    let [pathsCount, setPathsCount] = useState([]);

    const onAddBtnClick = (event) => {
        setRectsCount(rectsCount.concat(<RectAngleComponent key={rectsCount.length} />));
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
                currentSVG = new SVGHelper(document.getElementById('canvas'));
                currentSVG.setSource(e.target, dir);
                // setPathsCount(pathsCount.concat(<PathComponent key={pathsCount.length} data={"asdasdsadasd"} />));
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
                {rectsCount}
                {/* <svg  width="100%" height="100%"> */}
                {pathsCount }
                {/* </svg> */}
            </div>
        </>
    );
};

export default ContainerComponent;