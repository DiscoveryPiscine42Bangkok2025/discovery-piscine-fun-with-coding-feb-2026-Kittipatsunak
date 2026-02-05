if [ $# -eq 0 ]; then
  printf 'No arguments supplied\n'
  exit 0
fi

for arg in "$@"; do
  printf '%s\n' "$arg"
done
