
export function moveFromUpToLeft(x, y, currentSVG, reverse = false) {
    let src = currentSVG.source
    let dst = currentSVG.destination
    if (reverse) {
        dst = currentSVG.source
        src = currentSVG.destination

    }
    currentSVG.currentPos.x = x;
    currentSVG.currentPos.y = y;
    if (dst.domBlockBorderElement) {
        currentSVG.arrowElem.setAttribute('d', "M " + dst.pos.x + ", " + dst.pos.y + " " + currentSVG.arrowPath);
    } else {
        currentSVG.arrowElem.setAttribute('d', "M " + x + ", " + y + " " + currentSVG.arrowPath);
    }

    let mx = (x + src.pos.x) / 2
    let my = (y + src.pos.y) / 2
    let dx = (x - src.pos.x)
    let dy = (y - src.pos.y)
    currentSVG.path = "M" + src.pos.x + "," + src.pos.y;
    if (x <= src.domBlockBorderElement.parentElement.getBoundingClientRect().x - 2 * currentSVG.margin) {

        if (!dst.domBlockBorderElement) {
            currentSVG.path += "V " + (src.pos.y - currentSVG.margin) + " ";
            currentSVG.path += "H " + (src.domBlockBorderElement.parentElement.getBoundingClientRect().x + x) / 2 + " ";
            currentSVG.path += "V " + y + " ";
            currentSVG.path += "H " + x + " ";
            currentSVG.pathElem.setAttribute("stroke", "gray");
        }
        else {
            if (dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height / 2 >= src.pos.y) {
                //       ____________________o
                //      |    ________
                //      |-->|________|
                //      
                let l = (src.pos.y - currentSVG.margin)
                l = Math.min(l, dst.domBlockBorderElement.parentElement.getBoundingClientRect().y - currentSVG.margin)
                currentSVG.path += "V " + l + " ";
                currentSVG.path += "H " + (dst.pos.x - currentSVG.margin) + " ";
                currentSVG.path += "V " + dst.pos.y + " ";
                currentSVG.path += "H " + dst.pos.x + " ";
                currentSVG.pathElem.setAttribute("stroke", "yellow");
            }


            else {
                //  destination.X  <  source.X
                //dest.b + 2m > s.y
                if (dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height + 2 * currentSVG.margin > src.pos.y) {
                    //  .->
                    //  |       ____________
                    //  |______|            |
                    //
                    let l1 = src.domBlockBorderElement.parentElement.getBoundingClientRect().x;
                    let l2 = dst.domBlockBorderElement.parentElement.getBoundingClientRect().x + dst.domBlockBorderElement.parentElement.getBoundingClientRect().width;
                    let l = (l1 + l2) / 2
                    if (l > src.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin) {
                        l = src.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin;
                    }
                    let l3 = dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin;
                    currentSVG.path += "V " + (src.pos.y - currentSVG.margin) + " ";
                    currentSVG.path += "H " + l + " ";
                    currentSVG.path += "V " + l3 + " ";
                    currentSVG.path += "H " + (dst.pos.x - currentSVG.margin) + " ";
                    currentSVG.path += "V " + dst.pos.y + " ";
                    currentSVG.path += "H " + dst.pos.x + " ";

                    currentSVG.pathElem.setAttribute("stroke", "red");
                }
                else if (dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height + 2 * currentSVG.margin <= src.pos.y) {
                    let l1 = src.domBlockBorderElement.parentElement.getBoundingClientRect().y;
                    let l2 = dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height;
                    let l = (l1 + l2) / 2
                    currentSVG.path += "V " + (l) + " ";
                    currentSVG.path += "H " + (dst.pos.x - currentSVG.margin) + " ";
                    currentSVG.path += "V " + dst.pos.y + " ";
                    currentSVG.path += "H " + dst.pos.x + " ";

                    currentSVG.pathElem.setAttribute("stroke", "cyan");
                }
            }

        }
    }

    // if x > source.right + margin
    else if (x > src.domBlockBorderElement.parentElement.getBoundingClientRect().x
        + src.domBlockBorderElement.parentElement.getBoundingClientRect().width + 2 * currentSVG.margin) {

        if (!dst.domBlockBorderElement) {
            //              |
            //           ___|
            //          |
            //          |

            currentSVG.path += "V " + (src.pos.y - currentSVG.margin) + " ";
            currentSVG.path += "H " + (src.domBlockBorderElement.parentElement.getBoundingClientRect().x + src.domBlockBorderElement.parentElement.getBoundingClientRect().width + x) / 2 + " ";
            currentSVG.path += "V " + y + " ";
            currentSVG.path += "H " + x + " ";
            currentSVG.pathElem.setAttribute("stroke", "violet");
        }
        else {
            if (dst.pos.y < src.pos.y - currentSVG.margin) {
                //                 .---------------->
                //                 |
                //                 |
                //                 |
                currentSVG.path += "V " + (dst.pos.y) + " ";
                currentSVG.path += "H " + (dst.pos.x) + " ";
                currentSVG.pathElem.setAttribute("stroke", "brown");
            } else {
                //              |
                //           ___|
                //          |
                //          |

                currentSVG.path += "V " + (src.pos.y - currentSVG.margin) + " ";
                currentSVG.path += "H " + (src.domBlockBorderElement.parentElement.getBoundingClientRect().x + src.domBlockBorderElement.parentElement.getBoundingClientRect().width + dst.pos.x) / 2 + " ";
                currentSVG.path += "V " + dst.pos.y + " ";
                currentSVG.path += "H " + dst.pos.x + " ";
                currentSVG.pathElem.setAttribute("stroke", "violet");
            }
        }
    }

    // if x < +margin [source] + margin
    else {

        if (y < src.pos.y) {
            if (!dst.domBlockBorderElement) {
                currentSVG.pathElem.setAttribute("stroke", "red");// red
                currentSVG.path += "V " + (src.pos.y - 2 * currentSVG.margin) + " ";
                currentSVG.path += "H " + (x) + " ";
                currentSVG.path += "V " + y + " ";
            }
            else {
                if (dst.pos.x < src.pos.x + currentSVG.margin) {
                    let ym = (dst.domBlockBorderElement.parentElement.getBoundingClientRect().y +
                        dst.domBlockBorderElement.parentElement.getBoundingClientRect().height +
                        src.domBlockBorderElement.parentElement.getBoundingClientRect().y) / 2;
                    currentSVG.pathElem.setAttribute("stroke", "yellow");
                    currentSVG.path += "V " + (ym) + " ";
                    currentSVG.path += "H " + (dst.pos.x - currentSVG.margin) + " ";
                    currentSVG.path += "V " + (dst.pos.y) + " ";
                    currentSVG.path += "H " + (dst.pos.x) + " ";
                }
                else {
                    currentSVG.pathElem.setAttribute("stroke", "black");
                    currentSVG.path += "V " + (dst.pos.y) + " ";
                    currentSVG.path += "H " + (dst.pos.x) + " ";
                }

            }
        }

        // dest.y > source.b
        else if (y > src.domBlockBorderElement.parentElement.getBoundingClientRect().y + src.domBlockBorderElement.parentElement.getBoundingClientRect().height) {
            currentSVG.pathElem.setAttribute("stroke", "red");
            currentSVG.path += "V " + (src.pos.y - currentSVG.margin) + " ";
            if (x > src.domBlockBorderElement.parentElement.getBoundingClientRect().x + src.domBlockBorderElement.parentElement.getBoundingClientRect().width + 2 * currentSVG.margin) {
                currentSVG.path += "H " + (src.domBlockBorderElement.parentElement.getBoundingClientRect().x + src.domBlockBorderElement.parentElement.getBoundingClientRect().width + currentSVG.margin) + " ";
            }
            else {
                let l = src.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin;
                l = Math.min(l, dst.pos.x - currentSVG.margin)

                currentSVG.path += "H " + l + " ";
            }
            currentSVG.path += "V " + dst.pos.y + " ";
            currentSVG.path += "H " + dst.pos.x + " ";
            currentSVG.pathElem.setAttribute("stroke", "red");
        }
        // currentSVG.path += "H " + x + " ";
    }
    currentSVG.pathElem.setAttribute("d", currentSVG.path)

}

