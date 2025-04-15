<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

use App\Models\PrinterPage;
use App\Helpers\StringHelper;
use App\Services\DepartmentService;
use App\Services\PrinterPageService;

class Printer extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'IP',
        'comment',
        'fixDate',
        'number',
        'counter',
        'model',
        'status',
        'location',
        'counterDate',
        'isIPv4',
        'department',
        'department_head',
        'network_capable',
        'isLocal',
        'PC_name',
    ];

    public function tag(string $name): void
    {
        $tag = Tag::firstOrCreate(['name' => strtolower($name)]);

        $this->tags()->attach($tag);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    public function printerPages(){
        return $this->hasMany(PrinterPage::class);
    }

    public function sumPages(){
        return $this->printerPages()->where('isSum', 1);
    }
  
    public function threeLastPages(){
        return $this->printerPages()->where('isSum', 0)->orderBy('end_year', 'desc')->limit(3);
    }
  
    
    public function user(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function getPages()
    {
        return $this->printerPages()->where('isSum', 1)->get();
    }

    public function lowercase($text)
    {
        return StringHelper::lowercaseRussianOnly($text);
    }

    public function setAttributesLowercase(array $attributes, $request){
        $attributes['type'] = $this->lowercase($attributes['type']);
        $attributes['model'] = $this->lowercase($attributes['model']);
        $attributes['location'] = $this->lowercase($attributes['location']);
        $attributes['status'] = $this->lowercase($attributes['status']);
        $attributes['comment'] = $request->filled('comment') ? $this->lowercase($attributes['comment']) : null;
        $attributes['department'] = (new DepartmentService)->getDepartment($attributes['department_head']);

        return $attributes;
    }

    public function setOptionalAttributes(array $attributes, $request, $printer, $updatePrinterRequest){
        if($request->hasNumber){
            $request->validate([
                'number' => ['required', 'numeric', 'min:1', 'max:999999999999999', 'unique:printers,number,' . $printer->id],
            ], $updatePrinterRequest->messages());
            $attributes['number'] = $request->number;
        }
        else{
            $attributes['number'] = null;
        }

        if ($request->IP) {
            $request->validate([
                'IP' => ['required', 'unique:printers,IP,' . $printer->id, 'ip'],
            ], $updatePrinterRequest->messages());
            $attributes['IP'] = $request->IP;
        }
        else{
            $attributes['IP'] = null;
        }
        
        if($request->PC_name){
            dd('im here');
            $request->validate([
                'PC_name' => ['required', 'string', 'max:255']
            ], $updatePrinterRequest->messages());
            $attributes['PC_name'] = $request->PC_name;
        }
        else{
            $attributes['PC_name'] = null;
        }

              
        if ($request->filled('fixDate')) {
            $fixDate = $request->input('fixDate');
    
            if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $fixDate)) {
                $attributes['fixDate'] = Carbon::createFromFormat('Y-m-d', $fixDate)->format('Y-m-d');
            } else {
                return back()->withErrors(['fixDate' => 'Некорректная дата.']);
            }
        }

        return $attributes;
    }


}
