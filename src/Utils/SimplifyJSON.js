function simplifyDataFlow(dataFlow) {
    const nodes = {};

    dataFlow.connected_node.forEach((connection) => {
        const sourceId = connection.source.id;
        const targetId = connection.target.id;

        if (!nodes[sourceId]) {
            nodes[sourceId] = { id: sourceId, children: [] };
        }

        if (!nodes[targetId]) {
            nodes[targetId] = { id: targetId, children: [] };
        }

        nodes[sourceId].children.push(nodes[targetId]);
    });

    let rootNode = null;
    Object.values(nodes).forEach((node) => {
        if (node.parents === undefined) {
            rootNode = node;
        }
    });

    return rootNode;
}

export default simplifyDataFlow;