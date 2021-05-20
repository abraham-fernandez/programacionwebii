import React,{useRef,useEffect} from "react";
const canvas=(props)=>{

    const ref = useRef()
    useEffect(() => {
        const room = ref.current;

        if(props.board.length>0){
            //canvas

            let ctx = room.getContext("2d");
            room.width = 500;//the width of the canvas
            room.height = 500;//the height of the canvas

              let size = 25;//the size of every cell
              let rows = 16;//number of rows
              let cols = 10;//number of columns

              // initiate the cells array
              let cells = new Array(cols * rows);


              // fill the cells array with values
              for (let y = 0; y < 16; y++) {
                  for ( let x = 0; x < 10; x++) {
                      let index = x + y * cols;
                      let cell = {}
                      cell.x = x * size;
                      cell.y = y * size;
                      cell.value = props.board[y][x];
                      cells[index] = cell;
                  }
              }
              //draw every cell in the grid of cells
              cells.forEach((c, i) => {

                  if (c.value === "1") {
                      ctx.fillStyle = "#FF0000";
                  } else {
                      ctx.fillStyle = "white";

                  }
                  ctx.fillRect(c.x, c.y, size, size);
                  ctx.beginPath();
                  ctx.strokeRect(c.x, c.y, size, size);
              })

        }



    }, [props]);


     return <canvas id={"canvas"} height={500} width={500} ref={ref} ></canvas>
}

export default canvas;