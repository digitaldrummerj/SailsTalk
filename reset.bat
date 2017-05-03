@echo off

git clean -f
git checkout .
git checkout master

cmd /c rimraf backend\.tmp

REM STOP DOCKER CONTAINERS
cmd.exe /c docker stop rapid-sails-pg 
cmd.exe /c  docker stop rapid-ng
cmd.exe /c  docker stop rapid-postgres

REM START DB AND UI
cmd.exe /c run-postgres.bat
cmd.exe /c run-angular.bat

REM OPEN SAILS CODE
cmd /c code backend

REM OPEN POSTMAN
REM start C:\Users\user\AppData\Local\Postman\Update.exe --processStart "Postman.exe"
"C:\Users\user\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Postman\Postman.lnk" 

REM START PGADMIN.   THIS TAKES A LONG TIME
start "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\pgAdmin 4\pgAdmin 4"

REM OPEN CHROME TO NODE MACHINEPACKS
start "c:\Progra~2\Google\Chrome\Application\chrome.exe" "http://node-machine.org/machinepack-emailaddresses" 
start "c:\Progra~2\Google\Chrome\Application\chrome.exe" "http://node-machine.org/machinepack-passwords" 
start "c:\Progra~2\Google\Chrome\Application\chrome.exe" "http://node-machine.org/"

REM OPEN PPT
start "C:\Program Files (x86)\Microsoft Office\root\Office16\POWERPNT.EXE" "..\presentations\Rapid Api Dev With Sails.pptx"

REM START SAILS CONTAINER
REM must be last since it start interactive session
cmd.exe /c run-sailspostgres.bat
