<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Inertia\Inertia;
use \App\Http\Resources\PrinterResource;
use \App\Http\Resources\PrinterPageResource;
use App\Services\TagService;
use App\Services\DepartmentService;

use App\Models\Printer;
use App\Models\PrinterPage;
use App\Http\Controllers\PrinterPageController;
use App\Models\Tag;

class PrinterController extends Controller
{
    public function index()
    {
        $perPage = 12;

        $printers = Printer::with(['tags'])->latest()->paginate($perPage);
        // $aprinters = Printer::with(['tags'])->where('attention', true)->get();
        $tags = Tag::all();

        return Inertia::render('Printer/Index', [
            'printers' => $printers,
            // 'aprinters' => $aprinters,
            'tags' => $tags,
        ]);
    }


    public function edit(Printer $printer)
    {

        return Inertia::render('Printer/Edit', [
            'printer' => new PrinterResource($printer),
            'printer_pages' => PrinterPageResource::collection(PrinterPage::where('printer_id', $printer->id)->get()),
            'department_heads' => (new DepartmentService)->getDepartmentHeads()
            
        ]);
    }

    public function searchPrinters(Request $request)
    {
   
        $perPage = $request->input('perPage', 10);
        $page = $request->input('page', 1);
        $search = $request->input('search');
    
        $query = Printer::with(['tags', 'sumPages', 'threeLastPages'])->latest();

        function qwertyToRussian($input) {
            $map = [
                'q' => 'й', 'w' => 'ц', 'e' => 'у', 'r' => 'к', 't' => 'е', 'y' => 'н', 'u' => 'г', 'i' => 'ш', 'o' => 'щ', 'p' => 'з', '[' => 'х', ']' => 'ъ',
                'a' => 'ф', 's' => 'ы', 'd' => 'в', 'f' => 'а', 'g' => 'п', 'h' => 'р', 'j' => 'о', 'k' => 'л', 'l' => 'д', ';' => 'ж', "'" => 'э',
                'z' => 'я', 'x' => 'ч', 'c' => 'с', 'v' => 'м', 'b' => 'и', 'n' => 'т', 'm' => 'ь', ',' => 'б', '.' => 'ю'
            ];
        
            return strtr($input, $map);
        }

        function russianToQwerty($input) {
            $map = [
                'й' => 'q', 'ц' => 'w', 'у' => 'e', 'к' => 'r', 'е' => 't', 'н' => 'y', 'г' => 'u', 'ш' => 'i', 'щ' => 'o', 'з' => 'p', 'х' => '[', 'ъ' => ']',
                'ф' => 'a', 'ы' => 's', 'в' => 'd', 'а' => 'f', 'п' => 'g', 'р' => 'h', 'о' => 'j', 'л' => 'k', 'д' => 'l', 'ж' => ';', 'э' => "'",
                'я' => 'z', 'ч' => 'x', 'с' => 'c', 'м' => 'v', 'и' => 'b', 'т' => 'n', 'ь' => 'm', 'б' => ',', 'ю' => '.'
            ];
        
            return strtr($input, $map);
        }
        
    
        if ($search) {
            $search = strtolower($search);
            
            $result = $query->whereRaw('LOWER(model) LIKE ?', ["%".$search."%"])
            ->orWhereRaw('LOWER(location) LIKE ?', ["%".$search."%"])
            ->orWhereRaw('LOWER(number) LIKE ?', ["%".$search."%"])
            ->orWhereRaw('LOWER(type) LIKE ?', ["%".$search."%"])
            ->orWhereRaw('LOWER(status) LIKE ?', ["%".$search."%"])
            ->orWhereHas('tags', function ($query) use ($search){
                $query->whereRaw('LOWER(name) LIKE ?', ["%".$search."%"]);
            });
            
             $printers = $result->paginate($perPage, ['*'], 'page', $page);


            if($printers->isEmpty()){

                $queryQTS = Printer::with(['tags'])->latest();

                if(preg_match('/^[A-Za-z\[\];\',\.]/', $search)){
                    $search = qwertyToRussian($search);
                }
                else if(preg_match('/[А-Яа-я]/', $search)){
                    $search = russianToQwerty($search);
                }

                //add output on frontend for which word user searched

                $result =  $queryQTS->whereRaw('LOWER(model) LIKE ?', ["%".$search."%"])
                ->orWhereRaw('LOWER(location) LIKE ?', ["%".$search."%"])
                ->orWhereRaw('LOWER(number) LIKE ?', ["%".$search."%"])
                ->orWhereRaw('LOWER(type) LIKE ?', ["%".$search."%"]);

              $printers = $result->paginate($perPage, ['*'], 'page', $page);
            }
      
        }
    
        // $printers = $result->paginate($perPage, ['*'], 'page', $page);
    
        
        return response()->json([
            'searchTransliterated' => $search,
            'printers' => $printers->items(),
            'current_page' => $printers->currentPage(),
            'last_page' => $printers->lastPage(),
        ]);
    }

