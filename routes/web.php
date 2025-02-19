<?php

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\PrinterController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UpvoteController;
use App\Http\Controllers\UserController;
// use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GraphController;

Route::redirect('/', '/main');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware(['verified', 'role:' . RolesEnum::Admin->value])->group(function () {
        Route::get('/user', [UserController::class, 'index'])
            ->name('user.index');
        Route::get('/user/{user}/edit', [UserController::class, 'edit'])
            ->name('user.edit');
        Route::put('/user/{user}', [UserController::class, 'update'])
            ->name('user.update');
    });

    Route::middleware([
        'verified',
        sprintf(
            'role:%s|%s',
            RolesEnum::User->value,
            RolesEnum::Admin->value
        )
    ])->group(function () {
        Route::get('/main', [PrinterController::class, 'index'])->name('main');
        Route::get('/printers', [PrinterController::class, 'getPrinters']);
        Route::get('/search', [PrinterController::class, 'searchPrinters']);


        Route::resource('printer', PrinterController::class)
            ->except(['index'])
            ->middleware('can:' . PermissionsEnum::ManagePrinters->value);

        Route::get('/graph', [GraphController::class, 'index'])->name('graph');

        // Route::get('/feature', [FeatureController::class, 'index'])
        //     ->name('feature.index');

        // Route::post('/feature/{feature}/comments', [CommentController::class, 'store'])
        //     ->name('comment.store')

        //     ->middleware('can:' . PermissionsEnum::ManageComments->value);
        // Route::delete('/comment/{comment}', [CommentController::class, 'destroy'])
        //     ->name('comment.destroy')
        //     ->middleware('can:' . PermissionsEnum::ManageComments->value);
    });
});

require __DIR__ . '/auth.php';
