export class Shader {
    private _gl: WebGLRenderingContext;
    private _vertexShader: WebGLShader;
    private _fragmentShader: WebGLShader;
    private _program: WebGLProgram;

    public get program(): WebGLProgram {
        return this._program;
    }

    constructor(gl: WebGLRenderingContext, vertexShaderSource: string, fragmentShaderSource: string) {
        this._gl = gl;
        this._vertexShader = this.loadShader(vertexShaderSource, gl.VERTEX_SHADER);
        this._fragmentShader = this.loadShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
        this._program = this.createProgram();
    }

    private loadShader(source: string, type: number): WebGLShader {
        const gl = this._gl;
        const shader = gl.createShader(type);
        if (!shader) { throw new Error("创建Shader失败"); }
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        const log = gl.getShaderInfoLog(shader);
        if (!success) { throw new Error( log ? log : "" ); }
        return shader;
    }

    private createProgram(): WebGLProgram {
        const gl = this._gl;
        const program = gl.createProgram();
        if (!program) { throw new Error("创建着色器程序失败"); }
        gl.attachShader(program, this._vertexShader);
        gl.attachShader(program, this._fragmentShader);

        gl.linkProgram(program);

        const success = gl.getProgramParameter(program, gl.LINK_STATUS);
        const log = gl.getProgramInfoLog(program);
        if (!success) { throw new Error( log ? log : "" ); }

        return program;
    }
}