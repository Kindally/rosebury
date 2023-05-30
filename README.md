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
- profile
  - Command that allows you to view/add/update/remove users' character profiles
- settings
  - Command that allows you to edit prefix and how easy it should be to gain experience

## Other features

- Experience handler
  - Passively counts experience in channels set to be roleplaying channels

## Planned features

- Admin
  - Command that allows you to change a user's experience points
  - Command that add/edit bot channel that pings when user levels up

- Anyone
  - Command that gives tips and command suggestions
  - Command that lets you view your current experience
  - Command to add/edit/remove a character profile

## Commands

<details>
<summary>Admin</summary>

```!admin {view/add/remove} {args}```

### !admin view

**Admin command!** Displays admin roles of the server like this: SERVER_ID: ROLE_ID

### !admin add ROLE_ID

**Admin command!** Adds the role id that is specified as an admin role

### !admin remove ROLE_ID

**Admin command!** Removes the role id that is specified as an admin role

</details>

<details>
<summary>Rpchannel</summary>

```!rpchannel {view/add/update/remove} {args}```

#### !rpchannel view

**Admin command!** Displays the server's rp channels like this: RP_CHANNEL_NAME: RP_CHANNEL_ID

#### !rpchannel add RP_CHANNEL_NAME

**Admin command!** Adds the channel id that you are currently in as well as the name specified into the database

#### !rpchannel update RP_CHANNEL_NAME

**Admin command!** Updates the channel name in the database in the channel you are currently in

#### !rpchannel remove

**Admin command!** Removes the column in database contains the channel you are currently in
</details>

<details>
<summary>Profile</summary>

```!profile {view/add/update/remove} {args}```

#### !profile view

Displays the user's character profiles like this: PROFILE_NAME, ...

#### !profile add PROFILE_NAME

Adds specified profile name to the database under the user's id

#### !profile update OLD_PROFILE_NAME NEW_PROFILE_NAME

Updates an old profile name into the new one. Both of which are specified by the user

#### !profile remove PROFILE_NAME

Removes a profile with the specified name

</details>

<details>
<summary>Settings</summary>

```!settings {prefix/xprate} {args}```

### !settings prefix NEW_PREFIX

Changes the current prefix to the specified one (at most 3 characters)
Default: !

### !settings xprate NEW_EXPERIENCE_RATE

Changes the current experience rate (must be a number!)
Default: 100

</details>
