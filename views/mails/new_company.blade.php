<hr>
<div style="text-align: center; font-weight: bolder">{{ config('tinycom.name') }}</div>
<hr>
<div style="margin-left: 10px; font-family: monospace; max-width: 480px">
    <table cellpadding="5" cellspacing="5">
        <tbody>
            <tr><th style="text-align: left;">Name</th><th>:</th><td>{{ $company->company }}</td></tr>
            <tr><th style="text-align: left;">Domain</th><th>:</th><td>{{ $company->domain }}</td></tr>
            <tr><th style="text-align: left;">Created At</th><th>:</th><td>{{ date('D d/m/Y, h:i A',strtotime($company->created_at)) }}</td></tr>
            <tr><th style="text-align: left;" colspan="3">Database</th></tr>
            <tr><th style="text-align: left;">Database</th><th>:</th><td>{{ $company->database }}</td></tr>
            <tr><th style="text-align: left;">Username</th><th>:</th><td>{{ $company->database_username }}</td></tr>
            <tr><th style="text-align: left;">Password</th><th>:</th><td>{{ $company->database_password }}</td></tr>
            <tr><th style="text-align: left;" colspan="3">User</th></tr>
            <tr><th style="text-align: left;">Distributor</th><th>:</th><td>{{ $company->Referrer ? $company->Referrer->name : '' }}</td></tr>
            <tr><th style="text-align: left;">Client</th><th>:</th><td>{{ $company->User ? $company->User->name : '' }}</td></tr>
        </tbody>
    </table>
</div>
