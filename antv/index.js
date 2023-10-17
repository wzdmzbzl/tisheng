const graph = new G6.Graph({
  container: "container",
  width: 1000,
  height: 600,
  fitView: true,
  fitViewPadding: [20, 40, 50, 20],
});

const main = async () => {
  const response = await fetch(
    "https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json"
  );
  const remoteData = await response.json();
  graph.data(remoteData);
  graph.render();
};
main();
