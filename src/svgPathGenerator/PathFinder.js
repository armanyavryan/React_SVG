export default function getPath(rectangle_1, rectangle_2, connection_path) {
    let source, dest;
    switch (connection_path.start_rect_connection_side) {
        case "up":
            source.pos.x = rectangle_1.x + rectangle_1.width / 2;
            source.pos.y = rectangle_1.y;
            source.dir = "up";
            source.rect = rectangle_1;
            break;
    }

    switch (connection_path.end_rect_connection_side) {
        case "up":
            dest.pos.x = rectangle_2.x + rectangle_2.width / 2;
            dest.pos.y = rectangle_2.y;
            dest.dir = "up";
            dest.rect = rectangle_2;
            break;
    }
    if (source.dir == "up" && dest.dir == "up") {
        return getUp2Up(source, dest);
    }
}

function getUp2Up(src, dst, margin = 10) {
    let paths = []
    paths.push({ x: src.pos.x, y: src.pos.y })


    if (src.pos.x < dst.rect.x - margin) {
        let y = Math.min(src.pos.y - margin, dst.pos.y - margin);
        paths.push({ x: src.pos.x, y: y })
        paths.push({ x: dst.pos.x, y: y })
        paths.push({ x: dst.pos.x, y: dst.pos.y })
    }
    else if (src.pos.x < dst.rect.x + dst.rect.width / 2) {
        if (src.pos.y > dst.pos.y) {
            let y = (src.pos.y + dst.rect.y + dst.rect.height) / 2
            paths.push({ x: src.pos.x, y: y })
            let x = (dst.rect.x - margin);
            paths.push({ x: x, y: y })
            y = (dst.pos.y - margin);
            paths.push({ x: x, y: y })
            x = (dst.pos.x);
            paths.push({ x: x, y: y })
            y = (dst.pos.y);
            paths.push({ x: x, y: y })
        } else {
            let x = src.pos.x, y = src.pos.y - margin;
            paths.push({ x: x, y: y });//v
            x = src.rect.x + src.rect.width + margin
            paths.push({ x: x, y: y });//h
            y = Math.min(dst.pos.y - margin, y)
            paths.push({ x: x, y: y });//v
            x = dst.pos.x;
            paths.push({ x: x, y: y });//h
            y = dst.pos.y;
            paths.push({ x: x, y: y });//v
        }
    }
    else if (src.pos.x < dst.rect.x + dst.rect.width + margin) {

        if (src.pos.y > dst.pos.y) {
            let x = src.pos.x, y = (src.pos.y + dst.rect.y + dst.rect.height) / 2;
            paths.push({ x: x, y: y });//v
            x = dst.rect.x + dst.rect.width + margin
            paths.push({ x: x, y: y });//h
            y = dst.pos.y - margin
            paths.push({ x: x, y: y });//v
            x = dst.pos.x;
            paths.push({ x: x, y: y });//h
            y = dst.pos.y;
            paths.push({ x: x, y: y });//v
        } else {
            let y = src.pos.y  - margin, x = src.pos.x;
            paths.push({ x: x, y: y });//v
            x = src.rect.x - margin;
            paths.push({ x: x, y: y });//h
            y = Math.min(dst.pos.y - margin, (dst.pos.y + src.rect.y + src.rect.height) / 2)
            paths.push({ x: x, y: y });//v
            x = dst.pos.x;
            paths.push({ x: x, y: y });//h
            y = dst.pos.y;
            paths.push({ x: x, y: y });//v
        }
    }
    else {
        let y = Math.min(dst.pos.y - margin, src.pos.y - margin), x = src.pos.x;

        paths.push({ x: x, y: y });//v
        x = dst.pos.x;
        paths.push({ x: x, y: y });//H
        y = dst.pos.y;
        paths.push({ x: x, y: y });//V
    }

    return paths;
}