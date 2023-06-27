<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CompanyController;

Route::apiResource('/companies', CompanyController::class);

// Route::get('/companies', [CompanyController::class, 'index']);
// Route::post('/companies', [CompanyController::class, 'store']);
// Route::get('/companies/{id}', [CompanyController::class, 'show']);
// Route::put('/companies/{id}', [CompanyController::class, 'update']);
// Route::delete('/companies/{id}', [CompanyController::class, 'destroy']);
