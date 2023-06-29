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
    Route::get('/companies/goals/{id}', [GoalsController::class, 'showCompanyGoals']);

    Route::apiResource('/actions', ActionController::class);
    Route::get('/goals/actions/{id}', [ActionController::class, 'showGoalActions']);

    Route::apiResource('/stages', StageController::class);
    Route::get('/actions/stages/{id}', [ActionController::class, 'showGoalActions']);

});

Route::post('/admin/login', [AdminAuthController::class, 'login']);


