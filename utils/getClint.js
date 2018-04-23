module.exports = agent => {
  const Agents = `
  Android,
  iPhone,
  Chrome,
  Safari,
  iPad,
  iPod,
  Opera,
  Firefox,
  MSIE
  `.split(",");
  for (const iterator of Agents) {
    if (agent.includes(iterator)) return iterator;
  }
};
