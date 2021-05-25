<?php

use App\Models\Session;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('Chat.{session}.presence', function ($user, Session $session) {
    if ($user->id == $session->user_a_id || $user->id == $session->user_b_id) {
        return $user;
    };
    return false;
});

Broadcast::channel('Chat.{session}', function ($user, Session $session) {
    if ($user->id == $session->user_a_id || $user->id == $session->user_b_id) {
        return true;
    };
    return false;
});
