---
title: "Test Remote Connection"
weight: 1000
date: 2021-10-18T20:52:11-06:00
---

in uboot (press enter after rebooting)

```sh
setenv bootargs console=ttySAK0,115200n8 root=/dev/mtdblock4 rootfstype=squashfs init=/bin/sh mem=64M memsize=64M
saveenv
```

reboot... wait for shell.

```sh
mount /mnt && mkdir /mnt/debug && touch /mnt/debug/log.txt
/etc/init.d/rcS
```

in uboot (press enter after rebooting)

```sh
setenv bootargs console=ttySAK0,115200n8 root=/dev/mtdblock4 rootfstype=squashfs init=/init mem=64M memsize=64M
saveenv
```

reboot
