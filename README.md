# Rosebury Guilded Bot

**Take note before using this bot for any purpose that so far is has little to no safety features.
Do not add this bot until a proper release.**

This bot will in the future allow you to record roleplaying experience while doing play by post roleplaying.

This bot is mostly a project for me to practice and familiarize myself with javascript, programming, git and github.

## Current commands

- rpchannel
  - Command that view/add/edit/remove channels that count experience
- admin
  - Command that allows you to view/add/remove admin roles

## Planned features

- Admin
  - Command that allows you to change a user's experience points
  - Command that add/edit bot channel that pings when user levels up

- Anyone
  - Command that gives tips and command suggestions
  - Passively counts experience in admin chosen channels
  - Command that lets you view your current experience
  - Command to add/edit/remove a character profile

## Commands

### Admin

```!admin {view/add/remove} {args}```

#### admin view

**Admin command!** Displays admin roles of the server like this: SERVER_ID: ROLE_ID

#### admin add ROLE_ID

**Admin command!** Adds the role id that is specified as an admin role

#### admin remove ROLE_ID

**Admin command!** Removes the role id that is specified as an admin role

### Rpchannel

```!rpchannel {view/add/update/remove} {args}```

#### rpchannel view

**Admin command!** Displays the server's rp channels like this: RP_CHANNEL_NAME: RP_CHANNEL_ID

#### rpchannel add RP_CHANNEL_NAME

**Admin command!** Adds the channel id that you are currently in as well as the name specified into the database

#### rpchannel update RP_CHANNEL_NAME

**Admin command!** Updates the channel name in the database in the channel you are currently in

#### rpchannel remove

**Admin command!** Removes the column in database contains the channel you are currently in
