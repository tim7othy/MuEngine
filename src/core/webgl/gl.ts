export class GLUtilities {
    public static initializeWebglContext( canvas: HTMLCanvasElement): WebGLRenderingContext {
        const glOrNull = canvas.getContext("webgl");
        let gl: WebGLRenderingContext;
        if (glOrNull === null || glOrNull === undefined) {
            throw new Error("浏览器不支持webgl渲染");
        } else {
            gl = glOrNull as WebGLRenderingContext;
        }
        return gl;
    }
}