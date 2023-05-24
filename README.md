# Rosebury Guilded Bot

**Take note before using this bot for any purpose that so far is has little to no safety features.
Do not add this bot until a proper release.**

This bot will in the future allow you to record roleplaying experience while doing play by post roleplaying.

This bot is mostly a project for me to practice and familiarize myself with javascript, programming, git and github.

## Current commands

- rpchannel
  - Command that add/edit/remove channels that count experience

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

### Rpchannel

```!rpchannel {view/add/update/remove} {args}```

#### view

Displays the server's rp channels like this:
RP_CHANNEL_NAME: RP_CHANNEL_ID

#### add RP_CHANNEL_NAME

Adds the channel id that you are currently in as well as the name specified into the database

#### update RP_CHANNEL_NAME

Updates the channel name in the database in the channel you are currently in

#### remove

Removes the column in database contains the channel you are currently in
