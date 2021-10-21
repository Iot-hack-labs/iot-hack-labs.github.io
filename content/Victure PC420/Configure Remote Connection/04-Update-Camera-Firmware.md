---
title: "Update Camera Firmware"
weight: 400
date: 2021-10-18T20:48:21-06:01
---

**The following commands need to be run on the camera**

Now that we have the modified squashfs file, we can update the camera's firmware. Plug the micro SD into the camera and run the following
```sh
/usr/sbin/update.sh
```
Where,
- `/usr/sbin/update.sh`: Runs the script to update the camera's firmware

The camera should reboot once it is done updating.
