# Find a process id (for next.js)
pid=$(lsof -t -i:3000)
# If exist a process, kill a process
if [ -n $pid ]; then
  kill -9 $pid
fi
# Start a process (for next.js)
npm run start &