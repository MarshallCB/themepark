declare class Themepark {
    subscribers: Map<String, Function>;
    params: object;
    definitions: Function;
    vars: object;
    css: string;
    constructor(params: object, definitions: (params: object) => string);
    update(updated_params?: {}): void;
    sub(fn: (vars: object) => void, instant?: boolean): string;
    unsub(id: string): void;
    style(query: string): void;
}
export default Themepark;
