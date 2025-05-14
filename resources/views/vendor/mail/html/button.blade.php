@props(['url', 'color' => 'primary', 'align' => 'center', 'icon' => null])
<table class="action" align="{{ $align }}" width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
        <td align="{{ $align }}">
            <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                    <td align="{{ $align }}">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                                <td>
                                    <a href="{{ $url }}" class="button button-{{ $color }}"
                                        target="_blank" rel="noopener">
                                        @if ($icon)
                                            <img src="{{ $icon }}" width="16" height="16"
                                                style="display: inline-block; margin-right: 6px; vertical-align: middle;"
                                                alt="Icon">
                                        @endif
                                        {{ $slot }}
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
