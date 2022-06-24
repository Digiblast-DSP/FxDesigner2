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

export function getAllFunctions() {
    return [SIN];
}