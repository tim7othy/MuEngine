/**
 * 全局变量gl，表示webgl渲染上下文环境
 * 在调用Utilities.initializeWebglContext之后被初始化
 * 之后就可以被导入其他模块进行使用
 */
export let gl: WebGLRenderingContext;

export class GLUtilities {
    public static initializeWebglContext( canvas: HTMLCanvasElement): void {
        const glOrNull = canvas.getContext("webgl");
        if (glOrNull === null || glOrNull === undefined) {
            throw new Error("浏览器不支持webgl渲染");
        } else {
            gl = glOrNull as WebGLRenderingContext;
        }
    }
}