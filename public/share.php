<?php

declare(strict_types=1);

header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

$shell = is_file(__DIR__ . '/index.html')
    ? file_get_contents(__DIR__ . '/index.html')
    : '<!doctype html><html lang="id"><head><meta charset="utf-8"><title>Undangan</title></head><body><p>Jalankan build frontend terlebih dahulu.</p></body></html>';

try {
    $path = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH);
    if (
        !preg_match('~/u/([a-z0-9]+(?:-[a-z0-9]+)*)/?$~D', $path, $matches) ||
        strlen($matches[1]) > 80
    ) {
        http_response_code(404);
        header('X-Robots-Tag: noindex, nofollow');
        echo $shell;
        exit();
    }
    $backend =
        getenv('UNDANGAN_BACKEND_PATH') ?: dirname(__DIR__, 2) . '/undangan-back';
    $config = require rtrim($backend, '/\\') . '/bootstrap.php';
    $db = new App\Core\Database($config['database']);
    $sharing = new App\Controllers\ShareController(
        new App\Models\ShareModel($db),
        $config,
    );
    $metadata = $sharing->metadata($matches[1]);
    echo App\Services\ShareDocument::inject($shell, $metadata['head']);
} catch (Throwable $error) {
    $status = $error instanceof App\Core\HttpException ? $error->status : 503;
    http_response_code($status);
    header('X-Robots-Tag: noindex, nofollow');
    if ($status >= 500) {
        error_log((string) $error);
    }
    echo $shell;
}