export function moveFromUpToLeftOrRight(x, y, currentSVG, reverse = false) {
    let src = currentSVG.source
    let dst = currentSVG.destination
    if (reverse) {
        dst = currentSVG.source
        src = currentSVG.destination

    }
     currentSVG.currentPos.x = x;
    currentSVG.currentPos.y = y;
    if (dst.domBlockBorderElement) {
        currentSVG.arrowElem.setAttribute('d', "M " + dst.pos.x + ", " + dst.pos.y + " " + currentSVG.arrowPath);
    } else {
        currentSVG.arrowElem.setAttribute('d', "M " + x + ", " + y + " " + currentSVG.arrowPath);
    }

    let mx = (x + src.pos.x) / 2
    let my = (y + src.pos.y) / 2
    let dx = (x - src.pos.x)
    let dy = (y - src.pos.y)
    currentSVG.path = "M" + src.pos.x + "," + src.pos.y;
        // if x < source.x - margin
        if (x <= src.domBlockBorderElement.parentElement.getBoundingClientRect().x - 2 * currentSVG.margin) {

            if (!dst.domBlockBorderElement) {
                currentSVG.path += "V " + (src.pos.y - currentSVG.margin) + " ";
                currentSVG.path += "H " + (src.domBlockBorderElement.parentElement.getBoundingClientRect().x + x) / 2 + " ";
                currentSVG.path += "V " + y + " ";
                currentSVG.path += "H " + x + " ";
                currentSVG.pathElem.setAttribute("stroke", "gray");
            }
            else {
                //  destination.X  <  source.X
                if (dst.dir == "left") {
                    if (dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height / 2 >= src.pos.y) {
                        //       ____________________o
                        //      |    ________
                        //      |-->|________|
                        //      
                        let l = (src.pos.y - currentSVG.margin)
                        l = Math.min(l, dst.domBlockBorderElement.parentElement.getBoundingClientRect().y - currentSVG.margin)
                        currentSVG.path += "V " + l + " ";
                        currentSVG.path += "H " + (dst.pos.x - currentSVG.margin) + " ";
                        currentSVG.path += "V " + dst.pos.y + " ";
                        currentSVG.path += "H " + dst.pos.x + " ";
                        currentSVG.pathElem.setAttribute("stroke", "yellow");
                    }


                    else {
                        //  destination.X  <  source.X
                        //dest.b + 2m > s.y
                        if (dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height + 2 * currentSVG.margin > src.pos.y) {
                            //  .->
                            //  |       ____________
                            //  |______|            |
                            //
                            let l1 = src.domBlockBorderElement.parentElement.getBoundingClientRect().x;
                            let l2 = dst.domBlockBorderElement.parentElement.getBoundingClientRect().x + dst.domBlockBorderElement.parentElement.getBoundingClientRect().width;
                            let l = (l1 + l2) / 2
                            if (l > src.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin) {
                                l = src.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin;
                            }
                            let l3 = dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin;
                            currentSVG.path += "V " + (src.pos.y - currentSVG.margin) + " ";
                            currentSVG.path += "H " + l + " ";
                            currentSVG.path += "V " + l3 + " ";
                            currentSVG.path += "H " + (dst.pos.x - currentSVG.margin) + " ";
                            currentSVG.path += "V " + dst.pos.y + " ";
                            currentSVG.path += "H " + dst.pos.x + " ";

                            currentSVG.pathElem.setAttribute("stroke", "red");
                        }
                        else if (dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height + 2 * currentSVG.margin <= src.pos.y) {
                            let l1 = src.domBlockBorderElement.parentElement.getBoundingClientRect().y;
                            let l2 = dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height;
                            let l = (l1 + l2) / 2
                            currentSVG.path += "V " + (l) + " ";
                            currentSVG.path += "H " + (dst.pos.x - currentSVG.margin) + " ";
                            currentSVG.path += "V " + dst.pos.y + " ";
                            currentSVG.path += "H " + dst.pos.x + " ";

                            currentSVG.pathElem.setAttribute("stroke", "cyan");
                        }
                    }

                }
                else if (dst.dir == "right") {
                    // source.x - 2m > dest.x
                    if (src.domBlockBorderElement.parentElement.getBoundingClientRect().x - 2 * currentSVG.margin >= dst.pos.x) {

                        if (src.pos.y - currentSVG.margin < dst.pos.y) {
                            //         _____
                            //        |     |
                            //        |
                            //     <__|
                            currentSVG.path += "V " + (src.pos.y - currentSVG.margin) + " ";
                            currentSVG.path += "H " + (src.domBlockBorderElement.parentElement.getBoundingClientRect().x + x) / 2 + " ";
                            currentSVG.path += "V " + dst.pos.y + " ";
                            currentSVG.path += "H " + dst.pos.x + " ";
                            currentSVG.pathElem.setAttribute("stroke", "yellow");
                        } else {
                            //   <-------------.
                            //                 |
                            //                 |
                            //                 |
                            currentSVG.path += "V " + (dst.pos.y) + " ";
                            currentSVG.path += "H " + (dst.pos.x) + " ";
                            currentSVG.pathElem.setAttribute("stroke", "red");

                        }

                    }
                    // source.x < 2m + dest.x
                    else if (src.domBlockBorderElement.parentElement.getBoundingClientRect().x - 2 * currentSVG.margin < dst.pos.x) {
                        if (src.pos.y - currentSVG.margin < dst.pos.y) {
                            //   _____.
                            //  |     |
                            //        |
                            //     <__|
                            currentSVG.path += "V " + (src.pos.y - currentSVG.margin) + " ";
                            currentSVG.path += "H " + (src.domBlockBorderElement.parentElement.getBoundingClientRect().x + src.domBlockBorderElement.parentElement.getBoundingClientRect().width + currentSVG.margin) + " ";
                            currentSVG.path += "V " + y + " ";
                            currentSVG.path += "H " + x + " ";
                            currentSVG.pathElem.setAttribute("stroke", "red");
                        }
                        //  else {
                        //     //   <-------------.
                        //     //                 |
                        //     //                 |
                        //     //                 |
                        //     currentSVG.path += "V " + (dst.pos.y) + " ";
                        //     currentSVG.path += "H " + (dst.pos.x) + " ";
                        //     currentSVG.pathElem.setAttribute("stroke", "#e91e63");

                        // }
                    }
                }

            }
        }

        // if x > source.right + margin
        else if (x > src.domBlockBorderElement.parentElement.getBoundingClientRect().x
            + src.domBlockBorderElement.parentElement.getBoundingClientRect().width + 2 * currentSVG.margin) {

            if (!dst.domBlockBorderElement) {
                //              |
                //           ___|
                //          |
                //          |

                currentSVG.path += "V " + (src.pos.y - currentSVG.margin) + " ";
                currentSVG.path += "H " + (src.domBlockBorderElement.parentElement.getBoundingClientRect().x + src.domBlockBorderElement.parentElement.getBoundingClientRect().width + x) / 2 + " ";
                currentSVG.path += "V " + y + " ";
                currentSVG.path += "H " + x + " ";
                currentSVG.pathElem.setAttribute("stroke", "violet");
            }
            else {
                if (dst.dir == "left") {
                    if (dst.pos.y < src.pos.y - currentSVG.margin) {
                        //                 .---------------->
                        //                 |
                        //                 |
                        //                 |
                        currentSVG.path += "V " + (dst.pos.y) + " ";
                        currentSVG.path += "H " + (dst.pos.x) + " ";
                        currentSVG.pathElem.setAttribute("stroke", "brown");
                    } else {
                        //              |
                        //           ___|
                        //          |
                        //          |

                        currentSVG.path += "V " + (src.pos.y - currentSVG.margin) + " ";
                        currentSVG.path += "H " + (src.domBlockBorderElement.parentElement.getBoundingClientRect().x + src.domBlockBorderElement.parentElement.getBoundingClientRect().width + dst.pos.x) / 2 + " ";
                        currentSVG.path += "V " + dst.pos.y + " ";
                        currentSVG.path += "H " + dst.pos.x + " ";
                        currentSVG.pathElem.setAttribute("stroke", "violet");
                    }
                }
                else if (dst.dir == "right") {
                    if ((src.pos.x < dst.domBlockBorderElement.parentElement.getBoundingClientRect().x + dst.domBlockBorderElement.parentElement.getBoundingClientRect().width / 2)) {
                        //    o __
                        //        |
                        //     ___|
                        //    |
                        //    |
                        // alert("here");
                        let ym = (dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height + src.pos.y) / 2;
                        if (ym < dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin) {
                            let l = dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin;
                            let l0 = dst.domBlockBorderElement.parentElement.getBoundingClientRect().y;
                            if (src.pos.y < l0) {
                                l0 = src.pos.y
                            }
                            l0 -= currentSVG.margin;
                            currentSVG.pathElem.setAttribute("stroke", "blue");

                            currentSVG.path += "V " + l0 + " ";
                            currentSVG.path += "H " + (dst.pos.x + currentSVG.margin) + " ";
                            currentSVG.path += "V " + (dst.pos.y) + " ";
                            currentSVG.path += "H " + (dst.pos.x) + " ";
                            // pass;
                        } else {
                            currentSVG.pathElem.setAttribute("stroke", "blue");
                            currentSVG.path += "V " + (ym) + " ";
                            currentSVG.path += "H " + (dst.pos.x + currentSVG.margin) + " ";
                            currentSVG.path += "V " + (dst.pos.y) + " ";
                            currentSVG.path += "H " + (dst.pos.x) + " ";
                            //currentSVG.path += "V " + (dst.pos.y) + " ";
                            //currentSVG.path += "H " + (dst.pos.x) + " ";

                        }
                    }
                    else {
                        currentSVG.pathElem.setAttribute("stroke", "cyan");
                        currentSVG.path += "V " + (dst.pos.y) + " ";
                        currentSVG.path += "H " + (dst.pos.x) + " ";
                    }
                    // currentSVG.pathElem.setAttribute("stroke", "cyan");
                    // currentSVG.path += "V " + (dst.pos.y) + " ";
                    // currentSVG.path += "H " + (dst.pos.x) + " ";
                }
            }
        }

        // if x < +margin [source] + margin
        else {

            if (y < src.pos.y) {
                if (!dst.domBlockBorderElement) {
                    currentSVG.pathElem.setAttribute("stroke", "red");// red
                    currentSVG.path += "V " + (src.pos.y - 2 * currentSVG.margin) + " ";
                    currentSVG.path += "H " + (x) + " ";
                    currentSVG.path += "V " + y + " ";
                }
                else {
                    if (dst.dir == "left") {
                        if (dst.pos.x < src.pos.x + currentSVG.margin) {
                            let ym = (dst.domBlockBorderElement.parentElement.getBoundingClientRect().y +
                                dst.domBlockBorderElement.parentElement.getBoundingClientRect().height +
                                src.domBlockBorderElement.parentElement.getBoundingClientRect().y) / 2;
                            currentSVG.pathElem.setAttribute("stroke", "yellow");
                            currentSVG.path += "V " + (ym) + " ";
                            currentSVG.path += "H " + (dst.pos.x - currentSVG.margin) + " ";
                            currentSVG.path += "V " + (dst.pos.y) + " ";
                            currentSVG.path += "H " + (dst.pos.x) + " ";
                        }
                        else {
                            currentSVG.pathElem.setAttribute("stroke", "black");
                            currentSVG.path += "V " + (dst.pos.y) + " ";
                            currentSVG.path += "H " + (dst.pos.x) + " ";
                        }

                    }

                    else if (dst.dir == "right") {
                        if ((dst.pos.x + currentSVG.margin > src.pos.x)) {
                            //    o __
                            //        |
                            //     ___|
                            //    |
                            //    |

                            let ym = (dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height + src.pos.y) / 2;
                            if (ym < dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin) {
                                let l = dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin;

                                currentSVG.pathElem.setAttribute("stroke", "red");
                                currentSVG.path += "V " + l + " ";
                                currentSVG.path += "H " + (dst.pos.x + currentSVG.margin) + " ";
                                currentSVG.path += "V " + (dst.pos.y) + " ";
                                currentSVG.path += "H " + (dst.pos.x) + " ";
                                // pass;
                            } else {
                                currentSVG.pathElem.setAttribute("stroke", "blue");
                                currentSVG.path += "V " + (ym) + " ";
                                currentSVG.path += "H " + (dst.pos.x + currentSVG.margin) + " ";
                                currentSVG.path += "V " + (dst.pos.y) + " ";
                                currentSVG.path += "H " + (dst.pos.x) + " ";
                                //currentSVG.path += "V " + (dst.pos.y) + " ";
                                //currentSVG.path += "H " + (dst.pos.x) + " ";

                            }
                        }
                        else {
                            currentSVG.pathElem.setAttribute("stroke", "cyan");
                            currentSVG.path += "V " + (dst.pos.y) + " ";
                            currentSVG.path += "H " + (dst.pos.x) + " ";
                        }

                    }
                    else if (dst.dir == "down") {
                        currentSVG.pathElem.setAttribute("stroke", "green");
                        currentSVG.path += "V " + (dst.pos.y) + " ";
                        currentSVG.path += "H " + (dst.pos.x) + " ";
                    }
                }
            }

            // dest.y > source.b
            else if (y > src.domBlockBorderElement.parentElement.getBoundingClientRect().y + src.domBlockBorderElement.parentElement.getBoundingClientRect().height) {
                if (dst.dir == "right") {
                    currentSVG.pathElem.setAttribute("stroke", "red");
                    currentSVG.path += "V " + (src.pos.y - currentSVG.margin) + " ";
                    if (x > src.domBlockBorderElement.parentElement.getBoundingClientRect().x + src.domBlockBorderElement.parentElement.getBoundingClientRect().width / 2) {
                        let l = Math.max(src.domBlockBorderElement.parentElement.getBoundingClientRect().x + src.domBlockBorderElement.parentElement.getBoundingClientRect().width + currentSVG.margin, dst.pos.x + currentSVG.margin)
                        currentSVG.path += "H " + (l) + " ";
                    }
                    else {
                        currentSVG.path += "H " + (src.domBlockBorderElement.parentElement.getBoundingClientRect().x + src.domBlockBorderElement.parentElement.getBoundingClientRect().width + currentSVG.margin) + " ";
                        //    currentSVG.path += "H " + (src.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin) + " ";
                    }
                    currentSVG.path += "V " + dst.pos.y + " ";
                    currentSVG.path += "H " + Math.max(dst.pos.x, dst.pos.x) + " ";
                    currentSVG.pathElem.setAttribute("stroke", "yellow");
                }
                else if (dst.dir == "left") {
                    currentSVG.pathElem.setAttribute("stroke", "red");
                    currentSVG.path += "V " + (src.pos.y - currentSVG.margin) + " ";
                    if (x > src.domBlockBorderElement.parentElement.getBoundingClientRect().x + src.domBlockBorderElement.parentElement.getBoundingClientRect().width + 2 * currentSVG.margin) {
                        currentSVG.path += "H " + (src.domBlockBorderElement.parentElement.getBoundingClientRect().x + src.domBlockBorderElement.parentElement.getBoundingClientRect().width + currentSVG.margin) + " ";
                    }
                    else {
                        let l = src.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin;
                        l = Math.min(l, dst.pos.x - currentSVG.margin)

                        currentSVG.path += "H " + l + " ";
                    }
                    currentSVG.path += "V " + dst.pos.y + " ";
                    currentSVG.path += "H " + dst.pos.x + " ";
                    currentSVG.pathElem.setAttribute("stroke", "red");
                }
            }
            // currentSVG.path += "H " + x + " ";
        }

    currentSVG.pathElem.setAttribute("d", currentSVG.path)
}
// V
export function moveToFromUpToBottom(x, y, currentSVG, reverse = false) {
    let src = currentSVG.source
    let dst = currentSVG.destination
    if (reverse) {
        dst = currentSVG.source
        src = currentSVG.destination
    }
     currentSVG.currentPos.x = x;
    currentSVG.currentPos.y = y;
    if (src.dir == "up") {
        // to up
        currentSVG.path = "M" + src.pos.x + "," + src.pos.y;
        if (src.pos.y - currentSVG.margin >= y) {
            if (!dst.domBlockBorderElement) {

                //              |
                //           ___|
                //          |
                //          |

                let my = (src.pos.y + y) / 2
                currentSVG.path += "V " + my + " ";
                currentSVG.path += "H " + x + " ";
                currentSVG.path += "V " + y + " ";
                currentSVG.pathElem.setAttribute("stroke", "violet");
            }
            else {
                if (dst.dir == "down") {
                    if (src.pos.y - dst.pos.y >= 2 * currentSVG.margin) {
                        //              |
                        //           ___|
                        //          |
                        //          |

                        let my = (src.pos.y + dst.pos.y) / 2
                        currentSVG.path += "V " + my + " ";
                        currentSVG.path += "H " + dst.pos.x + " ";
                        currentSVG.path += "V " + dst.pos.y + " ";
                        currentSVG.pathElem.setAttribute("stroke", "violet");
                    }
                    else {
                        console.log("here")
                        if (src.domBlockBorderElement.parentElement.getBoundingClientRect().x
                            + src.domBlockBorderElement.parentElement.getBoundingClientRect().width
                            - dst.domBlockBorderElement.parentElement.getBoundingClientRect().x > 2 * currentSVG.margin) {

                            if (src.pos.y - 2 * currentSVG.margin - dst.pos.y < 0) {
                                let hasThroughPath = (src.domBlockBorderElement.parentElement.getBoundingClientRect().x
                                    - (dst.domBlockBorderElement.parentElement.getBoundingClientRect().x
                                        + dst.domBlockBorderElement.parentElement.getBoundingClientRect().width + 2 * currentSVG.margin)) > 0;

                                if (!hasThroughPath) {
                                    currentSVG.path += "  v " + (- currentSVG.margin) + " ";
                                    if (src.pos.x > dst.pos.x) {
                                        currentSVG.path += "H " + (src.domBlockBorderElement.parentElement.getBoundingClientRect().x + src.domBlockBorderElement.parentElement.getBoundingClientRect().width + currentSVG.margin)
                                    } else {
                                        currentSVG.path += "H " + (src.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin)
                                    }
                                    currentSVG.path += "V " + (src.domBlockBorderElement.parentElement.getBoundingClientRect().y + src.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin)
                                    currentSVG.path += "H " + dst.pos.x
                                    currentSVG.path += "V " + dst.pos.y
                                    currentSVG.pathElem.setAttribute("stroke", "orange");
                                } else {
                                    currentSVG.path += " v " + (- currentSVG.margin) + " ";
                                    currentSVG.path += "H " + (src.domBlockBorderElement.parentElement.getBoundingClientRect().x + dst.domBlockBorderElement.parentElement.getBoundingClientRect().x + dst.domBlockBorderElement.parentElement.getBoundingClientRect().width) / 2
                                    currentSVG.path += "V " + (dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin)
                                    currentSVG.path += "H " + dst.pos.x
                                    currentSVG.path += "V " + dst.pos.y
                                    currentSVG.pathElem.setAttribute("stroke", "green");
                                }
                            }
                            else {

                                //  |_______
                                //          |         ^
                                //          |_________|

                                let l1 = src.domBlockBorderElement.parentElement.getBoundingClientRect().x;
                                let l2 = dst.domBlockBorderElement.parentElement.getBoundingClientRect().x + dst.domBlockBorderElement.parentElement.getBoundingClientRect().width;
                                let l = (l1 + l2) / 2
                                if (l > src.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin) {
                                    l = src.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin;
                                }
                                let l3 = dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin;
                                currentSVG.path += "  V " + (src.pos.y - currentSVG.margin) + " ";
                                currentSVG.path += "H " + l + " ";
                                currentSVG.path += "V " + l3 + " ";
                                currentSVG.path += "H " + (dst.pos.x) + " ";
                                currentSVG.path += "V " + dst.pos.y + " ";
                                currentSVG.pathElem.setAttribute("stroke", "red");

                            }    //
                        }
                        else if (dst.domBlockBorderElement.parentElement.getBoundingClientRect().x -
                            (src.domBlockBorderElement.parentElement.getBoundingClientRect().x
                                + src.domBlockBorderElement.parentElement.getBoundingClientRect().width) > 2 * currentSVG.margin) {
                            let l1 = src.domBlockBorderElement.parentElement.getBoundingClientRect().x + src.domBlockBorderElement.parentElement.getBoundingClientRect().width;
                            let l2 = dst.domBlockBorderElement.parentElement.getBoundingClientRect().x;
                            let l = (l1 + l2) / 2
                            // if (l > src.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin) {
                            //     l = src.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin;
                            // }
                            let l3 = dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin;
                            currentSVG.path += "  V " + (src.pos.y - currentSVG.margin) + " ";
                            currentSVG.path += "H " + l + " ";
                            currentSVG.path += "V " + l3 + " ";
                            currentSVG.path += "H " + (dst.pos.x) + " ";
                            currentSVG.path += "V " + dst.pos.y + " ";

                            currentSVG.pathElem.setAttribute("stroke", "cyan");
                        }
                        else {

                            currentSVG.pathElem.setAttribute("stroke", "red");
                            currentSVG.path += "  V " + (src.pos.y - currentSVG.margin) + " ";
                            // currentSVG.path += "H " + l + " ";
                            // currentSVG.path += "V " + l3 + " ";
                            currentSVG.path += "H " + (src.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin) + " ";
                            currentSVG.path += "V " + (src.domBlockBorderElement.parentElement.getBoundingClientRect().y + src.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin) + " ";
                            currentSVG.path += "H " + (dst.pos.x) + " ";
                            currentSVG.path += "V " + dst.pos.y + " ";

                            currentSVG.pathElem.setAttribute("stroke", "red");

                        }
                    }
                }
            }
        }
        else {
            if (src.pos.y - dst.pos.y >= 2 * currentSVG.margin) {
                let my = (src.pos.y + dst.pos.y) / 2
                currentSVG.path += "V " + my + " ";
                currentSVG.path += "H " + dst.pos.x + " ";
                currentSVG.path += "V " + dst.pos.y + " ";
                currentSVG.pathElem.setAttribute("stroke", "violet");
            }
            else {
                if (dst.domBlockBorderElement.parentElement.getBoundingClientRect().x +
                    dst.domBlockBorderElement.parentElement.getBoundingClientRect().width + 2 * currentSVG.margin
                    < src.domBlockBorderElement.parentElement.getBoundingClientRect().x) {

                    //
                    //  |_______
                    //          |         ^
                    //          |_________|

                    let l1 = src.domBlockBorderElement.parentElement.getBoundingClientRect().x;
                    let l2 = dst.domBlockBorderElement.parentElement.getBoundingClientRect().x + dst.domBlockBorderElement.parentElement.getBoundingClientRect().width;
                    let l = (l1 + l2) / 2
                    if (l > src.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin) {
                        l = src.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin;
                    }
                    let l3 = dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin;
                    currentSVG.path += "  V " + (src.pos.y - currentSVG.margin) + " ";
                    currentSVG.path += "H " + l + " ";
                    currentSVG.path += "V " + l3 + " ";
                    currentSVG.path += "H " + (dst.pos.x) + " ";
                    currentSVG.path += "V " + dst.pos.y + " ";

                    currentSVG.pathElem.setAttribute("stroke", "pink");

                }
                else {
                    //          _________
                    //  |      |         |
                    //  |      ^         | 
                    //  |________________|

                    let ydown = Math.max(dst.pos.y + currentSVG.margin, src.domBlockBorderElement.parentElement.getBoundingClientRect().y + src.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin);
                    // through
                    let xmid = (src.domBlockBorderElement.parentElement.getBoundingClientRect().width / 2 + currentSVG.margin)
                    if (src.domBlockBorderElement.parentElement.getBoundingClientRect().x + src.domBlockBorderElement.parentElement.getBoundingClientRect().width + currentSVG.margin * 2 < dst.domBlockBorderElement.parentElement.getBoundingClientRect().x) {
                        ydown = dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin;
                        xmid = dst.domBlockBorderElement.parentElement.getBoundingClientRect().width / 2 + (dst.domBlockBorderElement.parentElement.getBoundingClientRect().x - src.domBlockBorderElement.parentElement.getBoundingClientRect().x - src.domBlockBorderElement.parentElement.getBoundingClientRect().width) / 2
                    } else if (src.pos.x < dst.pos.x) {
                        // from left
                        xmid = -xmid;

                    }
                    let xright = src.domBlockBorderElement.parentElement.getBoundingClientRect().x + src.domBlockBorderElement.parentElement.getBoundingClientRect().width + currentSVG.margin;
                    currentSVG.path += "  v " + (- currentSVG.margin) + " ";
                    currentSVG.path += "h " + xmid + " ";
                    currentSVG.path += "V " + (ydown) + " ";
                    currentSVG.path += "H " + (dst.pos.x) + " ";
                    currentSVG.path += "V " + dst.pos.y + " ";
                    // currentSVG.path += "  V " + ydown + " ";
                    // currentSVG.path += "H " + xright + " ";
                    // currentSVG.path += "V " + (src.pos.y - currentSVG.margin) + " ";
                    // currentSVG.path += "H " + (dst.pos.x) + " ";
                    // currentSVG.path += "V " + dst.pos.y + " ";

                    currentSVG.pathElem.setAttribute("stroke", "brown");
                    // currentSVG.pathElem.setAttribute("d", currentSVG.path)
                    // return
                }


            }
        }
    }

    currentSVG.pathElem.setAttribute("d", currentSVG.path)
}
export function moveFromUpToUp(x, y, currentSVG) {
    let src = currentSVG.source
    let dst = currentSVG.destination
    currentSVG.currentPos.x = x;
    currentSVG.currentPos.y = y;
    if (src.dir == "up") {
        // to up
        currentSVG.path = "M" + src.pos.x + "," + src.pos.y;
        if (true) {
            if (!dst.domBlockBorderElement) {
                if (src.pos.y - currentSVG.margin >= y) {
                    //              |
                    //           ___|
                    //          |
                    //          |
                    let my = (src.pos.y - y) / 2
                    my = Math.max(currentSVG.margin, my)
                    currentSVG.path += "v " + -my + " ";
                    currentSVG.path += "H " + x + " ";
                    currentSVG.path += "V " + y + " ";
                    currentSVG.pathElem.setAttribute("stroke", "green");
                }
                else {
                    currentSVG.path = "M" + src.pos.x + "," + src.pos.y;
                    if (y > src.pos.y - currentSVG.margin) {
                        //              |
                        //           ___|
                        //          |
                        //          |
                        let my = (src.pos.y + y) / 2
                        currentSVG.path += "v " + (-currentSVG.margin) + " ";
                        currentSVG.path += "H " + x + " ";
                        currentSVG.path += "V " + y + " ";
                        currentSVG.pathElem.setAttribute("stroke", "cyan");

                    }
                }
            }
            else {
                if (dst.dir == "up") {
                    if (!dst.domBlockBorderElement) {
                        if (src.pos.y - dst.pos.y >= 2 * currentSVG.margin) {

                            //              |
                            //           ___|
                            //          |
                            //          |

                            let my = (src.pos.y + dst.pos.y) / 2
                            currentSVG.path += "V " + my + " ";
                            currentSVG.path += "H " + dst.pos.x + " ";
                            currentSVG.path += "V " + dst.pos.y + " ";
                            currentSVG.pathElem.setAttribute("stroke", "violet");
                            currentSVG.pathElem.setAttribute("d", currentSVG.path)
                        }

                    }
                    else {

                        if (false && (src.pos.x < dst.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin
                            || src.pos.x < dst.domBlockBorderElement.parentElement.getBoundingClientRect().x + dst.domBlockBorderElement.parentElement.getBoundingClientRect().width + currentSVG.margin)) {
                            currentSVG.path += "V " + Math.min(src.pos.y - currentSVG.margin, dst.pos.y - currentSVG.margin) + " ";
                            currentSVG.path += "H " + dst.pos.x + " ";
                            currentSVG.path += "V " + dst.pos.y + " ";
                            currentSVG.pathElem.setAttribute("stroke", "green");
                        } else {
                            if (src.pos.x < dst.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin) {
                                currentSVG.path += "V " + Math.min(src.pos.y - currentSVG.margin, dst.pos.y - currentSVG.margin) + " ";
                                currentSVG.path += "H " + dst.pos.x + " ";
                                currentSVG.path += "V " + dst.pos.y + " ";
                                currentSVG.pathElem.setAttribute("stroke", "gray");

                                // currentSVG.path += "H " + (dst.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin) + " ";
                                // currentSVG.path += "V " + 20 + " ";
                                // currentSVG.path += "H " + 20 + " ";
                            }
                            else if (src.pos.x < dst.domBlockBorderElement.parentElement.getBoundingClientRect().x + dst.domBlockBorderElement.parentElement.getBoundingClientRect().width / 2) {
                                // currentSVG.path += "V " + Math.min(src.pos.y - currentSVG.margin, dst.pos.y - currentSVG.margin) + " ";
                                if (src.pos.y > dst.pos.y) {
                                    let my = (src.pos.y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height) / 2
                                    currentSVG.path += "V " + my + " ";
                                    currentSVG.path += "H " + (dst.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin) + " ";
                                    currentSVG.path += "V " + (dst.pos.y - currentSVG.margin) + " ";
                                    currentSVG.path += "H " + dst.pos.x + " ";
                                    currentSVG.path += "V " + dst.pos.y + " ";
                                    currentSVG.pathElem.setAttribute("stroke", "red");
                                } else {
                                    let my = (dst.pos.y + src.domBlockBorderElement.parentElement.getBoundingClientRect().y + src.domBlockBorderElement.parentElement.getBoundingClientRect().height) / 2
                                    currentSVG.path += "v " + -currentSVG.margin + " ";
                                    currentSVG.path += "H " + (src.domBlockBorderElement.parentElement.getBoundingClientRect().x + src.domBlockBorderElement.parentElement.getBoundingClientRect().width + currentSVG.margin) + " ";
                                    currentSVG.path += "V " + Math.min(dst.pos.y - currentSVG.margin, my) + " ";
                                    currentSVG.path += "H " + dst.pos.x + " ";
                                    currentSVG.path += "V " + dst.pos.y + " ";
                                    currentSVG.pathElem.setAttribute("stroke", "orange");
                                }

                            }
                            else if (src.pos.x < dst.domBlockBorderElement.parentElement.getBoundingClientRect().x + dst.domBlockBorderElement.parentElement.getBoundingClientRect().width + currentSVG.margin) {

                                if (src.pos.y > dst.pos.y) {
                                    let my = (src.pos.y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height) / 2
                                    currentSVG.path += "V " + my + " ";
                                    currentSVG.path += "H " + (dst.domBlockBorderElement.parentElement.getBoundingClientRect().x + dst.domBlockBorderElement.parentElement.getBoundingClientRect().width + currentSVG.margin) + " ";
                                    currentSVG.path += "V " + (dst.pos.y - currentSVG.margin) + " ";
                                    currentSVG.path += "H " + dst.pos.x + " ";
                                    currentSVG.path += "V " + dst.pos.y + " ";
                                    currentSVG.pathElem.setAttribute("stroke", "blue");
                                } else {
                                    let my = (dst.pos.y + src.domBlockBorderElement.parentElement.getBoundingClientRect().y + src.domBlockBorderElement.parentElement.getBoundingClientRect().height) / 2
                                    currentSVG.path += "v " + -currentSVG.margin + " ";
                                    currentSVG.path += "H " + (src.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin) + " ";
                                    currentSVG.path += "V " + Math.min(dst.pos.y - currentSVG.margin, my) + " ";
                                    currentSVG.path += "H " + dst.pos.x + " ";
                                    currentSVG.path += "V " + dst.pos.y + " ";
                                    currentSVG.pathElem.setAttribute("stroke", "orange");
                                }
                            }
                            else {
                                currentSVG.path += "V " + Math.min(dst.pos.y - currentSVG.margin, src.pos.y - currentSVG.margin) + " ";
                                currentSVG.path += "H " + (dst.pos.x) + " ";
                                currentSVG.path += "V " + (dst.pos.y) + " ";
                                currentSVG.path += "H " + dst.pos.x + " ";
                                currentSVG.path += "V " + dst.pos.y + " ";
                                currentSVG.pathElem.setAttribute("stroke", "yellow");
                            }

                            // currentSVG.path += "H " + dst.pos.x + " ";
                            // currentSVG.path += "V " + dst.pos.y + " ";
                            // currentSVG.pathElem.setAttribute("stroke", "yellow");
                        }

                        currentSVG.pathElem.setAttribute("d", currentSVG.path)
                        return
                        console.log("here")
                        if (src.domBlockBorderElement.parentElement.getBoundingClientRect().x
                            + src.domBlockBorderElement.parentElement.getBoundingClientRect().width
                            - dst.domBlockBorderElement.parentElement.getBoundingClientRect().x > 2 * currentSVG.margin) {

                            if (src.pos.y - 2 * currentSVG.margin - dst.pos.y < 0) {
                                let hasThroughPath = (src.domBlockBorderElement.parentElement.getBoundingClientRect().x
                                    - (dst.domBlockBorderElement.parentElement.getBoundingClientRect().x
                                        + dst.domBlockBorderElement.parentElement.getBoundingClientRect().width + 2 * currentSVG.margin)) > 0;

                                if (!hasThroughPath) {
                                    currentSVG.path += "  v " + (- currentSVG.margin) + " ";
                                    if (src.pos.x > dst.pos.x) {
                                        currentSVG.path += "H " + (src.domBlockBorderElement.parentElement.getBoundingClientRect().x + src.domBlockBorderElement.parentElement.getBoundingClientRect().width + currentSVG.margin)
                                    } else {
                                        currentSVG.path += "H " + (src.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin)
                                    }
                                    currentSVG.path += "V " + (src.domBlockBorderElement.parentElement.getBoundingClientRect().y + src.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin)
                                    currentSVG.path += "H " + dst.pos.x
                                    currentSVG.path += "V " + dst.pos.y
                                    currentSVG.pathElem.setAttribute("stroke", "orange");
                                } else {
                                    currentSVG.path += " v " + (- currentSVG.margin) + " ";
                                    currentSVG.path += "H " + (src.domBlockBorderElement.parentElement.getBoundingClientRect().x + dst.domBlockBorderElement.parentElement.getBoundingClientRect().x + dst.domBlockBorderElement.parentElement.getBoundingClientRect().width) / 2
                                    currentSVG.path += "V " + (dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin)
                                    currentSVG.path += "H " + dst.pos.x
                                    currentSVG.path += "V " + dst.pos.y
                                    currentSVG.pathElem.setAttribute("stroke", "green");
                                }
                            }
                            else {

                                //  |_______
                                //          |         ^
                                //          |_________|

                                let l1 = src.domBlockBorderElement.parentElement.getBoundingClientRect().x;
                                let l2 = dst.domBlockBorderElement.parentElement.getBoundingClientRect().x + dst.domBlockBorderElement.parentElement.getBoundingClientRect().width;
                                let l = (l1 + l2) / 2
                                if (l > src.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin) {
                                    l = src.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin;
                                }
                                let l3 = dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin;
                                currentSVG.path += "  V " + (src.pos.y - currentSVG.margin) + " ";
                                currentSVG.path += "H " + l + " ";
                                currentSVG.path += "V " + l3 + " ";
                                currentSVG.path += "H " + (dst.pos.x) + " ";
                                currentSVG.path += "V " + dst.pos.y + " ";
                                currentSVG.pathElem.setAttribute("stroke", "red");

                            }    //
                        }
                        else if (dst.domBlockBorderElement.parentElement.getBoundingClientRect().x -
                            (src.domBlockBorderElement.parentElement.getBoundingClientRect().x
                                + src.domBlockBorderElement.parentElement.getBoundingClientRect().width) > 2 * currentSVG.margin) {
                            let l1 = src.domBlockBorderElement.parentElement.getBoundingClientRect().x + src.domBlockBorderElement.parentElement.getBoundingClientRect().width;
                            let l2 = dst.domBlockBorderElement.parentElement.getBoundingClientRect().x;
                            let l = (l1 + l2) / 2
                            // if (l > src.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin) {
                            //     l = src.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin;
                            // }
                            let l3 = dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin;
                            currentSVG.path += "  V " + (src.pos.y - currentSVG.margin) + " ";
                            currentSVG.path += "H " + l + " ";
                            currentSVG.path += "V " + l3 + " ";
                            currentSVG.path += "H " + (dst.pos.x) + " ";
                            currentSVG.path += "V " + dst.pos.y + " ";

                            currentSVG.pathElem.setAttribute("stroke", "cyan");
                        }
                        else {

                            currentSVG.pathElem.setAttribute("stroke", "red");
                            currentSVG.path += "  V " + (src.pos.y - currentSVG.margin) + " ";
                            // currentSVG.path += "H " + l + " ";
                            // currentSVG.path += "V " + l3 + " ";
                            currentSVG.path += "H " + (src.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin) + " ";
                            currentSVG.path += "V " + (src.domBlockBorderElement.parentElement.getBoundingClientRect().y + src.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin) + " ";
                            currentSVG.path += "H " + (dst.pos.x) + " ";
                            currentSVG.path += "V " + dst.pos.y + " ";

                            currentSVG.pathElem.setAttribute("stroke", "red");

                        }
                    }
                }
            }
        }
    }

    currentSVG.pathElem.setAttribute("d", currentSVG.path)
}

