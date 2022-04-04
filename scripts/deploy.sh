# Find a process id (for next.js)
pid=$(lsof -t -i TCP:3000 -a -c node)
# If exist a process, kill a process
if [ $pid ]; then
  kill -9 $pid
fi
# Start
npm run start