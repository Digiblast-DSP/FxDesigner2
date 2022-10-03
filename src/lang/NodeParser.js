import { PREFIXES } from "./Cats";
import FuncData from "./FuncData";

class GraphNode {
    constructor(id, parents, func) {
        this.parents = parents;
        this.func = func;
        this.id = id;
    }
}

class Graph {
    constructor() {
        this.head = new GraphNode(-1, undefined, undefined);
        this.code = "";
    }

    generateCode(node) {
        this.code = "import(\"stdfaust.lib\");\nprocess = ";
        console.log("traversing", node.id);
        this.#multiPreorder(node);
        this.code += ";"
        alert(this.code);
    }

    #multiPreorder(node) {
        if (node === undefined) {
            return;
        }
        console.log(node.id, node.func.name);

        let includeClosingBrace = true;

        if (node.func.name !== undefined) {
            const prefix = PREFIXES[node.func.category];
            this.code += prefix + node.func.name + "(";
        } else {
            if (node.id === "IN") {
                this.code += "_";
            } else if (node.id !== "OUT"){
                this.code += node.func;
            }
            includeClosingBrace = false;
        }

        if (node.parents.length === undefined) {
            this.#multiPreorder(undefined);
        }
        let inputNodeCount = node.func.paramNames !== undefined ? node.func.paramNames.length : 1;

        for (let i = 0; i < inputNodeCount; i++) {
            this.#multiPreorder(node.parents[i]);
            if (i < inputNodeCount - 1) {
                this.code += ",";
            }
        }
        if (includeClosingBrace) {
            this.code += ")";
        }
    }
}

export class NodeParser {
    constructor() {
        this.graph = new Graph();
    }

    build(nodes, edges, constValues) {
        console.table(nodes);
        console.table(edges);

        let nodeDist = {};

        for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];
            let data = n.data;
            if (n.type === "constantNode") {
                data = constValues[n.id];
            }
            nodeDist[n.id] = new GraphNode(n.id, {}, data);
        }
        

        this.graph.head = nodeDist['IN'];

        for (let i = 0; i < edges.length; i++) {
            const e = edges[i];
            let targetParam = '0';
            if (e.targetHandle) {
                const parsedEdgedName = e.targetHandle.split('-');
                targetParam = parsedEdgedName[parsedEdgedName.length-1];
            }
            

            nodeDist[e.target].parents[targetParam] = nodeDist[e.source];
            
            /* const source = nodeDist[e.source];
            if (!e.targetHandle && e.target === 'OUT') {
                nodeDist[e.source].children[0] = nodeDist['OUT'];
                continue;
            }
            const parsedEdgedName = e.targetHandle.split('-');
            const targetParam = parsedEdgedName[parsedEdgedName.length-1];
            nodeDist[e.source].children[targetParam] = nodeDist[e.target]; */
        }
        console.log('NODEDIST');
        console.table(nodeDist);
        console.log(this.graph.head);

        this.graph.generateCode(nodeDist['OUT']);
    }
}