export function moveFromLeftToUp(x, y, currentSVG) {
    // moveFromUpToLeftOrRight(x, y, currentSVG, true);
    moveFromUpToLeft(x,y,currentSVG, true);
}

export function moveFromLeftToLeft(x, y, currentSVG) {
    let src = currentSVG.source
    let dst = currentSVG.destination
     currentSVG.currentPos.x = x;
    currentSVG.currentPos.y = y;
    currentSVG.path += "";
    // currentSVG.pathElem.setAttribute("stroke", "black");


    currentSVG.path = "M" + src.pos.x + "," + src.pos.y;
    if (!dst.domBlockBorderElement) {
        //              |
        //           ___|
        //          |
        //          |

        let my = (src.pos.y + y) / 2
        currentSVG.path += "H " + x + " ";
        currentSVG.path += "V " + y + " ";
        currentSVG.pathElem.setAttribute("stroke", "violet");
        currentSVG.pathElem.setAttribute("d", currentSVG.path)

    }
    else {

        if (src.pos.y + currentSVG.margin
            <= dst.domBlockBorderElement.parentElement.getBoundingClientRect().y) {
            currentSVG.path += "H " + Math.min(src.pos.x - currentSVG.margin, dst.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin) + " ";
            currentSVG.path += "V " + dst.pos.y + " ";
            currentSVG.path += "H " + dst.pos.x + " ";
            currentSVG.pathElem.setAttribute("stroke", "pink");
            currentSVG.pathElem.setAttribute("d", currentSVG.path)

        }
        else if (src.domBlockBorderElement.parentElement.getBoundingClientRect().y
            + src.domBlockBorderElement.parentElement.getBoundingClientRect().height
            + currentSVG.margin > dst.pos.y) {

            if (src.pos.y <= dst.pos.y) {
                if (src.pos.x <= dst.pos.x) {
                    let dx = Math.min((src.domBlockBorderElement.parentElement.getBoundingClientRect().x
                        + src.domBlockBorderElement.parentElement.getBoundingClientRect().width
                        + dst.domBlockBorderElement.parentElement.getBoundingClientRect().x) / 2, dst.pos.x - currentSVG.margin);
                    let dy = src.domBlockBorderElement.parentElement.getBoundingClientRect().y
                        + src.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin;

                    currentSVG.path += "H " + (src.pos.x - currentSVG.margin) + " ";
                    currentSVG.path += "V " + dy + " ";
                    currentSVG.path += "H " + dx + " ";
                    currentSVG.path += "V " + dst.pos.y + " ";
                    currentSVG.path += "H " + dst.pos.x + " ";
                    currentSVG.pathElem.setAttribute("stroke", "green");
                    currentSVG.pathElem.setAttribute("d", currentSVG.path)
                }
                else {
                    let dx =
                        (dst.domBlockBorderElement.parentElement.getBoundingClientRect().x
                            + dst.domBlockBorderElement.parentElement.getBoundingClientRect().width
                            + src.domBlockBorderElement.parentElement.getBoundingClientRect().x) / 2;
                    let dy = src.domBlockBorderElement.parentElement.getBoundingClientRect().y
                        + src.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin;

                    currentSVG.path += "H " + Math.min(dx, src.pos.x - currentSVG.margin) + " ";
                    currentSVG.path += "V " + (dst.domBlockBorderElement.parentElement.getBoundingClientRect().y - currentSVG.margin) + " ";
                    currentSVG.path += "H " + (dst.pos.x - currentSVG.margin) + " ";
                    currentSVG.path += "V " + dst.pos.y + " ";
                    currentSVG.path += "H " + dst.pos.x + " ";
                    currentSVG.pathElem.setAttribute("stroke", "green");
                    currentSVG.pathElem.setAttribute("d", currentSVG.path)
                }
            }
            else {
                let dx;
                if (src.pos.x < dst.pos.x) {
                    dx = Math.min((src.domBlockBorderElement.parentElement.getBoundingClientRect().x
                        + src.domBlockBorderElement.parentElement.getBoundingClientRect().width
                        + dst.domBlockBorderElement.parentElement.getBoundingClientRect().x) / 2, dst.pos.x - currentSVG.margin);
                    currentSVG.pathElem.setAttribute("stroke", "red");

                } else {
                    // dx = Math.min(src.pos.x - currentSVG.margin, dst.pos.x - currentSVG.margin);
                    dx = dst.pos.x - currentSVG.margin;
                    currentSVG.pathElem.setAttribute("stroke", "blue");

                }

                let dy = Math.min(src.domBlockBorderElement.parentElement.getBoundingClientRect().y - currentSVG.margin,
                    dst.pos.y);

                if (src.pos.x > dst.pos.x
                    && src.pos.y < dst.domBlockBorderElement.parentElement.getBoundingClientRect().y +
                    dst.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin) {
                    currentSVG.path += "H " + Math.min(src.pos.x - currentSVG.margin, (dst.domBlockBorderElement.parentElement.getBoundingClientRect().x + dst.domBlockBorderElement.parentElement.getBoundingClientRect().width + src.pos.x) / 2) + " ";
                    currentSVG.path += "V " + (dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin) + " ";
                    let mx = (src.domBlockBorderElement.parentElement.getBoundingClientRect().x
                        + src.domBlockBorderElement.parentElement.getBoundingClientRect().width
                        + dst.pos.x) / 2;

                    currentSVG.path += "H " + Math.min(mx, dst.pos.x - currentSVG.margin) + " ";
                    currentSVG.pathElem.setAttribute("stroke", "red");
                    currentSVG.path += "V " + dst.pos.y + " ";
                    currentSVG.path += "H " + (dst.pos.x) + " ";

                } else {
                    currentSVG.path += "H " + Math.min(src.pos.x - currentSVG.margin, dst.pos.x - currentSVG.margin) + " ";
                    currentSVG.path += "V " + dy + " ";
                    let mx = (src.domBlockBorderElement.parentElement.getBoundingClientRect().x
                        + src.domBlockBorderElement.parentElement.getBoundingClientRect().width
                        + dst.pos.x) / 2;

                    currentSVG.path += "H " + Math.min(mx, dst.pos.x - currentSVG.margin) + " ";
                    currentSVG.pathElem.setAttribute("stroke", "orange");
                    currentSVG.path += "V " + dst.pos.y + " ";
                    currentSVG.path += "H " + (dst.pos.x) + " ";

                }
                currentSVG.pathElem.setAttribute("d", currentSVG.path)
            }


        }
        // else if (src.pos.y + currentSVG.margin <= dst.pos.y) {
        //     if (src.pos.x >= dst.pos.x) {
        //         currentSVG.path += "H " + Math.min(src.pos.x - currentSVG.margin, dst.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin) + " ";
        //         currentSVG.path += "V " + dst.pos.y + " ";
        //         currentSVG.path += "H " + dst.pos.x + " ";
        //         currentSVG.pathElem.setAttribute("stroke", "blue");
        //         currentSVG.pathElem.setAttribute("d", currentSVG.path)    
        //     }
        //     else {
        //         currentSVG.path += "H " + Math.min(src.pos.x - currentSVG.margin, dst.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin) + " ";
        //         currentSVG.path += "V " + dst.pos.y + " ";
        //         currentSVG.path += "H " + dst.pos.x + " ";
        //         currentSVG.pathElem.setAttribute("stroke", "red");
        //         currentSVG.pathElem.setAttribute("d", currentSVG.path)
        //     }
        // }
    }
}
// V
export function moveFromLeftToRight(x, y, currentSVG, reverse= false) {
    let src = currentSVG.source
    let dst = currentSVG.destination
    if (reverse) {
        dst = currentSVG.source
        src = currentSVG.destination
    }

     currentSVG.currentPos.x = x;
    currentSVG.currentPos.y = y;
    currentSVG.path += "";
    currentSVG.path = "M" + src.pos.x + "," + src.pos.y;
    currentSVG.path = "M" + src.pos.x + "," + src.pos.y;
    if (!dst.domBlockBorderElement) {
        //              |
        //           ___|
        //          |
        //          |

        let my = (src.pos.y + y) / 2
        currentSVG.path += "H " + x + " ";
        currentSVG.path += "V " + y + " ";
        currentSVG.pathElem.setAttribute("stroke", "yellow");
        currentSVG.pathElem.setAttribute("d", currentSVG.path)

    }
    else {
        if (src.pos.x - 2 * currentSVG.margin
            >= dst.domBlockBorderElement.parentElement.getBoundingClientRect().x + dst.domBlockBorderElement.parentElement.getBoundingClientRect().width) {
            currentSVG.path += "H " + Math.min(src.pos.x - currentSVG.margin,
                (dst.domBlockBorderElement.parentElement.getBoundingClientRect().x
                    + dst.domBlockBorderElement.parentElement.getBoundingClientRect().width
                    + src.pos.x) / 2) + " ";
            currentSVG.path += "V " + dst.pos.y + " ";
            currentSVG.path += "H " + dst.pos.x + " ";
            currentSVG.pathElem.setAttribute("stroke", "pink");
            currentSVG.pathElem.setAttribute("d", currentSVG.path)

        }
        // Top or bottom
        else {
            if (src.pos.y < dst.pos.y) {
                if (src.domBlockBorderElement.parentElement.getBoundingClientRect().y
                    + src.domBlockBorderElement.parentElement.getBoundingClientRect().height
                    + 2 * currentSVG.margin < dst.domBlockBorderElement.parentElement.getBoundingClientRect().y) {

                    currentSVG.path += "H " + (src.pos.x - currentSVG.margin) + ' ';
                    let my = (src.domBlockBorderElement.parentElement.getBoundingClientRect().y
                        + src.domBlockBorderElement.parentElement.getBoundingClientRect().height
                        + dst.domBlockBorderElement.parentElement.getBoundingClientRect().y) / 2
                    currentSVG.path += "V " + my + ' ';
                    currentSVG.path += "H " + (dst.pos.x + currentSVG.margin) + ' ';
                    currentSVG.path += "V " + (dst.pos.y) + ' ';
                    currentSVG.path += "H " + (dst.pos.x) + ' ';
                    currentSVG.pathElem.setAttribute("stroke", "green");
                    currentSVG.pathElem.setAttribute("d", currentSVG.path)
                }
                else {
                    currentSVG.path += "H " + (src.pos.x - currentSVG.margin) + ' ';

                    currentSVG.path += "V " + (src.domBlockBorderElement.parentElement.getBoundingClientRect().y - currentSVG.margin) + ' ';
                    currentSVG.path += "H " + Math.max(dst.pos.x + currentSVG.margin, src.domBlockBorderElement.parentElement.getBoundingClientRect().x + src.domBlockBorderElement.parentElement.getBoundingClientRect().width + currentSVG.margin) + ' ';
                    currentSVG.path += "V " + (dst.pos.y) + ' ';
                    currentSVG.path += "H " + (dst.pos.x) + ' ';
                    currentSVG.pathElem.setAttribute("stroke", "red");
                    currentSVG.pathElem.setAttribute("d", currentSVG.path)
                }
            }
            else {
                if (dst.domBlockBorderElement.parentElement.getBoundingClientRect().y
                    + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height
                    + 2 * currentSVG.margin < src.domBlockBorderElement.parentElement.getBoundingClientRect().y) {

                    currentSVG.path += "H " + (src.pos.x - currentSVG.margin) + ' ';
                    let my = (src.domBlockBorderElement.parentElement.getBoundingClientRect().y
                        + src.domBlockBorderElement.parentElement.getBoundingClientRect().height
                        + dst.domBlockBorderElement.parentElement.getBoundingClientRect().y) / 2
                    currentSVG.path += "V " + my + ' ';
                    currentSVG.path += "H " + (dst.pos.x + currentSVG.margin) + ' ';
                    currentSVG.path += "V " + (dst.pos.y) + ' ';
                    currentSVG.path += "H " + (dst.pos.x) + ' ';
                    currentSVG.pathElem.setAttribute("stroke", "yellow");
                    currentSVG.pathElem.setAttribute("d", currentSVG.path)
                }
                else {
                    currentSVG.path += "H " + (src.pos.x - currentSVG.margin) + ' ';

                    currentSVG.path += "V " + (src.domBlockBorderElement.parentElement.getBoundingClientRect().y + src.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin) + ' ';
                    currentSVG.path += "H " + Math.max(dst.pos.x + currentSVG.margin, src.domBlockBorderElement.parentElement.getBoundingClientRect().x + src.domBlockBorderElement.parentElement.getBoundingClientRect().width + currentSVG.margin) + ' ';
                    currentSVG.path += "V " + (dst.pos.y) + ' ';
                    currentSVG.path += "H " + (dst.pos.x) + ' ';
                    currentSVG.pathElem.setAttribute("stroke", "red");
                    currentSVG.pathElem.setAttribute("d", currentSVG.path)
                }
            }
        }
    }

}
// V
export function moveFromLeftToBottom(x, y, currentSVG, reverse = false) {
    let src = currentSVG.source
    let dst = currentSVG.destination
    if (reverse) {
        dst = currentSVG.source
        src = currentSVG.destination
    }
    currentSVG.currentPos.x = x;
    currentSVG.currentPos.y = y;
    currentSVG.path += "";
    currentSVG.path = "M" + src.pos.x + "," + src.pos.y;
    currentSVG.path = "M" + src.pos.x + "," + src.pos.y;
    if (!dst.domBlockBorderElement) {
        //              |
        //           ___|
        //          |
        //          |

        let my = (src.pos.y + y) / 2
        currentSVG.path += "H " + x + " ";
        currentSVG.path += "V " + y + " ";
        currentSVG.pathElem.setAttribute("stroke", "yellow");
        currentSVG.pathElem.setAttribute("d", currentSVG.path)

    }
    else {
        if (src.pos.x - 2 * currentSVG.margin
            < dst.domBlockBorderElement.parentElement.getBoundingClientRect().x + dst.domBlockBorderElement.parentElement.getBoundingClientRect().width) {

            if (dst.pos.y > src.domBlockBorderElement.parentElement.getBoundingClientRect().y - 2 * currentSVG.margin) {
                if (src.pos.x > dst.pos.x + currentSVG.margin && src.pos.y > dst.pos.y + currentSVG.margin) {
                    currentSVG.path += "H " + dst.pos.x + " ";
                    currentSVG.path += "V " + dst.pos.y + " ";
                    currentSVG.pathElem.setAttribute("stroke", "green");
                }
                else {
                    currentSVG.path += "H " + Math.min(src.pos.x - currentSVG.margin, dst.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin);
                    currentSVG.path += "V " + Math.max(dst.pos.y + currentSVG.margin, src.domBlockBorderElement.parentElement.getBoundingClientRect().y + src.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin) + " ";
                    currentSVG.path += "H " + dst.pos.x + " ";
                    currentSVG.path += "V " + dst.pos.y + " ";
                    currentSVG.pathElem.setAttribute("stroke", "green");
                }
            }
            else {
                if (src.pos.x - currentSVG.margin < dst.pos.x) {
                    currentSVG.path += "H " + (src.pos.x - currentSVG.margin);
                    currentSVG.path += "V " + (dst.pos.y + src.domBlockBorderElement.parentElement.getBoundingClientRect().y) / 2 + " ";
                    currentSVG.path += "H " + dst.pos.x + " ";
                    currentSVG.path += "V " + dst.pos.y + " ";
                    currentSVG.pathElem.setAttribute("stroke", "red");
                }
                else {
                    currentSVG.path += "H " + dst.pos.x + " ";
                    currentSVG.path += "V " + dst.pos.y + " ";
                    currentSVG.pathElem.setAttribute("stroke", "cyan");
                }

            }
            currentSVG.pathElem.setAttribute("d", currentSVG.path)
            // currentSVG.path += "H " + Math.min(src.pos.x - currentSVG.margin,
            //     (dst.domBlockBorderElement.parentElement.getBoundingClientRect().x
            //         + dst.domBlockBorderElement.parentElement.getBoundingClientRect().width
            //         + src.pos.x) / 2) + " ";
            // currentSVG.path += "V " + dst.pos.y + " ";
            // currentSVG.path += "H " + dst.pos.x + " ";
            // currentSVG.pathElem.setAttribute("stroke", "pink");
            // currentSVG.pathElem.setAttribute("d", currentSVG.path)

        }
        else {
            if (dst.pos.y > src.domBlockBorderElement.parentElement.getBoundingClientRect().y - 2 * currentSVG.margin) {
                // if (dst.pos.y > src.domBlockBorderElement.parentElement.getBoundingClientRect().y - 2 * currentSVG.margin) {

                if (src.pos.y < dst.pos.y + currentSVG.margin) {
                    currentSVG.path += "H " + Math.min(src.pos.x - currentSVG.margin, (src.domBlockBorderElement.parentElement.getBoundingClientRect().x + src.domBlockBorderElement.parentElement.getBoundingClientRect().width + dst.domBlockBorderElement.parentElement.getBoundingClientRect().x) / 2);
                    currentSVG.path += "V " + (dst.pos.y + currentSVG.margin) + " ";
                    currentSVG.path += "H " + dst.pos.x + " ";
                    currentSVG.path += "V " + dst.pos.y + " ";

                    currentSVG.pathElem.setAttribute("stroke", "blue");
                }
                else {
                    currentSVG.path += "H " + dst.pos.x + " ";
                    currentSVG.path += "V " + dst.pos.y + " ";
                    currentSVG.pathElem.setAttribute("stroke", "cyan");
                }


            }
            else {
                // currentSVG.path += "H " + (src.pos.x - currentSVG.margin);
                // currentSVG.path += "V " + (dst.pos.y + src.domBlockBorderElement.parentElement.getBoundingClientRect().y) / 2 + " ";
                // currentSVG.path += "H " + dst.pos.x + " ";
                // currentSVG.path += "V " + dst.pos.y + " ";
                // currentSVG.pathElem.setAttribute("stroke", "brown");
                // currentSVG.pathElem.setAttribute("d", currentSVG.path)
                currentSVG.path += "H " + dst.pos.x + " ";
                currentSVG.path += "V " + dst.pos.y + " ";
                currentSVG.pathElem.setAttribute("stroke", "brown");

            }
            currentSVG.pathElem.setAttribute("d", currentSVG.path)
        }
    }
}

