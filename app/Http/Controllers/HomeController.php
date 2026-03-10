<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Navbar;
use App\Models\HeroSection;
use App\Models\StudentProject;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $menus = Navbar::whereNull('parent_id')
            ->where('is_active', true)
            ->where('order_priority', '>', 0)
            ->with('children') // Memuat sub-menu secara otomatis
            ->orderBy('order_priority')
            ->get();
        $logo = Navbar::where('order_priority', 0)->first();
        $hero = HeroSection::active()->first();
        $projects = StudentProject::latest()->get();

        return Inertia::render('home/Index', [
            'heroData' => $hero,
            'menus' => $menus,
            'logo' => $logo,
            'projects' => $projects,
        ]);
    }
}
