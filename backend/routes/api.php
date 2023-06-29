<?php

use App\Http\Controllers\AdminAuthController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\GoalsController;
use App\Http\Controllers\ActionController;
use App\Http\Controllers\StageController;

Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::apiResource('/companies', CompanyController::class);

    Route::apiResource('/goals', GoalsController::class);
    Route::get('/company/{id}/goals', [GoalsController::class, 'showCompanyGoals']);

    Route::apiResource('/actions', ActionController::class);
    Route::get('/goal/{id}/actions', [ActionController::class, 'showGoalActions']);

    Route::apiResource('/stages', StageController::class);
    Route::get('/action/{id}/stages', [StageController::class, 'showActionStages']);

    Route::get('/count', [CompanyController::class, 'statusCount']);

});

Route::post('/admin/login', [AdminAuthController::class, 'login']);


