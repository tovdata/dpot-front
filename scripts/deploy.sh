# Find a process id (for previous next.js)
$pid=$(lsof -t -i:3000)
# Check an existance (kill a previous next.js)
if [ -n $pid ]; then
  kill -9 $pid
fi
# Start a new process (for next.js)
npm run start