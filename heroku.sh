# script to quickly push to heroku
echo "Cleaning and precompiling rake assets..."
rake assets:clean
rake assets:precompile
echo "Commiting to git..."
git add -A
git commit -m "Processing for heroku..."
echo "Pushing to heroku..."
git push heroku
echo "Restarting heroku dynos..."
heroku restart
echo "Cleaning assets..."
rake assets:clean
echo "Pushing to origin..."
git push origin
