
#Bash_aliases fix
echo "Renaming .bash_aliases to bash_aliases2"
mv ~/.bash_aliases bash_aliases2
echo "Downloading bash_aliases from olback.net..."
wget bash_aliases https://olback.net/dev/urandom/bash_aliases
mv bash_aliases ~/.bash_aliases
. ~/.bash_aliases

echo "Open a new terminal for bash_aliases to take effect."