export function moveFromRightToRight(x, y, currentSVG) {
    let src = currentSVG.source
    let dst = currentSVG.destination
    currentSVG.currentPos.x = x;
    currentSVG.currentPos.y = y;
    currentSVG.path += "";
    currentSVG.path = "M" + src.pos.x + "," + src.pos.y;
    if (!dst.domBlockBorderElement) {

        if (src.pos.x + currentSVG.margin > x) {
            if (x < src.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin) {

                if (y <= src.pos.y && y > src.domBlockBorderElement.parentElement.getBoundingClientRect().y - currentSVG.margin) {
                    currentSVG.path += "H " + (src.pos.x + currentSVG.margin) + " ";
                    currentSVG.path += "V " + Math.min((src.domBlockBorderElement.parentElement.getBoundingClientRect().y + y) / 2, src.domBlockBorderElement.parentElement.getBoundingClientRect().y - currentSVG.margin) + " ";
                    currentSVG.path += "H " + (x + src.domBlockBorderElement.parentElement.getBoundingClientRect().x) / 2 + " ";
                    currentSVG.path += "V " + y + " ";
                    currentSVG.path += "H " + x + " ";
                    currentSVG.pathElem.setAttribute("stroke", "gray");
                }
                else if (y > src.pos.y && y < src.domBlockBorderElement.parentElement.getBoundingClientRect().y + src.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin) {
                    currentSVG.path += "H " + (src.pos.x + currentSVG.margin) + " ";
                    currentSVG.path += "V " + Math.max((src.domBlockBorderElement.parentElement.getBoundingClientRect().y + y) / 2, src.domBlockBorderElement.parentElement.getBoundingClientRect().y + src.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin) + " ";
                    currentSVG.path += "H " + (x + src.domBlockBorderElement.parentElement.getBoundingClientRect().x) / 2 + " ";
                    currentSVG.path += "V " + y + " ";
                    currentSVG.path += "H " + x + " ";
                    currentSVG.pathElem.setAttribute("stroke", "red");
                }
                else {
                    currentSVG.path += "H " + (src.pos.x + currentSVG.margin) + " ";
                    currentSVG.path += "V " + y + " ";
                    currentSVG.path += "H " + x + " ";
                    currentSVG.pathElem.setAttribute("stroke", "cyan");
                }
            } else {
                currentSVG.path += "H " + (src.pos.x + currentSVG.margin) + " ";
                currentSVG.path += "V " + y + " ";
                currentSVG.path += "H " + x + " ";
                currentSVG.pathElem.setAttribute("stroke", "yellow");
            }

        }
        else {
            if (y < src.domBlockBorderElement.parentElement.getBoundingClientRect().y
                || y > src.domBlockBorderElement.parentElement.getBoundingClientRect().y + src.domBlockBorderElement.parentElement.getBoundingClientRect().height) {
                currentSVG.path += "H " + x + " ";
                currentSVG.path += "V " + y + " ";
                currentSVG.pathElem.setAttribute("stroke", "black");

            } else {
                currentSVG.path += "H " + (x + src.pos.x) / 2 + " ";
                currentSVG.path += "V " + y + " ";
                currentSVG.path += "H " + x + " ";
                currentSVG.pathElem.setAttribute("stroke", "black");

            }

        }
        currentSVG.pathElem.setAttribute("d", currentSVG.path)

    }
    else {
        if (src.pos.x + currentSVG.margin > dst.pos.x) {
            if (dst.pos.x < src.pos.x) {

                if (dst.pos.y <= src.pos.y && y > src.domBlockBorderElement.parentElement.getBoundingClientRect().y - currentSVG.margin) {
                    currentSVG.path += "H " + (src.pos.x + currentSVG.margin) + " ";
                    currentSVG.path += "V " + Math.min((src.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.pos.y) / 2, src.domBlockBorderElement.parentElement.getBoundingClientRect().y - currentSVG.margin) + " ";
                    currentSVG.path += "H " + (x + src.domBlockBorderElement.parentElement.getBoundingClientRect().x) / 2 + " ";
                    currentSVG.path += "V " + dst.pos.y + " ";
                    currentSVG.path += "H " + dst.pos.x + " ";
                    currentSVG.pathElem.setAttribute("stroke", "gray");
                }
                else if (dst.pos.y > src.pos.y && y < src.domBlockBorderElement.parentElement.getBoundingClientRect().y + src.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin) {
                    currentSVG.path += "H " + (src.pos.x + currentSVG.margin) + " ";
                    currentSVG.path += "V " + Math.max((src.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.pos.y) / 2, src.domBlockBorderElement.parentElement.getBoundingClientRect().y + src.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin) + " ";
                    currentSVG.path += "H " + (dst.pos.x + src.domBlockBorderElement.parentElement.getBoundingClientRect().x) / 2 + " ";
                    currentSVG.path += "V " + dst.pos.y + " ";
                    currentSVG.path += "H " + dst.pos.x + " ";
                    currentSVG.pathElem.setAttribute("stroke", "red");
                }
                else {
                    currentSVG.path += "H " + (src.pos.x + currentSVG.margin) + " ";
                    currentSVG.path += "V " + dst.pos.y + " ";
                    currentSVG.path += "H " + dst.pos.x + " ";
                    currentSVG.pathElem.setAttribute("stroke", "cyan");
                }
            }
            else {
                currentSVG.path += "H " + Math.max(dst.pos.x + currentSVG.margin, src.pos.x + currentSVG.margin) + " ";
                currentSVG.path += "V " + dst.pos.y + " ";
                currentSVG.path += "H " + dst.pos.x + " ";
                currentSVG.pathElem.setAttribute("stroke", "yellow");
            }

        }
        else {

            // || dst.pos.y > src.domBlockBorderElement.parentElement.getBoundingClientRect().y + src.domBlockBorderElement.parentElement.getBoundingClientRect().height
            if (src.pos.y < dst.pos.y) {
                if (dst.domBlockBorderElement.parentElement.getBoundingClientRect().y - currentSVG.margin > src.pos.y) {
                    currentSVG.path += "H " + Math.max(dst.pos.x + currentSVG.margin, src.pos.x + currentSVG.margin) + " ";
                    currentSVG.path += "V " + dst.pos.y + " ";
                    currentSVG.path += "H " + dst.pos.x + " ";
                    currentSVG.pathElem.setAttribute("stroke", "black");

                }
                else {
                    currentSVG.path += "H " + Math.max(src.pos.x + currentSVG.margin, (src.pos.x + dst.domBlockBorderElement.parentElement.getBoundingClientRect().x) / 2) + " ";
                    currentSVG.path += "V " + (dst.domBlockBorderElement.parentElement.getBoundingClientRect().y - currentSVG.margin) + " ";
                    currentSVG.path += "H " + Math.max(dst.pos.x + currentSVG.margin, src.pos.x + currentSVG.margin) + " ";
                    currentSVG.path += "V " + dst.pos.y + " ";
                    currentSVG.path += "H " + dst.pos.x + " ";
                    currentSVG.pathElem.setAttribute("stroke", "pink");
                }

            } else {
                if (dst.domBlockBorderElement.parentElement.getBoundingClientRect().y
                    + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin < src.pos.y) {
                    currentSVG.path += "H " + Math.max(dst.pos.x + currentSVG.margin, src.pos.x + currentSVG.margin) + " ";
                    currentSVG.path += "V " + dst.pos.y + " ";
                    currentSVG.path += "H " + dst.pos.x + " ";
                    currentSVG.pathElem.setAttribute("stroke", "green");

                }
                else {
                    currentSVG.path += "H " + Math.max(src.pos.x + currentSVG.margin, (src.pos.x + dst.domBlockBorderElement.parentElement.getBoundingClientRect().x) / 2) + " ";
                    currentSVG.path += "V " + (dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin) + " ";
                    currentSVG.path += "H " + Math.max(dst.pos.x + currentSVG.margin, src.pos.x + currentSVG.margin) + " ";
                    currentSVG.path += "V " + dst.pos.y + " ";
                    currentSVG.path += "H " + dst.pos.x + " ";
                    currentSVG.pathElem.setAttribute("stroke", "yellow");
                }
            }

        }
        currentSVG.pathElem.setAttribute("d", currentSVG.path)

    }
}
// V
export function moveFromRightToBottom(x, y, currentSVG, reverse= false) {
    let src = currentSVG.source
    let dst = currentSVG.destination
    if (reverse) {
        dst = currentSVG.source
        src = currentSVG.destination
    }

    currentSVG.currentPos.x = x;
    currentSVG.currentPos.y = y;
    currentSVG.path += "";
    currentSVG.path = "M" + src.pos.x + "," + src.pos.y;
    if (!dst.domBlockBorderElement) {

        if (src.pos.x + currentSVG.margin > x) {
            if (x < src.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin) {

                if (y <= src.pos.y && y > src.domBlockBorderElement.parentElement.getBoundingClientRect().y - currentSVG.margin) {
                    currentSVG.path += "H " + (src.pos.x + currentSVG.margin) + " ";
                    currentSVG.path += "V " + Math.min((src.domBlockBorderElement.parentElement.getBoundingClientRect().y + y) / 2, src.domBlockBorderElement.parentElement.getBoundingClientRect().y - currentSVG.margin) + " ";
                    currentSVG.path += "H " + (x + src.domBlockBorderElement.parentElement.getBoundingClientRect().x) / 2 + " ";
                    currentSVG.path += "V " + y + " ";
                    currentSVG.path += "H " + x + " ";
                    currentSVG.pathElem.setAttribute("stroke", "gray");
                }
                else if (y > src.pos.y && y < src.domBlockBorderElement.parentElement.getBoundingClientRect().y + src.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin) {
                    currentSVG.path += "H " + (src.pos.x + currentSVG.margin) + " ";
                    currentSVG.path += "V " + Math.max((src.domBlockBorderElement.parentElement.getBoundingClientRect().y + y) / 2, src.domBlockBorderElement.parentElement.getBoundingClientRect().y + src.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin) + " ";
                    currentSVG.path += "H " + (x + src.domBlockBorderElement.parentElement.getBoundingClientRect().x) / 2 + " ";
                    currentSVG.path += "V " + y + " ";
                    currentSVG.path += "H " + x + " ";
                    currentSVG.pathElem.setAttribute("stroke", "red");
                }
                else {
                    currentSVG.path += "H " + (src.pos.x + currentSVG.margin) + " ";
                    currentSVG.path += "V " + y + " ";
                    currentSVG.path += "H " + x + " ";
                    currentSVG.pathElem.setAttribute("stroke", "brown");
                }
            } else {
                currentSVG.path += "H " + (src.pos.x + currentSVG.margin) + " ";
                currentSVG.path += "V " + y + " ";
                currentSVG.path += "H " + x + " ";
                currentSVG.pathElem.setAttribute("stroke", "blue");
            }

        }
        else {
            if (y < src.domBlockBorderElement.parentElement.getBoundingClientRect().y
                || y > src.domBlockBorderElement.parentElement.getBoundingClientRect().y + src.domBlockBorderElement.parentElement.getBoundingClientRect().height) {
                currentSVG.path += "H " + x + " ";
                currentSVG.path += "V " + y + " ";
                currentSVG.pathElem.setAttribute("stroke", "black");

            } else {
                currentSVG.path += "H " + (x + src.pos.x) / 2 + " ";
                currentSVG.path += "V " + y + " ";
                currentSVG.path += "H " + x + " ";
                currentSVG.pathElem.setAttribute("stroke", "black");

            }

        }
        currentSVG.pathElem.setAttribute("d", currentSVG.path)

    }
    else {
        if (src.pos.x + currentSVG.margin > dst.pos.x) {
            if (dst.pos.x < src.pos.x + currentSVG.margin) {

                if (dst.pos.y <= src.pos.y && y > src.domBlockBorderElement.parentElement.getBoundingClientRect().y - currentSVG.margin) {
                    currentSVG.path += "H " + (src.pos.x + currentSVG.margin) + " ";
                    currentSVG.path += "V " + Math.min((src.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.pos.y) / 2, src.domBlockBorderElement.parentElement.getBoundingClientRect().y - currentSVG.margin) + " ";
                    currentSVG.path += "H " + Math.min(src.domBlockBorderElement.parentElement.getBoundingClientRect().x + currentSVG.margin, (src.domBlockBorderElement.parentElement.getBoundingClientRect().x + dst.domBlockBorderElement.parentElement.getBoundingClientRect().x + dst.domBlockBorderElement.parentElement.getBoundingClientRect().width) / 2) + " ";
                    currentSVG.path += "V " + (dst.pos.y + currentSVG.margin) + " ";
                    currentSVG.path += "H " + dst.pos.x + " ";
                    currentSVG.path += "V " + dst.pos.y + " ";
                    currentSVG.pathElem.setAttribute("stroke", "gray");
                }
                else if (dst.pos.y > src.pos.y && dst.pos.y < src.domBlockBorderElement.parentElement.getBoundingClientRect().y + src.domBlockBorderElement.parentElement.getBoundingClientRect().height) {
                    currentSVG.path += "H " + (src.pos.x + currentSVG.margin) + " ";
                    currentSVG.path += "V " + Math.max((src.domBlockBorderElement.parentElement.getBoundingClientRect().y + src.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin), dst.pos.y + currentSVG.margin) + " ";
                    // currentSVG.path += "H " + (dst.pos.x + src.domBlockBorderElement.parentElement.getBoundingClientRect().x) / 2 + " ";
                    currentSVG.path += "H " + dst.pos.x + " ";
                    currentSVG.path += "V " + dst.pos.y + " ";
                    currentSVG.pathElem.setAttribute("stroke", "red");
                }
                else {
                    if (dst.pos.y < src.domBlockBorderElement.parentElement.getBoundingClientRect().y + currentSVG.margin) {
                        currentSVG.path += "H " + (src.pos.x + currentSVG.margin) + " ";
                        currentSVG.path += "V " + (dst.pos.y + src.domBlockBorderElement.parentElement.getBoundingClientRect().y) / 2 + " ";
                        currentSVG.path += "H " + dst.pos.x + " ";
                        currentSVG.path += "V " + (dst.pos.y) + " ";
                        currentSVG.pathElem.setAttribute("stroke", "cyan");
                    }
                    else {
                        currentSVG.path += "H " + Math.max(src.pos.x + currentSVG.margin, dst.domBlockBorderElement.parentElement.getBoundingClientRect().x + dst.domBlockBorderElement.parentElement.getBoundingClientRect().width + currentSVG.margin) + " ";
                        currentSVG.path += "V " + (dst.pos.y + currentSVG.margin) + " ";
                        currentSVG.path += "H " + dst.pos.x + " ";
                        currentSVG.path += "V " + (dst.pos.y) + " ";
                        currentSVG.pathElem.setAttribute("stroke", "brown");

                    }
                }
            }
            else {
                currentSVG.path += "H " + Math.max(dst.pos.x + currentSVG.margin, src.pos.x + currentSVG.margin) + " ";
                currentSVG.path += "V " + dst.pos.y + " ";
                currentSVG.path += "H " + dst.pos.x + " ";
                currentSVG.pathElem.setAttribute("stroke", "yellow");
            }

        }
        else {

            // || dst.pos.y > src.domBlockBorderElement.parentElement.getBoundingClientRect().y + src.domBlockBorderElement.parentElement.getBoundingClientRect().height
            if (src.pos.y < dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height / 2) {

                if (dst.domBlockBorderElement.parentElement.getBoundingClientRect().y - currentSVG.margin > src.pos.y) {
                    currentSVG.path += "H " + (dst.domBlockBorderElement.parentElement.getBoundingClientRect().x + dst.domBlockBorderElement.parentElement.getBoundingClientRect().width + currentSVG.margin) + " ";
                    currentSVG.path += "V " + (dst.pos.y + currentSVG.margin) + " ";
                    currentSVG.path += "H " + dst.pos.x + " ";
                    currentSVG.path += "V " + dst.pos.y + " ";

                    currentSVG.pathElem.setAttribute("stroke", "yellow");

                }
                else {
                    currentSVG.path += "H " + Math.max(src.pos.x + currentSVG.margin, (src.pos.x + dst.domBlockBorderElement.parentElement.getBoundingClientRect().x) / 2) + " ";
                    currentSVG.path += "V " + (dst.domBlockBorderElement.parentElement.getBoundingClientRect().y - currentSVG.margin) + " ";
                    currentSVG.path += "H " + (dst.domBlockBorderElement.parentElement.getBoundingClientRect().x + dst.domBlockBorderElement.parentElement.getBoundingClientRect().width + currentSVG.margin) + " ";
                    currentSVG.path += "V " + (dst.pos.y + currentSVG.margin) + " ";
                    currentSVG.path += "H " + dst.pos.x + " ";
                    currentSVG.path += "V " + dst.pos.y + " ";
                    currentSVG.pathElem.setAttribute("stroke", "black");
                }

            } else {
                if (dst.domBlockBorderElement.parentElement.getBoundingClientRect().y
                    + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin < src.pos.y) {
                    currentSVG.path += "H " + dst.pos.x + " ";
                    currentSVG.path += "V " + dst.pos.y + " ";
                    // currentSVG.path += "H " + dst.pos.x + " ";
                    currentSVG.pathElem.setAttribute("stroke", "orange");

                }
                else {
                    currentSVG.path += "H " + Math.max(src.pos.x + currentSVG.margin, (src.pos.x + dst.domBlockBorderElement.parentElement.getBoundingClientRect().x) / 2) + " ";
                    currentSVG.path += "V " + (dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin) + " ";
                    // currentSVG.path += "H " + Math.max(dst.pos.x + currentSVG.margin, src.pos.x + currentSVG.margin) + " ";
                    currentSVG.path += "H " + dst.pos.x + " ";
                    currentSVG.path += "V " + dst.pos.y + " ";
                    currentSVG.pathElem.setAttribute("stroke", "blue");
                }
            }

        }
        currentSVG.pathElem.setAttribute("d", currentSVG.path)

    }
}
// XXXXXX
export function moveFromRightToUp(x, y, currentSVG) {
    moveFromUpToLeftOrRight(x, y, currentSVG, true);
}

