git push heroku master
heroku run rails runner -e production Dalli::Client.new.flush
