@props(['url'])
<tr>
    <td class="header">
        <a href="{{ $url }}" style="display: inline-block;">
            @if (trim($slot) === 'Laravel')
                <img src="https://devift.madagascar.webcup.hodi.host/logo.png" class="logo" alt="TheEnd Logo">
            @else
                <div style="display: flex; align-items: center; justify-content: center;">
                    <img src="{{ asset('/logo.png') }}" class="logo" alt="TheEnd Logo">
                    <span
                        style="margin-left: 10px; font-size: 22px; font-weight: 700; color: #1a202c;">{{ $slot }}</span>
                </div>
            @endif
        </a>
    </td>
</tr>
