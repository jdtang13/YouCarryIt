class WelcomeController < ApplicationController

  def index

  require 'tweetstream'

  TweetStream.configure do |config|  
    config.consumer_key       = 'QxcbFqox8Zc7ehMUbNFShHZzc'
    config.consumer_secret    = 'dOgfPTDm1p8Gn3vKRWiGhjMhawlr9TNeZPpdqNIwx2kHEqoEYQ'
    config.oauth_token        = '2362889286-Rse58rWvw75mbrb9otB92g2eV340TcuWXDHKPpJ'
    config.oauth_token_secret = 'A8WZ4M56VW1D9b58EgbduXm4QOU0FK7yLiOki3WX1xEza'
    config.auth_method        = :oauth
  end  

  @tweets = TweetStream::Client.new
  @texts = []
  @tweets.sample do |status| 
  	@texts << status
  end

  end
end
