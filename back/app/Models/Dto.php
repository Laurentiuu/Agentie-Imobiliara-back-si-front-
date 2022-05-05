<?php

namespace App\Models;

// use Spatie\DataTransferObject\DataTransferObject;

class Dto
{
    /** @var int */
    public $argument;

    /** @var int */
    public $value;

}

$dto = new Dto([
    'argument' => '…',
    'value' => '…',
]);

$dto->argument;
$dto->value;
