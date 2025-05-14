@props([
    'type' => 'default',
    'icon' => null,
])

@php
    $typeClasses = [
        'default' => 'panel-default',
        'info' => 'panel-info',
        'success' => 'panel-success',
        'warning' => 'panel-warning',
        'error' => 'panel-error',
    ];

    $typeClass = $typeClasses[$type] ?? $typeClasses['default'];
@endphp

<table class="panel {{ $typeClass }}" width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
        <td class="panel-content">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                    <td class="panel-item">
                        @if ($icon)
                            <div style="display: flex; align-items: flex-start;">
                                <img src="{{ $icon }}" width="20" height="20"
                                    style="margin-right: 10px; margin-top: 4px;" alt="Icon">
                                <div>{{ Illuminate\Mail\Markdown::parse($slot) }}</div>
                            </div>
                        @else
                            {{ Illuminate\Mail\Markdown::parse($slot) }}
                        @endif
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
