rm -rf public
cd front-end
grunt build
cd ..
git add public
git commit -m "Updating version"
git push origin master
git push heroku master
heroku run rails runner -e production Dalli::Client.new.flush
