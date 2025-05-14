<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\SampleEmail;

class EmailController extends Controller
{
    public function sendSampleEmail(Request $request)
    {
        $name = $request->input('name', 'Utilisateur');
        $email = $request->input('email');

        Mail::to($email)->send(new SampleEmail($name));

        return back()->with('success', 'Email envoyé avec succès!');
    }
}
