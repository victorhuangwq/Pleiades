# script to quickly push to heroku
rake assets:clean
rake assets:precompile
git add -A
git commit -m "Processing for heroku..."
git push heroku
heroku restart
rake assets:clean
