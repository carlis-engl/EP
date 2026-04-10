const container = document.getElementById("graph-container");
const sidebarTitle = document.getElementById("node-title");
const sidebarInfo = document.getElementById("node-info");

fetch("data/graph.json")
  .then(response => response.json())
  .then(data => {
    const graph = new graphology.Graph();

    // Add nodes
    data.nodes.forEach(node => {
      graph.addNode(node.key, node.attributes);
    });

    // Add edges
    data.edges.forEach(edge => {
      graph.addEdge(edge.source, edge.target, edge.attributes);
    });

    // Create Sigma renderer
    const renderer = new sigma.Sigma(graph, container);

    // Node click → update sidebar
    renderer.on("clickNode", ({ node }) => {
      const attrs = graph.getNodeAttributes(node);

      sidebarTitle.textContent = attrs.label || node;

      sidebarInfo.innerHTML = `
        <p><strong>Type:</strong> ${attrs.type || ""}</p>
        <p><strong>Country:</strong> ${attrs.country || ""}</p>
      `;
    });
  });
