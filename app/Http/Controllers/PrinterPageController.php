<?php

namespace App\Http\Controllers;

use Illuminate\Support\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\Printer;
use App\Models\PrinterPage;


class PrinterPageController extends Controller
{
    public function printed(Request $request)
    {
        $isPrint = true;
        $rules = [
            'printer_id' => ['required', 'numeric'],
            'end_year' => ['required', 'numeric', 'min:1950', 'max:' . now()->year],
            'end_month' => ['required', 'numeric', 'min:1', 'max:12'],
            'start_year' => ['nullable', 'numeric', 'min:1950', 'max:' . now()->year],
            'start_month' => ['nullable', 'numeric', 'min:1', 'max:12'],
        ];

        $messages = [
            'end_year.required' => 'Укажите год!',
            'end_year.min' => 'Не раньше 1950!',
            'end_year.max' => 'Не позже ' . now()->year,
            'end_month.required' => 'Укажите месяц!',
            'end_month.min' => 'Укажите существующий месяц!',
            'end_month.max' => 'Не позже ' . now()->month,
            'start_year.min' => 'Не раньше 1950!',
            'start_year.max' => 'Не позже ' . now()->year,
            'start_month.min' => 'Укажите существующий месяц!',
            'start_month.max' => 'Не позже ' . now()->month,
        ];
    
        $validator = Validator::make($request->all(), $rules, $messages);
    
        $validator->after(function ($validator) use ($request) {
            $end_year = $request->input('end_year');
            $end_month = $request->input('end_month');
            $start_year = $request->input('start_year');
            $start_month = $request->input('start_month');
    
            if ($start_year && ($start_year > $end_year)) {
                $validator->errors()->add('error', 'Некорректные значения годов!');
            }
    
            if ($start_year && $start_month && ($start_year === $end_year) && ($start_month > $end_month)) {
                $validator->errors()->add('error', 'Некорректные значения месяце');
            }

            if (!$start_year && $start_month && ($start_month > $end_month)) {
                $validator->errors()->add('error', 'Некорректные значения месяцев!');
            }
        });
    
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()->first(),
                'isPrint' => $isPrint,
            ]);
        }
    
        $attributes = $validator->validated();
    
        $printer_id = $attributes['printer_id'];
        $end_year = $attributes['end_year'];
        $end_month = $attributes['end_month'];
        $start_year = $attributes['start_year'] ?? null;
        $start_month = $attributes['start_month'] ?? null;
    
        $data = $this->filter($printer_id, [
            'end_year' => $end_year,
            'end_month' => $end_month,
            'start_year' => $start_year,
            'start_month' => $start_month,
        ]);
    
        if ($data->isEmpty()) {
            return response()->json([
                'error' => 'Не найдено',
                'isPrint' => $isPrint,
                'search_end_year' => $end_year,
                'search_end_month' => $end_month,
                'search_start_year' => $start_year,
                'search_start_month' => $start_month,
            ]);
        } else {
            return response()->json([
                'search_end_year' => $end_year,
                'search_end_month' => $end_month,
                'search_start_year' => $start_year,
                'search_start_month' => $start_month,
                'pages' => $data->pluck('print_pages')->toArray(),
                'start_years' => $data->pluck('start_year')->toArray(),
                'start_months' => $data->pluck('start_month')->toArray(),
                'end_years' => $data->pluck('end_year')->toArray(),
                'end_months' => $data->pluck('end_month')->toArray(),
                'isPrint' => $isPrint,
            ]);
        }
    }
    

    private function filter(string $printer_id, array $range){
        $query = PrinterPage::where('printer_id', $printer_id);

        $query_end = $range['end_year'] * 12 + $range['end_month'];


        if($range['start_year'] && $range['start_month']){
            $query_start = $range['start_year'] * 12 + $range['start_month'];
        }
        elseif($range['start_month']){
            $query_start = $range['end_year'] * 12 + $range['start_month'];
        }
        else{
            $query_start = $query_end;
        }
    
        $query->whereRaw('(start_year * 12 + start_month) <= ?', [$query_end])
              ->whereRaw('(end_year * 12 + end_month) >= ?', [$query_start]);

        return $query->get();
    }

    public function scanned(Request $request)
    {
        $isPrint = false;
        $rules = [
            'printer_id' => ['required', 'numeric'],
            'end_year' => ['required', 'numeric', 'min:1950', 'max:' . now()->year],
            'end_month' => ['required', 'numeric', 'min:1', 'max:12'],
            'start_year' => ['nullable', 'numeric', 'min:1950', 'max:' . now()->year],
            'start_month' => ['nullable', 'numeric', 'min:1', 'max:12'],
        ];

        $messages = [
            'end_year.required' => 'Укажите год!',
            'end_year.min' => 'Не раньше 1950!',
            'end_year.max' => 'Не позже ' . now()->year,
            'end_month.required' => 'Укажите месяц!',
            'end_month.min' => 'Укажите существующий месяц!',
            'end_month.max' => 'Не позже ' . now()->month,
            'start_year.min' => 'Не раньше 1950!',
            'start_year.max' => 'Не позже ' . now()->year,
            'start_month.min' => 'Укажите существующий месяц!',
            'start_month.max' => 'Не позже ' . now()->month,
        ];
    
        $validator = Validator::make($request->all(), $rules, $messages);
    
     
        $validator->after(function ($validator) use ($request) {
            $end_year = $request->input('end_year');
            $end_month = $request->input('end_month');
            $start_year = $request->input('start_year');
            $start_month = $request->input('start_month');
    
            if ($start_year && ($start_year > $end_year)) {
                $validator->errors()->add('error', 'Некорректные значения годов!');
            }
    
            if ($start_year && $start_month && ($start_year === $end_year) && ($start_month > $end_month)) {
                $validator->errors()->add('error', 'Некорректные значения месяцев!');
            }

            if (!$start_year && $start_month && ($start_month > $end_month)) {
                $validator->errors()->add('error', 'Некорректные значения месяцев!');
            }
        });
    
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()->first(),
                'isPrint' => $isPrint,
            ]);
        }
    
        $attributes = $validator->validated();
    
        $printer_id = $attributes['printer_id'];
        $end_year = $attributes['end_year'];
        $end_month = $attributes['end_month'];
        $start_year = $attributes['start_year'] ?? null;
        $start_month = $attributes['start_month'] ?? null;
    
        $data = $this->filter($printer_id, [
            'end_year' => $end_year,
            'end_month' => $end_month,
            'start_year' => $start_year,
            'start_month' => $start_month,
        ]);
    
        if ($data->isEmpty()) {
            return response()->json([
                'error' => 'Не найдено',
                'isPrint' => $isPrint,
                'search_end_year' => $end_year,
                'search_end_month' => $end_month,
                'search_start_year' => $start_year,
                'search_start_month' => $start_month,
            ]);
        } else {
            return response()->json([
                'search_end_year' => $end_year,
                'search_end_month' => $end_month,
                'search_start_year' => $start_year,
                'search_start_month' => $start_month,
                'pages' => $data->pluck('print_pages')->toArray(),
                'start_years' => $data->pluck('start_year')->toArray(),
                'start_months' => $data->pluck('start_month')->toArray(),
                'end_years' => $data->pluck('end_year')->toArray(),
                'end_months' => $data->pluck('end_month')->toArray(),
                'isPrint' => $isPrint,
            ]);
        }
    }
    
}
