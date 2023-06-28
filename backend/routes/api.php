<?php

use App\Http\Controllers\AdminAuthController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CompanyController;

Route::group(['middleware' => ['auth:sanctum']], function () {
    // Route::apiResource('/companies', CompanyController::class);

    Route::get('/companies', [CompanyController::class, 'index']);
    Route::post('/companies', [CompanyController::class, 'store']);
    Route::get('/companies/{id}', [CompanyController::class, 'show']);
    Route::put('/companies/{id}', [CompanyController::class, 'update']);
    Route::delete('/companies/{id}', [CompanyController::class, 'destroy']);
});

Route::post('/admin/login', [AdminAuthController::class, 'login']);


