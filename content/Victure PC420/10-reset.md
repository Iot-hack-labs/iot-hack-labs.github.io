---
title: "Reset"
weight: 1000
date: 2021-10-18T20:52:11-06:00
---

in uboot (press enter after rebooting)

```sh
setenv bootargs console=ttySAK0,115200n8 root=/dev/mtdblock4 rootfstype=squashfs init=/bin/sh mem=64M memsize=64M
saveenv
```

reboot... wait for shell.
plug in sd card
```sh
mount /mnt
/etc/init.d/rcS
update.sh
```

in uboot (press enter after rebooting)

```sh
setenv bootargs console=ttySAK0,115200n8 root=/dev/mtdblock4 rootfstype=squashfs init=/init mem=64M memsize=64M
saveenv
```

reboot