    public function getPrinters(Request $request)
    {
        $perPage = $request->input('perPage', 2);
        $page = $request->input('page', 1);
    
        $printers = Printer::latest()->paginate($perPage, ['*'], 'page', $page);

        $printers->load([
            'tags',
            'sumPages',
            'threeLastPages'
        ]);
    
        return response()->json([
            'printers' => $printers->items(), 
            'current_page' => $printers->currentPage(),
            'last_page' => $printers->lastPage(),
        ]);
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
        return Inertia::render('Printer/Create', [
            'department_heads' => (new DepartmentService)->getDepartmentHeads()
        ]);
    }

    public function show(Printer $printer)
    {
        return view('printers.show', [
            'printer' => $printer,
        ]);
    }

   public function store(Request $request)
    {
        //TODO: delete try cath in prod
        dd($request->all());
     try{
        $attributes = $request->validate([
            'network_capable' => ['required', 'string', 'max:255'],
            "PC_name" => ['required' , 'string', 'max:255'],
            'department_head' => ['required', 'string', 'max:255'],
            'isLocal' => ['required', 'boolean'],
            'type' => ['required', 'string', 'max:255'],
            'model' => ['required', 'string', 'max:255'],
            'counter' => ['required', 'unique:printers,number', 'numeric', 'min:1', 'max:999999999999999'],
            'hasNumber' => ['required', 'boolean'],
            'location' => ['required', 'string', 'max:255'],
            'status' => ['required', 'string', 'max:255'],
            'comment' => ['nullable', 'string', 'max:255'],
            'tags' => ['nullable', 'string'],
            'attention' => ['nullable'],
            'logo.*' => ['nullable', 'mimes:jpg,jpeg,png'],
            'isIPv4' => ['required', 'boolean'],
        ], [
            'network_capable.required' => 'Есть ли возможность сделать сетевым?',
            'PC_name.required' => 'Укажите имя компьютера.',
            'department_head.required' => 'Укажите ответственное лицо.',
            'isLocal.required' => 'Требуется указать является ли принтер локальным!',
            'isLocal.boolean' => 'Только да или нет!',
            'type.required' => 'Укажите модель принтера.',
            'model.required' => 'Укажите модель принтера.',
            'hasNumber.required' => 'Есть инвентарный номер?',
            'hasNumber.boolean' => 'Только значения "есть" или "нет"!',
            'location.required' => 'Укажите кабинет.',
            'status.required' => 'Укажите статус принтера.',
            'counter.required' => 'Укажите счётчик страниц.',
            'number.max' => 'Номер поменьше надо (максимум: 999999999999999)',
            'logo.*.mimes' => 'Только PNG, JPG или JPEG!',
            'isIPv4.required' => 'Требуется указать тип IP адреса!',
            'isIPv4.boolean' => 'Только IPv4 или IPv6!',
        ]);
     }
        catch(\Illuminate\Validation\ValidationException $e){
            dd($e->errors());
          }
    
        function lowercaseRussianOnly($text)
        {
            return preg_replace_callback('/[А-ЯЁ]+/u', function ($matches) {
                return mb_strtolower($matches[0]);
            }, $text);
        }
    
        $attributes['type'] = lowercaseRussianOnly($attributes['type']);
        $attributes['model'] = lowercaseRussianOnly($attributes['model']);
        $attributes['location'] = lowercaseRussianOnly($attributes['location']);
        $attributes['status'] = lowercaseRussianOnly($attributes['status']);
        $attributes['comment'] = $request->filled('comment') ? lowercaseRussianOnly($attributes['comment']) : null;
        $attributes['counter'] = lowercaseRussianOnly($attributes['counter']);
        $attributes['department'] = (new DepartmentService)->getDepartment($attributes['department_head']);
    
        if ($request->IPBool === 'Есть') {
            $request->validate([
                'IP' => ['required', 'unique:printers,IP,' . $request->id, 'ip'],
            ], [
                'IP.required' => 'Укажите IP адрес принтера.',
                'IP.unique' => 'Данный IP адрес уже занят.',
                'IP.ip' => 'IP адрес должен быть верным.'
            ]);
    
            $attributes['IP'] = $request->IP;
        } else {
            $attributes['IP'] = null;
        }

        if ($request->hasNumber) {
            $request->validate([
            'number' => ['required', 'unique:printers,number', 'numeric', 'min:1', 'max:999999999999999'],
            ], [
                'number.required' => 'Укажите номер принтера.',
                'number.max' => 'Номер поменьше надо (максимум: 999999999999999)',
                'number.unique' => 'Инвентарный номер уже существует!',
            ]);
    
            $attributes['number'] = $request->number;
        } else {
            $attributes['number'] = null;
        }
    
        $attributes['attention'] = $request->has('attention') ? 1 : 0;
    
        if ($request->filled('fixDate')) {
            $fixDate = $request->input('fixDate');
    
            if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $fixDate)) {
                $attributes['fixDate'] = Carbon::createFromFormat('Y-m-d', $fixDate)->format('Y-m-d');
            } else {
                return back()->withErrors(['fixDate' => 'Некорректная дата.']);
            }
        }

    
        $attributes['counterDate'] = Carbon::now()->format('Y-m-d H:i:s');
    
        if ($request->file('logo')) {
            $folderName = $request->IP;
            $logoPaths = [];
    
            if (!Storage::disk('public')->exists("logos/{$folderName}")) {
                Storage::disk('public')->makeDirectory("logos/{$folderName}");
            }
    
            foreach ($request->file('logo') as $file) {
                try {
                    $logoPaths[] = $file->store("logos/{$folderName}", 'public');
                } catch (\Exception $e) {
                    return back()->withErrors(['logo' => 'Ошибка при загрузке файла: ' . $e->getMessage()]);
                }
            }
    
            $attributes['logo'] = json_encode($logoPaths);
        }
    
        $printer = Auth::user()->printers()->create(Arr::except($attributes, 'tags'));
        $tagService = new TagService();
        $tagService->generateTagsForPrinter($printer);
    
        return redirect('/main')->with(['success' => 'Принтер добавлен.', 'refreshed' => true, 'time'=>time()]);
    }
    
    //TODO: remove try catch in production 
    //store
    //update

   public function update(Request $request, Printer $printer)
    {
        $fields = array_keys($request->except('IPBool'));
    
        $oldData = Printer::select($fields)->findOrFail($printer->id)->toArray();
        $newData = $request->only($fields);

        $refreshed = $newData != $oldData;
    
      

    //   try{
        $attributes = $request->validate([
            'isLocal' => ['required', 'boolean'],
            'department_head' => ['required', 'string', 'max:255'],
            'network_capable' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'max:255'],
            'model' => ['required', 'string', 'max:255'],
            'counter' => ['required', 'numeric', 'min:1', 'max:999999999999999'],
            'number' => ['required', 'numeric', 'min:1', 'max:999999999999999', 'unique:printers,number,' . $printer->id],
            'location' => ['required', 'string', 'max:255'],
            'status' => ['required', 'string', 'max:255'],
            'comment' => ['nullable', 'string', 'max:255'],
            'tags' => ['nullable', 'string'],
            'attention' => ['nullable'],
            'logo.*' => ['nullable', 'mimes:jpg,jpeg,png'],
            'isIPv4' => ['required', 'boolean']
        ], [
            'isLocal.required' => 'Требуется указать является ли принтер локальным!',
            'isLocal.boolean' => 'Только да или нет!',
            'department_head.required' => 'Укажите ответственное лицо.',
            'network_capable.required' => 'Есть ли возможность сделать сетевым?',
            'type.required' => 'Укажите модель принтера.',
            'model.required' => 'Укажите модель принтера.',
            'counter.required' => 'Укажите счётчик страниц.',
            'counter.max' => 'Номер поменьше надо (максимум: 999999999999999)',
            'number.required' => 'Укажите номер принтера.',
            'number.max' => 'Номер поменьше надо (максимум: 999999999999999)',
            'number.unique' => 'Инвентарный номер уже существует!',
            'location.required' => 'Укажите локацию принтера.',
            'status.required' => 'Укажите статус принтера.',
            'logo.*.mimes' => 'Только PNG, JPG или JPEG!',
            'isIPv4.required' => 'Требуется указать тип IP адреса!',
            'isIPv4.boolean' => 'Только IPv4 или IPv6!'
        ]);
    //   }catch(\Illuminate\Validation\ValidationException $e){
    //     dd($e->errors());
    //   }

        function lowercaseRussianOnly($text)
        {
            return preg_replace_callback('/[А-ЯЁ]+/u', function ($matches) {
                return mb_strtolower($matches[0]);
            }, $text);
        }
    
        $attributes['type'] = lowercaseRussianOnly($attributes['type']);
        $attributes['model'] = lowercaseRussianOnly($attributes['model']);
        $attributes['location'] = lowercaseRussianOnly($attributes['location']);
        $attributes['status'] = lowercaseRussianOnly($attributes['status']);
        $attributes['comment'] = $request->filled('comment') ? lowercaseRussianOnly($attributes['comment']) : null;
        $attributes['counter'] = lowercaseRussianOnly($attributes['counter']);
        $attributes['department'] = (new DepartmentService)->getDepartment($attributes['department_head']);
    
        // Validate IP if required
        if ($request->IPBool === 'Есть') {
            $request->validate([
                'IP' => ['required', 'unique:printers,IP,' . $printer->id, 'ip'],
            ], [
                'IP.required' => 'Укажите IP адрес принтера.',
                'IP.unique' => 'Данный IP адрес уже занят.',
                'IP.ip' => 'IP адрес должен быть верным.', 
            ]);
            $attributes['IP'] = $request->IP;
        } else {
            $attributes['IP'] = null;
        }
        
        if($request->isLocal == true){
            $request->validate([
                'PC_name' => ['required', 'string', 'max:255']
            ],
            [
                'PC_name.required' => 'Укажите наименование компьютера.'
            ]);
            $attributes['PC_name'] = $request->PC_name;
        }
        else{
            $attributes['PC_name'] = null;
        }
        
        // Update 'attention' field
        $attributes['attention'] = $request->has('attention') ? 1 : 0;
    
        // Update counter date if counter changes
        if ($printer->counter != $request->counter) {
            $attributes['counterDate'] = Carbon::now()->format('Y-m-d');
        }
    
        // Handle logo updates
        $existingLogos = json_decode($printer->logo, true) ?? [];
        $logoPaths = $existingLogos;
    
        // Remove logos marked for deletion
        if ($request->filled('removed_logos')) {
            $removedLogos = json_decode($request->removed_logos, true);
            foreach ($removedLogos as $removedLogo) {
                if (in_array($removedLogo, $existingLogos)) {
                    Storage::disk('public')->delete($removedLogo);
                    $logoPaths = array_diff($logoPaths, [$removedLogo]);
                }
            }
        }
    
        // Add new logos
        if ($request->file('logo')) {
            $folderName = $request->IP ?? 'default';
            foreach ($request->file('logo') as $file) {
                $logoPaths[] = $file->store("logos/{$folderName}", 'public');
            }
        }
    
        $attributes['logo'] = json_encode($logoPaths);
    
        // Update the printer
        $printer->update(Arr::except($attributes, 'tags'));
    
        // Update tags
        if ($request->filled('tags')) {
            $newTags = array_unique(array_map('trim', explode(',', $request->tags)));
            $printer->tags()->sync([]);
            foreach ($newTags as $tag) {
                if (!empty($tag)) {
                    $tagModel = Tag::firstOrCreate(['name' => $tag]);
                    $printer->tags()->attach($tagModel);
                }
            }
        }
    
        return redirect()->back()->with([
            'success' => 'Данные обновлены.',
            'refreshed' => $refreshed,
            'time' => time()
        ]);
    }





    public function destroy(Printer $printer)
    {
            $printer->delete();
            return redirect('/main')->with(['success' => 'Принтер удалён.', 'refreshed' => true, 'time'=> time()]);
        
    }
}
