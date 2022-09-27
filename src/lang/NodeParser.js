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
        this.visited = {};
    }

    traverse(node) {
        //this.visited = {};
        console.log("traversing", node.id);
        this.#multiPreorder(node);
    }

    #multiPreorder(node) {
        if (node === undefined) {
            return;
        }
        console.log(node.id);

        if (node.parents.length === undefined) {
            this.#multiPreorder(undefined);
        }
        let inputNodeCount = node.func.paramNames !== undefined ? node.func.paramNames.length : 1;

        for (let i = 0; i < inputNodeCount; i++) {
            this.#multiPreorder(node.parents[i]);
        }
    }
}

export class NodeParser {
    constructor() {
        this.graph = new Graph();
    }

    build(nodes, edges) {
        console.table(nodes);
        console.table(edges);

        let nodeDist = {};

        for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];
            nodeDist[n.id] = new GraphNode(n.id, {}, n.data);
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

        this.graph.traverse(nodeDist['OUT']);
    }
}