import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

for (const file of ["public/privacy.html", "public/terms.html"]) {
  test(`${file} remains owner-reviewed, staging-only and non-indexable before public release`, () => {
    const html = fs.readFileSync(file, "utf8");
    assert.match(html, /Owner-reviewed staging/i);
    assert.match(html, /professional legal review/i);
    assert.match(html, /name="robots" content="noindex,nofollow"/i);
    assert.ok(!/name="robots" content="index,follow"/i.test(html));
    assert.ok(!/counsel[- ]approved|lawyer[- ]approved|professionally approved/i.test(html));
  });
}
