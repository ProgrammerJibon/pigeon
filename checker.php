<?php
$base = "src";
$additionalFiles = [
    "package.json",
    "index.js",
    "app.json",
];

$out = "checker.output.txt";
file_put_contents($out, "");

$it = new AppendIterator();
$it->append(new RecursiveIteratorIterator(new RecursiveDirectoryIterator($base)));
$it->append(new ArrayIterator($additionalFiles));

foreach ($it as $f) {
    if (is_string($f)) {
        $p = str_replace("\\", "/", $f);
        if (!file_exists($p)) continue;
        $t = file_get_contents($p);
        file_put_contents($out, $p . ":\n```\n" . $t . "\n```\n\n", FILE_APPEND);
        continue;
    }

    if ($f instanceof SplFileInfo && $f->isFile()) {
        $p = str_replace("\\", "/", $f->getPathname());
        $t = file_get_contents($p);
        file_put_contents($out, $p . ":\n```\n" . $t . "\n```\n\n", FILE_APPEND);
    }
}
