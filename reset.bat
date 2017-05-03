@echo off

git clean -f
git checkout .
git checkout master
cmd.exe /c docker stop rapid-sails-pg 
cmd.exe /c  docker stop rapid-ng
cmd.exe /c  docker stop rapid-postgres

cmd.exe /c run-postgres.bat
cmd.exe /c run-angular.bat

git status
code backend

cmd.exe /c C:\Users\user\AppData\Local\Postman\Update.exe --processStart "Postman.exe"
cmd.exe /c  chrome http://node-machine.org/machinepack-emailaddresses
cmd.exe /c  chrome http://node-machine.org/machinepack-passwords
cmd.exe /c  chrome http://node-machine.org/machinepacks

REM must be last since it start interactive session
cmd.exe /c run-sailspostgres.bat
