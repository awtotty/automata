function main() 
{
    /* 
        INITIALIZATION  
    */
    var canvas = document.querySelector("#c"); 
    var gl = canvas.getContext("webgl"); 
    var programInfo = webglUtils.createProgramInfo(gl, ["vs", "fs"]); 

    /* 
        RENDERING 
    */
    webglUtils.resizeCanvasToDisplaySize(canvas); 
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);    

    gl.clearColor(0, 0, 0, 0); 
    gl.clear(gl.COLOR_BUFFER_BIT); 

    var arrays = {
        position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0],   }, 
        texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                   },
    }; 

    var bufferInfo = webglUtils.createBufferInfoFromArrays(gl, arrays); 
    gl.useProgram(programInfo.program); 
    webglUtils.setBuffersAndAttributes(programInfo.attribSetters, bufferInfo.buffers);
    
    webglUtils.drawBufferInfo(gl, bufferInfo, gl.TRIANGLES, 0, 3); 
}

main(); 