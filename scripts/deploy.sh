# Find a process id (for next.js)
pid=$(lsof -t -i TCP:3000 -a -c node)
# If exist a process, kill a process
if [ $pid ]; then
  kill -9 $pid
  echo "Kill a previous process ($pid)"
fi
# Start
JENKINS_NODE_COOKIE=dontKillMe && nohup npm run start &
echo "Start a process for front server"