export function moveFromRightToLeft(x, y, currentSVG) {
    moveFromLeftToRight(x,y,currentSVG, true);
}

export function moveFromBottomToBottom(x, y, currentSVG) {
    let src = currentSVG.source
    let dst = currentSVG.destination
     currentSVG.currentPos.x = x;
    currentSVG.currentPos.y = y;
    currentSVG.path += "";
    currentSVG.path = "M" + src.pos.x + "," + src.pos.y;
    if (!dst.domBlockBorderElement) {

        if (src.pos.x > x) {
            if (x < src.pos.x) {

                if (y >= src.pos.y + 2 * currentSVG.margin) {
                    currentSVG.path += "V " + (src.pos.y + y) / 2 + " ";
                    currentSVG.path += "H " + x + " ";
                    currentSVG.path += "V " + y + " ";
                    currentSVG.pathElem.setAttribute("stroke", "gray");
                }
                else {
                    currentSVG.path += "V " + (src.pos.y + currentSVG.margin) + " ";
                    if (x < src.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin) {
                        if (y > src.domBlockBorderElement.parentElement.getBoundingClientRect().y) {
                            currentSVG.path += "H " + Math.max(x, (src.domBlockBorderElement.parentElement.getBoundingClientRect().x + x) / 2) + " ";
                            currentSVG.path += "V " + y + " ";
                            currentSVG.path += "H " + x + " ";
                            currentSVG.pathElem.setAttribute("stroke", "red");
                        }
                        else {
                            currentSVG.path += "H " + Math.min(x, (src.domBlockBorderElement.parentElement.getBoundingClientRect().x + x) / 2) + " ";
                            currentSVG.path += "V " + y + " ";
                            currentSVG.path += "H " + x + " ";
                            currentSVG.pathElem.setAttribute("stroke", "green");
                        }
                    } else {
                        currentSVG.path += "H " + Math.min(x, (src.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin)) + " ";
                        if (y < src.domBlockBorderElement.parentElement.getBoundingClientRect().y - currentSVG.margin) {
                            currentSVG.path += "V " + (y + src.domBlockBorderElement.parentElement.getBoundingClientRect().y) / 2 + " ";
                            currentSVG.path += "H " + x + " ";
                            currentSVG.path += "V " + y + " ";
                            currentSVG.pathElem.setAttribute("stroke", "blue");

                        }
                        else {
                            currentSVG.path += "V " + (y - currentSVG.margin) + " ";
                            currentSVG.path += "H " + x + " ";
                            currentSVG.path += "V " + y + " ";
                            currentSVG.pathElem.setAttribute("stroke", "blue");

                        }

                        // if (y < src.domBlockBorderElement.parentElement.getBoundingClientRect().y - currentSVG.margin) {
                        //     currentSVG.path += "V " + (y + src.domBlockBorderElement.parentElement.getBoundingClientRect().y) / 2 + " ";
                        //     currentSVG.path += "H " + x + " ";
                        //     currentSVG.path += "V " + y + " ";
                        //     currentSVG.pathElem.setAttribute("stroke", "cyan");
                        // }
                        // else {
                        //     currentSVG.path += "V " + (y - currentSVG.margin) + " ";
                        //     currentSVG.path += "H " + x + " ";
                        //     currentSVG.path += "V " + y + " ";
                        //     currentSVG.pathElem.setAttribute("stroke", "cyan");
                        // }
                    }
                }
            }

        }
        else {
            if (src.pos.x <= x) {
                if (y >= src.pos.y + 2 * currentSVG.margin) {
                    currentSVG.path += "V " + (src.pos.y + y) / 2 + " ";
                    currentSVG.path += "H " + x + " ";
                    currentSVG.path += "V " + y + " ";
                    currentSVG.pathElem.setAttribute("stroke", "gray");
                }
                else {
                    currentSVG.path += "V " + (src.pos.y + currentSVG.margin) + " ";
                    if (x < src.pos.x) {
                        if (y > src.domBlockBorderElement.parentElement.getBoundingClientRect().y) {
                            currentSVG.path += "H " + Math.max(x, (src.domBlockBorderElement.parentElement.getBoundingClientRect().x + x) / 2) + " ";
                            currentSVG.path += "V " + y + " ";
                            currentSVG.path += "H " + x + " ";
                            currentSVG.pathElem.setAttribute("stroke", "red");
                        }
                        else {
                            currentSVG.path += "H " + Math.min(x, (src.domBlockBorderElement.parentElement.getBoundingClientRect().x + x) / 2) + " ";
                            currentSVG.path += "V " + y + " ";
                            currentSVG.path += "H " + x + " ";
                            currentSVG.pathElem.setAttribute("stroke", "yellow");
                        }
                    }
                    else {
                        if (x > src.domBlockBorderElement.parentElement.getBoundingClientRect().x
                            + src.domBlockBorderElement.parentElement.getBoundingClientRect().width + 2 * currentSVG.margin) {

                            if (y > src.domBlockBorderElement.parentElement.getBoundingClientRect().y) {
                                currentSVG.path += "H " + Math.min(x, (x + src.domBlockBorderElement.parentElement.getBoundingClientRect().x + src.domBlockBorderElement.parentElement.getBoundingClientRect().width) / 2) + " ";
                                let dx = Math.max(x, src.domBlockBorderElement.parentElement.getBoundingClientRect().x + src.domBlockBorderElement.parentElement.getBoundingClientRect().width + currentSVG.margin);
                                currentSVG.path += "V " + y + " ";
                                currentSVG.path += "H " + x + " ";
                                currentSVG.pathElem.setAttribute("stroke", "red");
                            }
                            else {
                                currentSVG.path += "H " + x + " ";
                                currentSVG.path += "V " + y + " ";
                                currentSVG.pathElem.setAttribute("stroke", "red");
                            }
                        }
                        else {
                            currentSVG.path += "H " + Math.max(
                                src.domBlockBorderElement.parentElement.getBoundingClientRect().x
                                + src.domBlockBorderElement.parentElement.getBoundingClientRect().width
                                + currentSVG.margin, (x + src.domBlockBorderElement.parentElement.getBoundingClientRect().x
                                    + src.domBlockBorderElement.parentElement.getBoundingClientRect().width) / 2) + " ";
                            // currentSVG.path += "V " + (y + src.domBlockBorderElement.parentElement.getBoundingClientRect().y) / 2 + " ";
                            if (y < src.domBlockBorderElement.parentElement.getBoundingClientRect().y - currentSVG.margin) {
                                currentSVG.path += "V " + (y + src.domBlockBorderElement.parentElement.getBoundingClientRect().y) / 2 + " ";
                                currentSVG.path += "H " + x + " ";
                                currentSVG.path += "V " + y + " ";
                                currentSVG.pathElem.setAttribute("stroke", "cyan");
                            }
                            else {
                                currentSVG.path += "V " + (y - currentSVG.margin) + " ";
                                currentSVG.path += "H " + x + " ";
                                currentSVG.path += "V " + y + " ";
                                currentSVG.pathElem.setAttribute("stroke", "cyan");
                            }
                        }
                    }
                }
            }
        }

        currentSVG.pathElem.setAttribute("d", currentSVG.path)

    }
    else {
       
        if (src.pos.x < dst.pos.x) {

            let end = src.domBlockBorderElement.parentElement.getBoundingClientRect().x
                + src.domBlockBorderElement.parentElement.getBoundingClientRect().width + currentSVG.margin;
            if (end > dst.pos.x) {
                
                let mid = src.domBlockBorderElement.parentElement.getBoundingClientRect().y +
                    (src.domBlockBorderElement.parentElement.getBoundingClientRect().height) / 2;
                if (mid > dst.pos.y) {
                    currentSVG.path += "V " + Math.max(dst.pos.y + currentSVG.margin, src.pos.y + currentSVG.margin) + " ";
                    currentSVG.path += "H " + (end) + " ";
                    currentSVG.path += "V " + Math.max((dst.pos.y + src.domBlockBorderElement.parentElement.getBoundingClientRect().y)/2, dst.pos.y + currentSVG.margin) + " ";
                    currentSVG.path += "H " + dst.pos.x + " ";
                    currentSVG.path += "V " + dst.pos.y + " ";
                    currentSVG.pathElem.setAttribute("stroke", "orange");
                    
                }
                else if(src.pos.y  + 2*currentSVG.margin > dst.domBlockBorderElement.parentElement.getBoundingClientRect().y) {
                    if (dst.pos.y + currentSVG.margin < src.domBlockBorderElement.parentElement.getBoundingClientRect().y) {
                        currentSVG.path += "V " +
                            Math.max(src.pos.y + currentSVG.margin,
                            (src.pos.y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().y) / 2) + " ";
                        currentSVG.path += "H " + Math.min(dst.pos.x, src.domBlockBorderElement.parentElement.getBoundingClientRect().x + src.domBlockBorderElement.parentElement.getBoundingClientRect().width + currentSVG.margin) + " ";
                        currentSVG.path += "V " + (dst.pos.y + currentSVG.margin) + " ";
                        currentSVG.path += "H " + (dst.pos.x) + " ";
                        currentSVG.path += "V " + dst.pos.y + " ";
                        currentSVG.pathElem.setAttribute("stroke", "blue");
                        
                    }
                    else {
                        currentSVG.path += "V " + Math.max(dst.pos.y + currentSVG.margin, src.pos.y + currentSVG.margin) + " ";
                        currentSVG.path += "H " + dst.pos.x + " ";
                        currentSVG.path += "V " + dst.pos.y + " ";
                        currentSVG.pathElem.setAttribute("stroke", "cyan");
                    }
                }
                else {
                    currentSVG.path += "V " + Math.max(src.pos.y + currentSVG.margin,
                        (src.pos.y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().y )/2) + " ";
                    currentSVG.path += "H " + Math.min(src.pos.x , dst.domBlockBorderElement.parentElement.getBoundingClientRect().x- currentSVG.margin ) + " ";
                    currentSVG.path += "V " + (dst.pos.y + currentSVG.margin)+ " ";
                    currentSVG.path += "H " + (dst.pos.x) + " ";
                    currentSVG.path += "V " + dst.pos.y + " ";

                    currentSVG.pathElem.setAttribute("stroke", "red");
                        
                }

            }
            else {
                currentSVG.path += "V " + Math.max(dst.pos.y + currentSVG.margin, src.pos.y + currentSVG.margin) + " ";
                currentSVG.path += "H " + dst.pos.x + " ";
                currentSVG.path += "V " + dst.pos.y + " ";
                currentSVG.pathElem.setAttribute("stroke", "green");
            }
        } else {
            let end = src.domBlockBorderElement.parentElement.getBoundingClientRect().x- currentSVG.margin;
            if (end < dst.pos.x) {

                let mid = src.domBlockBorderElement.parentElement.getBoundingClientRect().y +
                    (src.domBlockBorderElement.parentElement.getBoundingClientRect().height) / 2;
                if (mid > dst.pos.y) {
                    currentSVG.path += "V " + Math.max(dst.pos.y + currentSVG.margin, src.pos.y + currentSVG.margin) + " ";
                    currentSVG.path += "H " + (end) + " ";
                    currentSVG.path += "V " + Math.max((dst.pos.y + src.domBlockBorderElement.parentElement.getBoundingClientRect().y) / 2, dst.pos.y + currentSVG.margin) + " ";
                    currentSVG.path += "H " + dst.pos.x + " ";
                    currentSVG.path += "V " + dst.pos.y + " ";
                    currentSVG.pathElem.setAttribute("stroke", "orange");

                }
                else if (src.pos.y + 2 * currentSVG.margin > dst.domBlockBorderElement.parentElement.getBoundingClientRect().y) {
                    if (dst.pos.y + currentSVG.margin < src.domBlockBorderElement.parentElement.getBoundingClientRect().y) {
                        currentSVG.path += "V " +
                            Math.max(src.pos.y + currentSVG.margin,
                                (src.pos.y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().y) / 2) + " ";
                        currentSVG.path += "H " + Math.min(dst.pos.x, src.domBlockBorderElement.parentElement.getBoundingClientRect().x + src.domBlockBorderElement.parentElement.getBoundingClientRect().width + currentSVG.margin) + " ";
                        currentSVG.path += "V " + (dst.pos.y + currentSVG.margin) + " ";
                        currentSVG.path += "H " + (dst.pos.x) + " ";
                        currentSVG.path += "V " + dst.pos.y + " ";
                        currentSVG.pathElem.setAttribute("stroke", "blue");

                    }
                    else {
                        currentSVG.path += "V " + Math.max(dst.pos.y + currentSVG.margin, src.pos.y + currentSVG.margin) + " ";
                        currentSVG.path += "H " + dst.pos.x + " ";
                        currentSVG.path += "V " + dst.pos.y + " ";
                        currentSVG.pathElem.setAttribute("stroke", "cyan");
                    }
                }
                else {
                    currentSVG.path += "V " + Math.max(src.pos.y + currentSVG.margin,
                        (src.pos.y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().y) / 2) + " ";
                    currentSVG.path += "H " + (dst.domBlockBorderElement.parentElement.getBoundingClientRect().x + dst.domBlockBorderElement.parentElement.getBoundingClientRect().width + currentSVG.margin) + " ";
                    currentSVG.path += "V " + (dst.pos.y + currentSVG.margin) + " ";
                    currentSVG.path += "H " + (dst.pos.x) + " ";
                    currentSVG.path += "V " + dst.pos.y + " ";

                    currentSVG.pathElem.setAttribute("stroke", "red");

                }

            }
            else {
                currentSVG.path += "V " + Math.max(dst.pos.y + currentSVG.margin, src.pos.y + currentSVG.margin) + " ";
                currentSVG.path += "H " + dst.pos.x + " ";
                currentSVG.path += "V " + dst.pos.y + " ";
                currentSVG.pathElem.setAttribute("stroke", "green");
            }
        }
        
        currentSVG.pathElem.setAttribute("d", currentSVG.path)

    }
}

