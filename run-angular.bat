docker run --rm -it -d --name rapid-ng -v %CD%/frontend:/home/app/ng -p 4200:4200 -p 49153:49153 digitaldrummerj/angular-cli ng serve --host 0.0.0.0 --port 4200 --poll
