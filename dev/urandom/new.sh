#!/bin/sh
#########################################
#Downloaded from olback.net             #
# PACKAGES = Packages to install        #
#########################################
echo "Enter your username and press [ENTER]"
read UN

echo -n "Is "$UN" the correct username (y/n)? "
read answer
if echo "$answer" | grep -iq "^y" ;then

#Bash_aliases fix
echo Renaming .bash_aliases to bash_aliases2
mv ~/.bash_aliases bash_aliases2
echo Downloading bash_aliases from olback.net...
wget bash_aliases https://olback.net/dev/urandom/bash_aliases
mv bash_aliases ~/.bash_aliases
. ~/.bash_aliases

ln -s /home/$UN/.bash_aliases /root/.bash_aliases

echo "Created a symlink /root/.bash_aliases pointing to /home/$UN/.bash_aliases"

. ~/.bash_aliases
echo "Ran .bash_aliases"

else
 echo "Run script again"
fi