export function moveFromBottomToLeft(x, y, currentSVG) {
    moveFromLeftToBottom(x, y, currentSVG, true);
}

export function moveFromBottomToUp(x, y, currentSVG){
    moveToFromUpToBottom(x, y, currentSVG, true);
}

export function moveFromBottomToRight(x,y,currentSVG) {
    moveFromRightToBottom(x,y,currentSVG, true);
}

export class SVGHelper {
    constructor() {
        let container = document.getElementById('canvas');

        this.container = container
        this.margin = 15;
        this.source = { domBlockBorderElement: null, dir: null, pos: { x: -1, y: -1 } }
        this.destination = { domBlockBorderElement: null, dir: null, pos: { x: -1, y: -1 } }
        this.currentMousePos = { x: -1, y: -1 }
        this.currentPos = { x: -1, y: -1 }
        let namespace = null
        namespace = null
        var svgpath = "http://www.w3.org/2000/svg";
        // let svg = document.createElementNS(svgpath, "svg")
        // svg.setAttribute("xmlns", xmlns)
        // svg.setAttribute("viewBox", "0 0 " + container.clientWidth+ " " + container.clientHeight)
        // svg.setAttribute("width", container.clientWidth)
        // svg.setAttribute("height", container.clientHeight)
        // this.svg = svg;
        let pathElem = document.createElementNS(svgpath, "path")
        pathElem.setAttribute('d', 'M100,100 L100,100');
        pathElem.setAttribute("fill", "none");
        pathElem.setAttribute("stroke", "rgb(0,0,0)");
        pathElem.setAttribute("stroke-width", "2");
        this.pathElem = pathElem;
        // svg.appendChild(this.pathElem);
        // let circleElem = document.createElementNS(svgpath, "circle")
        // circleElem.setAttribute('fill', 'black');
        // circleElem.setAttribute('r', '5');
        // circleElem.setAttribute('cx', -9999);
        // circleElem.setAttribute('cy', -9999);
        // this.circleElem = circleElem;
        // svg.appendChild(this.circleElem);
        // let arrowElem = document.createElementNS(svgpath, "path")
        // arrowElem.setAttribute('fill', 'black');
        // this.arrowPath = " l -8,4 l 8,-12 l 8,12z"
        // arrowElem.setAttribute('d', 'M 0,0 ' + this.arrowPath);
        // this.arrowElem = arrowElem;
        // svg.appendChild(this.arrowElem);
        // container.appendChild(this.svg);
        this.path = "";
    
    }

