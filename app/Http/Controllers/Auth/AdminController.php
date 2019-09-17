<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Controllers\Controller;


class AdminController extends Controller
{
    public function index_users()  // fetch all Families
    {
        $users = User::with('role')->orderBy('created_at', 'asc')->get();

        return response()->json($users,200);
    }
   
}
