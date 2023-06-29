<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\CompanyAuthController;

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\GoalsController;
use App\Http\Controllers\ActionController;
use App\Http\Controllers\ResponsibleController;
use App\Http\Controllers\StageController;

Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::prefix('/companies')->group(function () {

        Route::get('/', [CompanyController::class, 'index'])
            ->middleware(['auth:sanctum', 'ability:admin,company']);

        Route::post('/', [CompanyController::class, 'store'])
            ->middleware(['auth:sanctum', 'ability:admin']);

        Route::get('/{id}', [CompanyController::class, 'show'])
            ->middleware(['auth:sanctum', 'ability:admin,company']);

        Route::patch('/{id}', [CompanyController::class, 'update'])
            ->middleware(['auth:sanctum', 'ability:admin']);

        Route::delete('/{id}', [CompanyController::class, 'destroy'])
            ->middleware(['auth:sanctum', 'ability:admin']);

        Route::get('/{id}/goals', [GoalsController::class, 'showCompanyGoals'])
            ->middleware(['auth:sanctum', 'ability:admin,company']);

    });

    Route::prefix('/goals')->group(function () {

        Route::get('/', [GoalsController::class, 'index'])
            ->middleware(['auth:sanctum', 'ability:admin,company']);

        Route::post('/', [GoalsController::class, 'store'])
            ->middleware(['auth:sanctum', 'ability:admin']);

        Route::get('/{id}', [GoalsController::class, 'show'])
            ->middleware(['auth:sanctum', 'ability:admin,company']);

        Route::patch('/{id}', [GoalsController::class, 'update'])
            ->middleware(['auth:sanctum', 'ability:admin']);

        Route::delete('/{id}', [GoalsController::class, 'destroy'])
            ->middleware(['auth:sanctum', 'ability:admin']);

        Route::get('/{id}/actions', [ActionController::class, 'showGoalActions'])
            ->middleware(['auth:sanctum', 'ability:admin,company']);
    });

    Route::prefix('/actions')->group(function () {

        Route::get('/', [ActionController::class, 'index'])
            ->middleware(['auth:sanctum', 'ability:admin,company']);

        Route::post('/', [ActionController::class, 'store'])
            ->middleware(['auth:sanctum', 'ability:admin']);

        Route::get('/{id}', [ActionController::class, 'show'])
            ->middleware(['auth:sanctum', 'ability:admin,company']);

        Route::patch('/{id}', [ActionController::class, 'update'])
            ->middleware(['auth:sanctum', 'ability:admin']);

        Route::delete('/{id}', [ActionController::class, 'destroy'])
            ->middleware(['auth:sanctum', 'ability:admin']);

        Route::get('/{id}/stages', [StageController::class, 'showActionStages'])
            ->middleware(['auth:sanctum', 'ability:admin,company']);
    });

    Route::prefix('/stages')->group(function () {

        Route::get('/', [StageController::class, 'index'])
            ->middleware(['auth:sanctum', 'ability:admin,company']);

        Route::post('/', [StageController::class, 'store'])
            ->middleware(['auth:sanctum', 'ability:admin']);

        Route::get('/{id}', [StageController::class, 'show'])
            ->middleware(['auth:sanctum', 'ability:admin,company']);

        Route::patch('/{id}', [StageController::class, 'update'])
            ->middleware(['auth:sanctum', 'ability:admin']);

        Route::delete('/{id}', [StageController::class, 'destroy'])
            ->middleware(['auth:sanctum', 'ability:admin']);

    });

    Route::prefix('/responsibles')->group(function () {

        Route::get('/', [ResponsibleController::class, 'index'])
            ->middleware(['auth:sanctum', 'ability:admin,company']);

        Route::post('/', [ResponsibleController::class, 'store'])
            ->middleware(['auth:sanctum', 'ability:admin']);

        Route::get('/{id}', [ResponsibleController::class, 'show'])
            ->middleware(['auth:sanctum', 'ability:admin,company']);

        Route::patch('/{id}', [ResponsibleController::class, 'update'])
            ->middleware(['auth:sanctum', 'ability:admin']);

        Route::delete('/{id}', [ResponsibleController::class, 'destroy'])
            ->middleware(['auth:sanctum', 'ability:admin']);

    });

    Route::get('/count', [CompanyController::class, 'statusCount'])
        ->middleware(['auth:sanctum', 'ability:admin,company']);

});

Route::post('/admin/login', [AdminAuthController::class, 'login']);
Route::post('/admin/logout', [AdminAuthController::class, 'logout']);

Route::post('/company/login', [CompanyAuthController::class, 'login']);
Route::post('/company/logout', [CompanyAuthController::class, 'logout']);


