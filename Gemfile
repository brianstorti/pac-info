source 'https://rubygems.org'

ruby '2.0.0'

# mongoid still doesn't play well with rails 4
gem 'rails', '3.2.15'

gem 'rails-api'
gem 'mongoid'

gem 'rack-cache'
gem 'dalli'
gem 'kgio'
gem 'compass'

# MemCachier sets environment variables prefixed with MEMCACHIER rather than MEMCACHE.
# The memcachier gem, however, fixes this for you.
gem 'memcachier'

group :development do
  gem 'pry'
  gem 'pry-nav'
  gem 'rspec-rails'
end

group :production do
  gem 'unicorn'
end
