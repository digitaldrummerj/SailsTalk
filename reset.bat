@echo off

REM git clean -f
REM git checkout .
REM git checkout master
cmd.exe /c docker stop rapid-sails-pg 
cmd.exe /c  docker stop rapid-ng
cmd.exe /c  docker stop rapid-postgres

cmd.exe /c run-postgres.bat
cmd.exe /c run-angular.bat


taskkill /IM code.exe
start code backend

start C:\Users\user\AppData\Local\Postman\Update.exe --processStart "Postman.exe"


taskkill /IM chrome.exe

start "c:\Progra~2\Google\Chrome\Application\chrome.exe" "http://node-machine.org/machinepack-emailaddresses" "http://node-machine.org/machinepack-passwords" "http://node-machine.org/machinepacks"

REM must be last since it start interactive session
cmd.exe /c run-sailspostgres.bat