    getPathElement() {
        let str = this.path.replace(/\s/g, '');

        return this.pathElem;
    }

    setSource(sourceElement, dir) {
        this.source.domBlockBorderElement = sourceElement
        this.source.dir = dir
        this.source.pos.x = sourceElement.getBoundingClientRect().x + sourceElement.getBoundingClientRect().width / 2;
        this.source.pos.y = sourceElement.getBoundingClientRect().y + sourceElement.getBoundingClientRect().height / 2;
        this.path = "M " + this.source.pos.x + ", " + this.source.pos.y + " ";
        // this.circleElem.setAttribute('cx', this.source.pos.x);
        // this.circleElem.setAttribute('cy', this.source.pos.y);

        // currentSVG.pathElem.
    }



    // up to up
    moveTo(x, y, dir) {
        if (this.destination.domBlockBorderElement) {
            if (this.source.dir == "up") {

                if (this.destination.dir == "left") {
                    moveFromUpToLeft(x, y, this);
                }
                else 
                if (this.destination.dir == "left" || this.destination.dir == "right") {
                    moveFromUpToLeftOrRight(x, y, this);
                }
                else if (this.destination.dir == "down") {
                    moveToFromUpToBottom(x, y, this);
                }
                else if (this.destination.dir == "up") {
                    moveFromUpToUp(x, y, this);
                }
            }
            else if (this.source.dir == "left") {
                if (this.destination.dir == "left") {
                    moveFromLeftToLeft(x, y, this);
                }
                else if (this.destination.dir == "right") {
                    moveFromLeftToRight(x, y, this);
                }
                else if (this.destination.dir == "down") {
                    moveFromLeftToBottom(x, y, this);
                }
                else if (this.destination.dir == "up") {
                    moveFromLeftToUp(x, y, this);
                }
                // else if (this.destination.dir == "down") {
                //     moveToFromUpToBottom(x, y, dir);
                // }
                // else if (this.destination.dir == "up") {
                //     moveFromUpToUp(x, y, dir);
                // }
            }
            else if (this.source.dir == "right") {
                if (this.destination.dir == "right") {
                    moveFromRightToRight(x, y, this);
                }
                else if (this.destination.dir == "down") {
                    moveFromRightToBottom(x, y, this);
                }
                else if (this.destination.dir == "up") {
                    moveFromRightToUp(x, y, this);
                }
                else if (this.destination.dir == "left") {
                    moveFromRightToLeft(x, y, this);
                }
            }
            else if (this.source.dir == "down") {
                if (this.destination.dir == "down") {
                    moveFromBottomToBottom(x, y, this);
                }
                else if (this.destination.dir == "left") {
                    moveFromBottomToLeft(x,y,this);
                }
                else if (this.destination.dir == "right") {
                    moveFromBottomToRight(x, y, this);
                }

                else if (this.destination.dir == "up") {
                    moveFromBottomToUp(x, y, this);
                }
            }
        }
        else {
            if (this.source.dir == "up") {
                moveFromUpToUp(x, y, this);
            } else if (this.source.dir == "left") {
                moveFromLeftToLeft(x, y, this);
            }
            else if (this.source.dir == "right") {
                moveFromRightToRight(x, y, this);
            }
            if (this.source.dir == "down") {
                moveFromBottomToBottom(x, y, this);
            }
        }
    }
}

