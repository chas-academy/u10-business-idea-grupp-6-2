<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\MatchController;
use App\Http\Controllers\PreferenceController;
use App\Http\Controllers\SessionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

require __DIR__ . '/json-api-auth.php';

Route::group(['middleware' => ['auth:sanctum', 'verified']],  function () {

    // this route is for adding or removing user preferences.
    Route::post('/prefs', PreferenceController::class)->name('prefs');

    // this route is for getting a list of user-matches
    Route::get('/match', [MatchController::class, 'match'])->name('match');

    // for chat
    Route::post('getFriends', [MatchController::class, 'getFriends'])->name('getFriends');
    Route::post('/session/create', [SessionController::class, 'create'])->name('create');
    Route::post('/session/{session}/chats', [ChatController::class, 'chats'])->name('chats');
    Route::post('/send/{session}', [ChatController::class, 'send'])->name('send');
});
