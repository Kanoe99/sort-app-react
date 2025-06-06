<?php

namespace App\Http\Requests\Printer;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\StartBeforeEnd;


class StorePrinterRequest extends FormRequest {

    public function rules(): array {
        return [
            'type' => ['required', 'string', 'max:255'],
            'model' => ['required', 'string', 'max:255'],
            'network_capable' => ['required', 'string', 'max:255'],
            'department_head' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'isIPv4' => ['required', 'boolean'],

            'status' => ['required', 'string', 'max:255'],
            'comment' => ['nullable', 'string', 'max:255'],
            'tags' => ['nullable', 'string'],
            'attention' => ['nullable'],
            'logo.*' => ['nullable', 'mimes:jpg,jpeg,png'],
            'printer_pages_no_sum' => ['required', 'array'],
            'printer_pages_no_sum.*.print_pages' => ['numeric', 'nullable', 'max:999999999999999'],
            'printer_pages_no_sum.*.scan_pages' => ['numeric', 'nullable', 'max:999999999999999'],
            'printer_pages_no_sum.*.start_year' => ['numeric', 'required', 'max:' . date('Y')],
            'printer_pages_no_sum.*.end_year' => ['numeric', 'required', 'max:' . date('Y')],
            'printer_pages_no_sum.*' => [new StartBeforeEnd()],
        ];
    }

    public function messages(): array {
        return [
            'type.required' => 'Укажите тип оборудования.',
            'model.required' => 'Укажите модель оборудования.',
            'number.required' => 'Укажите номер принтера.',
            'number.max' => 'Номер поменьше надо (максимум: 999999999999999)',
            'number.unique' => 'Инвентарный номер уже существует!',
            'network_capable.required' => 'Есть ли возможность сделать сетевым?',
            'department_head.required' => 'Укажите ответственное лицо.',
            'location.required' => 'Укажите локацию принтера.',
            'PC_name.required' => 'Укажите наименование компьютера.',
            'IP.required' => 'Укажите IP адрес принтера.',
            'IP.unique' => 'Данный IP адрес уже занят.',
            'IP.ip' => 'IP адрес должен быть верным.',
            'isIPv4.required' => 'Требуется указать тип IP адреса!',
            'isIPv4.boolean' => 'Только IPv4 или IPv6!',

            'status.required' => 'Укажите статус принтера.',
            'logo.*.mimes' => 'Только PNG, JPG или JPEG!',
            'printer_pages_no_sum.required' => 'printer_pages_no_sum[] куда делись?',
            'printer_pages_no_sum.array' => 'почему datatype is not an array?',
            'printer_pages_no_sum.*.print_pages.numeric' => 'Только цифры',
            'printer_pages_no_sum.*.print_pages.max' => 'нельзя больше 999999999999999',
            'printer_pages_no_sum.*.scan_pages.numeric' => 'Только цифры',
            'printer_pages_no_sum.*.scan_pages.max' => 'нельзя больше 999999999999999',
            'printer_pages_no_sum.*.start_year.max' => 'Год не может быть больше текущего!',
            'printer_pages_no_sum.*.end_year.max' => 'Год не может быть больше текущего!',
        ];
    }
}