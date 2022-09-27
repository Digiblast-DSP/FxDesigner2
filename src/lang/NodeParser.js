import FuncData from "./FuncData";

class ASTNode {
    constructor(parent, func) {
        this.children = parent;
        this.func = func;
    }
}

class AST {
    constructor() {
        this.head = new ASTNode(undefined, undefined);
    }
}

export class NodeParser {
    constructor() {
        this.ast = new AST();
    }

    build(nodes, edges) {
        console.table(nodes);
        console.table(edges);

        let nodeDist = {};

        for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];
            nodeDist[n.id] = new ASTNode(undefined, n.data);
        }
        console.table(nodeDist);

        this.ast.head = nodeDist['IN'];
    }
}