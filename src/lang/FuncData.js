export const Category = {
    Math: 'Math'
};

export default class FuncData {
    /**
     * 
     * @param {String} name 
     * @param {Array<String>} paramNames 
     * @param {String} cat 
     */
    name='a';
    constructor(name, paramNames, cat) {
        this.name = name;
        this.paramNames = paramNames;
        this.category = cat;
    }

    get numParams() {
        return this.paramNames.length;
    }

}

export const SIN = new FuncData('sin', ['x'], Category.Math);
export const COS = new FuncData('cos', ['x'], Category.Math);
export const TAN = new FuncData('tan', ['x'], Category.Math);

export const SUM = new FuncData('sum +', ['x', 'y'], Category.Math);
export const MULT = new FuncData('mult ×', ['x', 'y'], Category.Math);
export const SUB = new FuncData('sub -', ['x', 'y'], Category.Math);
export const DIV = new FuncData('div ÷', ['x', 'y'], Category.Math);

export const MIN = new FuncData('min', ['x', 'y'], Category.Math);
export const MAX = new FuncData('max', ['x', 'y'], Category.Math);

export function getAllFunctions() {
    return [SIN, COS, TAN, SUM, MULT, SUB, DIV, MIN, MAX, MAX, MAX, MAX, MAX, MAX, MAX, MAX, MAX, MAX, MAX, SUM];
}