git clean -f
git checkout .
git checkout master
docker stop rapid-sails-pg 
docker stop rapid-ng
docker stop rapid-postgres
run-postgres.bat
run-angular.bat
git status
code backend
call C:\Users\user\AppData\Local\Postman\Update.exe --processStart "Postman.exe"
call chrome http://node-machine.org/machinepack-emailaddresses
call chrome http://node-machine.org/machinepack-passwords
call chrome http://node-machine.org/machinepacks

REM must be last since it start interactive session
run-sailspostgres.bat
