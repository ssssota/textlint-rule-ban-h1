function reporter(context) {
  const { Syntax, report, fixer, RuleError } = context;
  return {
    [Syntax.Header](node) {
      if (node.depth !== 1) return;
      const hashH1 = node.raw.match(/^#\s/)
      const equalH1 = node.raw.match(/\n\s*(=+)\s*$/)
      if (hashH1) {
        // fixable
        const fix = fixer.insertTextBefore(node, '#');
        report(node, new RuleError("Use h2(`##`) instead of h1(`#`)", { fix }));
        return;
      }
      if (equalH1){
        // fixable
        const fix = fixer.replaceText(node, node.raw.replace(/=+\s*$/, (matched) => matched.replace(/=/g, '-')));
        report(node, new RuleError("Use h2 instead of h1", { fix }));
        return;
      }
      report(node, new RuleError("Use h2 instead of h1"));
    },
  };
}
module.exports = { linter: reporter, fixer: reporter };
