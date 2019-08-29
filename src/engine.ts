import {GLUtilities} from "./core/webgl/gl";
import {Shader} from "./core/webgl/shader";

interface IAttributeLocations {
    [attribute: string]: number;
}

export class Engine {
    private _canvas: HTMLCanvasElement;
    private _gl: WebGLRenderingContext;
    private _shaderProgram: WebGLProgram;
    private _buffer: WebGLBuffer;
    private _attribLocations: IAttributeLocations;

    constructor(elementId?: string) {
        this._canvas = this.initializeCanvas(elementId);
        // 初始化 gl 全局变量为 webgl 渲染上下文环境
        this._gl = GLUtilities.initializeWebglContext(this._canvas);
        this._shaderProgram = this.loadShaders();
        this._attribLocations = {
            positionLocation: this._gl.getAttribLocation(this._shaderProgram, "a_position"),
        };
        this._buffer = this.createBuffer();
    }

    public start(): void {
        this._gl.clearColor(255, 255, 255, 1);
        this._gl.viewport(0, 0, this._canvas.width, this._canvas.height);
        this.loop();
    }

    private initializeCanvas(elementId?: string): HTMLCanvasElement {
        let canvas: HTMLCanvasElement;
        if (elementId !== undefined) {
            canvas = document.querySelector("#" + elementId) as HTMLCanvasElement;
        } else {
            canvas = document.createElement("canvas");
            document.appendChild(canvas);
        }
        return canvas;
    }

    private loadShaders(): WebGLProgram {
        const vertexShaderSource = `
            attribute vec3 a_position;
            void main() {
                gl_Position = vec4(a_position, 1.0);
            }
        `;
        const fragmentShaderSource = `
            precision mediump float;
            void main() {
                gl_FragColor = vec4(1.0, 0, 0.5, 1.0);
            }
        `;
        const shader = new Shader(this._gl, vertexShaderSource, fragmentShaderSource);
        return shader.program;
    }

    private createBuffer(): WebGLBuffer {
        const gl = this._gl;
        const buffer = gl.createBuffer();
        if (!buffer) { throw new Error("创建缓冲区失败"); }
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            0, 0, 0,
            0, 0.5, 0,
            0.5, 0.5, 0,
        ]), gl.STATIC_DRAW);


        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        return buffer;
    }

    private loop(): void {
        const gl = this._gl;
        gl.clear(gl.COLOR_BUFFER_BIT);


        gl.useProgram(this._shaderProgram);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);

        const pLoc = this._attribLocations.positionLocation;
        gl.enableVertexAttribArray(pLoc);
        const size = 3; // 一次读取多少单位顶点数据
        const normalized = false;
        const stride = 0; // 每次迭代与下一次迭代之间跳过多少单位数据
        const offset = 0;
        gl.vertexAttribPointer(pLoc, size, gl.FLOAT, normalized, stride, offset);

        gl.drawArrays(gl.TRIANGLES, 0, 3);

        requestAnimationFrame(this.loop.bind(this));
    }

}