<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    */

    // 1. Tambahkan path yang diakses oleh Inertia/Axios (misal: 'login', 'home', dll)
    // Gunakan ['*'] jika ingin mengizinkan semua route (paling aman untuk debug)
    'paths' => ['api/*', 'sanctum/csrf-cookie', '*'], 

    'allowed_methods' => ['*'],

    // 2. Tentukan domain secara spesifik. 
    // Menggunakan '*' seringkali error jika supports_credentials bernilai true.
    'allowed_origins' => [
        'https://unida.education',
        'https://siadlab.unida.education',
        'http://localhost:8000', // Tetap masukkan untuk development lokal
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // 3. Ubah ke TRUE jika kamu menggunakan login, session, atau CSRF cookie
    // Ini sangat krusial untuk aplikasi Laravel + Inertia
    'supports_credentials' => true,

];