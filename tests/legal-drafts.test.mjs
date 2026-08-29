import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

for (const file of ["public/privacy.html", "public/terms.html"]) {
  test(`${file} remains clearly draft and non-indexable until legal review`, () => {
    const html = fs.readFileSync(file, "utf8");
    assert.match(html, /Draft for launch review/i);
    assert.match(html, /name="robots" content="noindex,nofollow"/i);
    assert.ok(!/name="robots" content="index,follow"/i.test(html));
  });
}
