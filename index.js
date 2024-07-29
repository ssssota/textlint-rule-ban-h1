function reporter(context) {
  const { Syntax, report, RuleError } = context;
  return {
    [Syntax.Header](node) {
      if (node.depth !== 1) return;
      report(node, new RuleError("Use h2(`##`) instead of h1(`#`)"));
    },
  };
}
module.exports = { linter: reporter };
