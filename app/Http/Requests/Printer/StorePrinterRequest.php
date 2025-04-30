<?php

namespace App\Http\Requests\Printer;

use Illuminate\Foundation\Http\FormRequest;

###############################################

class StorePrinterRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'network_capable' => ['required', 'string', 'max:255'],
            "PC_name" => ['required' , 'string', 'max:255'],
            'department_head' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'max:255'],
            'model' => ['required', 'string', 'max:255'],
            'hasNumber' => ['required', 'boolean'],
            'location' => ['required', 'string', 'max:255'],
            'status' => ['required', 'string', 'max:255'],
            'comment' => ['nullable', 'string', 'max:255'],
            'tags' => ['nullable', 'string'],
            'attention' => ['nullable'],
            'logo.*' => ['nullable', 'mimes:jpg,jpeg,png'],
            'isIPv4' => ['required', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'network_capable.required' => 'Есть ли возможность сделать сетевым?',
            'PC_name.required' => 'Укажите имя компьютера.',
            'department_head.required' => 'Укажите ответственное лицо.',
            'type.required' => 'Укажите модель принтера.',
            'model.required' => 'Укажите модель принтера.',
            'hasNumber.required' => 'Есть инвентарный номер?',
            'hasNumber.boolean' => 'Только значения "есть" или "нет"!',
            'location.required' => 'Укажите кабинет.',
            'status.required' => 'Укажите статус принтера.',
            'number.max' => 'Номер поменьше надо (максимум: 999999999999999)',
            'logo.*.mimes' => 'Только PNG, JPG или JPEG!',
            'isIPv4.required' => 'Требуется указать тип IP адреса!',
            'isIPv4.boolean' => 'Только IPv4 или IPv6!',
        ];
    }
}