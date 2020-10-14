declare class Themepark {
    subscribers: Map<String, Function>;
    params: object;
    definitions: Function;
    vars: object;
    css: string;
    constructor(params: object, definitions: (params: object) => string);
    update(updated_params?: {}): void;
    subscribe(fn: ({vars, css, params}:{vars:object,css:string,params:object}) => void, instant?: boolean): string;
    unsubscribe(id: string): void;
    style(target: string | HTMLElement): void;
}
export default Themepark;