export function getElementByClassNameAndPos(x, y, className) {
    let borders = document.getElementsByClassName(className);
    for (let i = 0; i < borders.length; i++) {
        let e = borders[i]
        let _x = e.getBoundingClientRect().x
        let _y = e.getBoundingClientRect().y
        let _w = e.getBoundingClientRect().width
        let _h = e.getBoundingClientRect().height
        if (x >= _x && x <= _x + _w && y > _y && y < _y + _h) {
            return (e);
        }
    }
    return (null)
}


// export function moveFromUpToLeft(rectangle_1, rectangle_2, connection_path, reverse = false) {
//     let src = currentSVG.source
//     let dst = currentSVG.destination

//     if (reverse) {
//         dst = currentSVG.source
//         src = currentSVG.destination

//     }
//     currentSVG.currentPos.x = x;
//     currentSVG.currentPos.y = y;
//     if (dst.domBlockBorderElement) {
//         currentSVG.arrowElem.setAttribute('d', "M " + dst.pos.x + ", " + dst.pos.y + " " + currentSVG.arrowPath);
//     } else {
//         currentSVG.arrowElem.setAttribute('d', "M " + x + ", " + y + " " + currentSVG.arrowPath);
//     }

//     let mx = (x + src.pos.x) / 2
//     let my = (y + src.pos.y) / 2
//     let dx = (x - src.pos.x)
//     let dy = (y - src.pos.y)
//     currentSVG.path = "M" + src.pos.x + "," + src.pos.y;
//     if (x <= src.domBlockBorderElement.parentElement.getBoundingClientRect().x - 2 * currentSVG.margin) {

//         if (!dst.domBlockBorderElement) {
//             currentSVG.path += "V " + (src.pos.y - currentSVG.margin) + " ";
//             currentSVG.path += "H " + (src.domBlockBorderElement.parentElement.getBoundingClientRect().x + x) / 2 + " ";
//             currentSVG.path += "V " + y + " ";
//             currentSVG.path += "H " + x + " ";
//             currentSVG.pathElem.setAttribute("stroke", "gray");
//         }
//         else {
//             if (dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height / 2 >= src.pos.y) {
//                 //       ____________________o
//                 //      |    ________
//                 //      |-->|________|
//                 //      
//                 let l = (src.pos.y - currentSVG.margin)
//                 l = Math.min(l, dst.domBlockBorderElement.parentElement.getBoundingClientRect().y - currentSVG.margin)
//                 currentSVG.path += "V " + l + " ";
//                 currentSVG.path += "H " + (dst.pos.x - currentSVG.margin) + " ";
//                 currentSVG.path += "V " + dst.pos.y + " ";
//                 currentSVG.path += "H " + dst.pos.x + " ";
//                 currentSVG.pathElem.setAttribute("stroke", "yellow");
//             }


//             else {
//                 //  destination.X  <  source.X
//                 //dest.b + 2m > s.y
//                 if (dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height + 2 * currentSVG.margin > src.pos.y) {
//                     //  .->
//                     //  |       ____________
//                     //  |______|            |
//                     //
//                     let l1 = src.domBlockBorderElement.parentElement.getBoundingClientRect().x;
//                     let l2 = dst.domBlockBorderElement.parentElement.getBoundingClientRect().x + dst.domBlockBorderElement.parentElement.getBoundingClientRect().width;
//                     let l = (l1 + l2) / 2
//                     if (l > src.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin) {
//                         l = src.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin;
//                     }
//                     let l3 = dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height + currentSVG.margin;
//                     currentSVG.path += "V " + (src.pos.y - currentSVG.margin) + " ";
//                     currentSVG.path += "H " + l + " ";
//                     currentSVG.path += "V " + l3 + " ";
//                     currentSVG.path += "H " + (dst.pos.x - currentSVG.margin) + " ";
//                     currentSVG.path += "V " + dst.pos.y + " ";
//                     currentSVG.path += "H " + dst.pos.x + " ";

//                     currentSVG.pathElem.setAttribute("stroke", "red");
//                 }
//                 else if (dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height + 2 * currentSVG.margin <= src.pos.y) {
//                     let l1 = src.domBlockBorderElement.parentElement.getBoundingClientRect().y;
//                     let l2 = dst.domBlockBorderElement.parentElement.getBoundingClientRect().y + dst.domBlockBorderElement.parentElement.getBoundingClientRect().height;
//                     let l = (l1 + l2) / 2
//                     currentSVG.path += "V " + (l) + " ";
//                     currentSVG.path += "H " + (dst.pos.x - currentSVG.margin) + " ";
//                     currentSVG.path += "V " + dst.pos.y + " ";
//                     currentSVG.path += "H " + dst.pos.x + " ";

//                     currentSVG.pathElem.setAttribute("stroke", "cyan");
//                 }
//             }

//         }
//     }

//     // if x > source.right + margin
//     else if (x > src.domBlockBorderElement.parentElement.getBoundingClientRect().x
//         + src.domBlockBorderElement.parentElement.getBoundingClientRect().width + 2 * currentSVG.margin) {

//         if (!dst.domBlockBorderElement) {
//             //              |
//             //           ___|
//             //          |
//             //          |

//             currentSVG.path += "V " + (src.pos.y - currentSVG.margin) + " ";
//             currentSVG.path += "H " + (src.domBlockBorderElement.parentElement.getBoundingClientRect().x + src.domBlockBorderElement.parentElement.getBoundingClientRect().width + x) / 2 + " ";
//             currentSVG.path += "V " + y + " ";
//             currentSVG.path += "H " + x + " ";
//             currentSVG.pathElem.setAttribute("stroke", "violet");
//         }
//         else {
//             if (dst.pos.y < src.pos.y - currentSVG.margin) {
//                 //                 .---------------->
//                 //                 |
//                 //                 |
//                 //                 |
//                 currentSVG.path += "V " + (dst.pos.y) + " ";
//                 currentSVG.path += "H " + (dst.pos.x) + " ";
//                 currentSVG.pathElem.setAttribute("stroke", "brown");
//             } else {
//                 //              |
//                 //           ___|
//                 //          |
//                 //          |

//                 currentSVG.path += "V " + (src.pos.y - currentSVG.margin) + " ";
//                 currentSVG.path += "H " + (src.domBlockBorderElement.parentElement.getBoundingClientRect().x + src.domBlockBorderElement.parentElement.getBoundingClientRect().width + dst.pos.x) / 2 + " ";
//                 currentSVG.path += "V " + dst.pos.y + " ";
//                 currentSVG.path += "H " + dst.pos.x + " ";
//                 currentSVG.pathElem.setAttribute("stroke", "violet");
//             }
//         }
//     }

//     // if x < +margin [source] + margin
//     else {

//         if (y < src.pos.y) {
//             if (!dst.domBlockBorderElement) {
//                 currentSVG.pathElem.setAttribute("stroke", "red");// red
//                 currentSVG.path += "V " + (src.pos.y - 2 * currentSVG.margin) + " ";
//                 currentSVG.path += "H " + (x) + " ";
//                 currentSVG.path += "V " + y + " ";
//             }
//             else {
//                 if (dst.pos.x < src.pos.x + currentSVG.margin) {
//                     let ym = (dst.domBlockBorderElement.parentElement.getBoundingClientRect().y +
//                         dst.domBlockBorderElement.parentElement.getBoundingClientRect().height +
//                         src.domBlockBorderElement.parentElement.getBoundingClientRect().y) / 2;
//                     currentSVG.pathElem.setAttribute("stroke", "yellow");
//                     currentSVG.path += "V " + (ym) + " ";
//                     currentSVG.path += "H " + (dst.pos.x - currentSVG.margin) + " ";
//                     currentSVG.path += "V " + (dst.pos.y) + " ";
//                     currentSVG.path += "H " + (dst.pos.x) + " ";
//                 }
//                 else {
//                     currentSVG.pathElem.setAttribute("stroke", "black");
//                     currentSVG.path += "V " + (dst.pos.y) + " ";
//                     currentSVG.path += "H " + (dst.pos.x) + " ";
//                 }

//             }
//         }

//         // dest.y > source.b
//         else if (y > src.domBlockBorderElement.parentElement.getBoundingClientRect().y + src.domBlockBorderElement.parentElement.getBoundingClientRect().height) {
//             currentSVG.pathElem.setAttribute("stroke", "red");
//             currentSVG.path += "V " + (src.pos.y - currentSVG.margin) + " ";
//             if (x > src.domBlockBorderElement.parentElement.getBoundingClientRect().x + src.domBlockBorderElement.parentElement.getBoundingClientRect().width + 2 * currentSVG.margin) {
//                 currentSVG.path += "H " + (src.domBlockBorderElement.parentElement.getBoundingClientRect().x + src.domBlockBorderElement.parentElement.getBoundingClientRect().width + currentSVG.margin) + " ";
//             }
//             else {
//                 let l = src.domBlockBorderElement.parentElement.getBoundingClientRect().x - currentSVG.margin;
//                 l = Math.min(l, dst.pos.x - currentSVG.margin)

//                 currentSVG.path += "H " + l + " ";
//             }
//             currentSVG.path += "V " + dst.pos.y + " ";
//             currentSVG.path += "H " + dst.pos.x + " ";
//             currentSVG.pathElem.setAttribute("stroke", "red");
//         }
//         // currentSVG.path += "H " + x + " ";
//     }
//     currentSVG.pathElem.setAttribute("d", currentSVG.path)

// }

export function getSvgPathFromData(rectangle_1, rectangle_2, connection_path) {
    if (connection_path.start_rect_connection_side == "left") {
        if (connection_path.end_rect_connection_side == "up") {
            
        }
    }
}
