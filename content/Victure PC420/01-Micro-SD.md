---
title: "Micro SD"
weight: 100
date: 2021-10-18T20:46:32-06:00
draft: true
---

## Micro SD
The micro SD must be FAT32 formatted. The following steps can be skipped if your micro SD is already FAT32 formatted.

### Partitioning
When the micro SD card is plugged in, run the following to determine the micro SD's block device on the computer
```sh
kali@kali:~$ sudo fdisk -l

Disk /dev/sda: 80 GiB, 85899345920 bytes, 167772160 sectors
Disk model: VMware Virtual S
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x0852c5cd

Device     Boot     Start       End   Sectors  Size Id Type
/dev/sda1  *         2048 165771263 165769216   79G 83 Linux
/dev/sda2       165773310 167770111   1996802  975M  5 Extended
/dev/sda5       165773312 167770111   1996800  975M 82 Linux swap / Solaris


Disk /dev/sdb: 3.69 GiB, 3965714432 bytes, 7745536 sectors
Disk model: Storage Device  
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x29a1987d
```

In this case, the block device for the micro SD is `/dev/sdb`

We will use `fdisk` to create a partition on the card.
```sh
kali@kali:~$ sudo fdisk /dev/sdb

Welcome to fdisk (util-linux 2.37.2).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.


Command (m for help): n
Partition type
   p   primary (0 primary, 0 extended, 4 free)
   e   extended (container for logical partitions)
Select (default p): [ENTER]

Using default response p.
Partition number (1-4, default 1): [ENTER]
First sector (2048-7745535, default 2048): [ENTER]
Last sector, +/-sectors or +/-size{K,M,G,T,P} (2048-7745535, default 7745535): [ENTER]

Created a new partition 1 of type 'Linux' and of size 3.7 GiB.

Command (m for help): w
The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.

```
Where,
- `Command (m for help): n`: Adds a new partition
- `Select (default p): [ENTER]`: The default `p` is used. `p` will mark the partition as the primary partition
- `First sector (2048-7745535, default 2048): [ENTER]`: Sets the starting point of the partition at the default point. In this case, it is at the 2048 byte offset
- `Last sector, +/-sectors or +/-size{K,M,G,T,P} (2048-7745535, default 7745535): [ENTER]`: Sets the ending point of the partition at the default point. In this case, it is at the very end of the micro SD card
- `Command (m for help): w`: Writes the table to disk and exits

Running `fdisk` again will show the new partition on the card.
```sh
kali@kali:~$ sudo fdisk /dev/sdb -l

Disk /dev/sdb: 3.69 GiB, 3965714432 bytes, 7745536 sectors
Disk model: Storage Device  
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x29a1987d

Device     Boot Start     End Sectors  Size Id Type
/dev/sdb1        2048 7745535 7743488  3.7G 83 Linux
```
The new partition is located at `/dev/sdb1` for this card.

### Formatting
Now that the card is partitioned, it can be FAT32 formatted. To do that, simply run the following
```sh
kali@kali:~$ sudo mkfs.fat /dev/sdb1
```
