<tr>
    <td>
        <table class="footer" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
                <td class="content-cell" align="center">
                    <div class="social-icons">
                        <a href="https://facebook.com/yourcompany" target="_blank">
                            <img src="https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/facebook.svg"
                                class="social-icon" alt="Facebook">
                        </a>
                        <a href="https://twitter.com/yourcompany" target="_blank">
                            <img src="https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/twitter.svg"
                                class="social-icon" alt="Twitter">
                        </a>
                        <a href="https://instagram.com/yourcompany" target="_blank">
                            <img src="https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/instagram.svg"
                                class="social-icon" alt="Instagram">
                        </a>
                        <a href="https://linkedin.com/company/yourcompany" target="_blank">
                            <img src="https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/linkedin.svg"
                                class="social-icon" alt="LinkedIn">
                        </a>
                    </div>
                    <div class="divider"></div>
                    {{ Illuminate\Mail\Markdown::parse($slot) }}
                </td>
            </tr>
        </table>
    </td>
</tr>
