<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Navbar;
use App\Models\HeroSection;
use App\Models\StudentProject;
use App\Models\Activity;
use App\Models\Contact;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $menus = Navbar::whereNull('parent_id')
            ->where('is_active', true)
            ->where('order_priority', '>', 0)
            ->with('children')
            ->orderBy('order_priority')
            ->get();

        $logo = Navbar::where('order_priority', 0)->first();
        $hero = HeroSection::active()->get();
        $projects = StudentProject::latest()->get();

        // 2. Ambil data kegiatan (menggunakan latest agar yang terbaru muncul duluan)
        $activities = Activity::latest()->get();
        $contact = Contact::latest()->first();

        return Inertia::render('home/Index', [
            'heroData' => $hero,
            'menus' => $menus,
            'logo' => $logo,
            'projects' => $projects,
            'activities' => $activities,
            'contact' => $contact,
        ]);
    }
}
