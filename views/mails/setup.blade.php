<hr>
<div style="text-align: center; font-weight: bolder">{{ config('tinycom.name') }}</div>
<hr>
<div style="margin-left: 10px; font-family: monospace">
    <p style="font-weight: bold">Hi, {{ $company->User->name }}</p>
    <p>
        The setup process of {{ config('tinycom.name') }} for your company <strong>{{ $company->company }}</strong> is completed.<br>
        Here follows the details
    </p>
    <div style="background-color: #FAFAFA; padding:20px;">
        <strong>Public URL (for customers)</strong><br>
        <em>http://{{ $company->domain }} <a href="http://{{ $company->domain }}">&raquo;</a></em><br><br>
        <strong>Admin URL</strong><br>
        <em>http://{{ $company->domain }}/admin <a href="http://{{ $company->domain }}/admin">&raquo;</a></em><br><br>
        <strong>Admin Password</strong><br>
        <em>{{ $company->password }}</em>
    </div>

    <p>Its good practice to change password regularly to make your account safe..</p>

    <p style="margin-top: 50px">
        Regards,<br><br>
        <strong>{{ config('tinycom.name') }}</strong><br>
        {!! implode("<br/>",array_filter([config('tinycom.contact_address_1'),config('tinycom.contact_address_2'),config('tinycom.contact_numbers'),config('tinycom.contact_email')])) !!}</strong><br>
    </p>
</div>
