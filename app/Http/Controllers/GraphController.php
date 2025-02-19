<?php

namespace App\Http\Controllers;

use App\Models\Printer;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Inertia\Inertia;
use \App\Http\Resources\PrinterResource;
use App\Services\TagService;

class GraphController extends Controller
{
    public function index()
    {

        $printers = Printer::all();
        
        return Inertia::render('Graph/Index'
        , [
            'printers' => $printers,
        ]
    );
    }


    public function edit(Printer $printer)
    {

    }


    public function all()
    {
        $printers = Printer::with(['tags'])->latest()->paginate(5);
        return view('printers.all', [
            'printers' => $printers,
        ]);
    }

    public function create()
    {

    }

    public function show(Printer $printer)
    {
        return view('printers.show', [
            'printer' => $printer,
        ]);
    }

    public function store()
    {

    }

    public function update()
    {

    }





    public function destroy()
    {

    }
}
