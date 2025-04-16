<?php

use Illuminate\Support\Facades\Route;

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;

###########################

use App\Http\Controllers\PrinterController;
use App\Http\Controllers\PrinterPageController;
use App\Http\Controllers\PrinterSearchController;
use App\Http\Controllers\PrinterGetController;

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
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
        Route::get('/printers', PrinterGetController::class);
        Route::get('/search', PrinterSearchController::class);
        Route::get('/printed', [PrinterPageController::class, 'printed']);
        Route::get('/scanned', [PrinterPageController::class, 'scanned']);
        // Route::get('/printer', [PrinterPageController::class, 'getPrinterPages']);


        Route::resource('printer', PrinterController::class)
            ->except(['index'])
            ->middleware('can:' . PermissionsEnum::ManagePrinters->value);

        Route::get('/graph', [GraphController::class, 'index'])->name('graph');
    });
});

require __DIR__ . '/auth.php';
