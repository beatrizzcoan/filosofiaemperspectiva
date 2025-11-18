#!/bin/bash

# add flathub repo to flatpak as --user
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo --user

# install bruno
flatpak --user install com.usebruno.Bruno -y
