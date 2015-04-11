class WelcomeController < ApplicationController

  def index

	  require 'twitter'

	  client = Twitter::Streaming::Client.new do |config|
	    config.consumer_key       = 'QxcbFqox8Zc7ehMUbNFShHZzc'
	    config.consumer_secret    = 'dOgfPTDm1p8Gn3vKRWiGhjMhawlr9TNeZPpdqNIwx2kHEqoEYQ'
	    config.access_token        = '2362889286-Rse58rWvw75mbrb9otB92g2eV340TcuWXDHKPpJ'
	    config.access_token_secret  = 'A8WZ4M56VW1D9b58EgbduXm4QOU0FK7yLiOki3WX1xEza'
	    #config.auth_method        = :oauth
	  end  

	  tweet_limit = 15
	  count = 0

	  @statuses = []
	 	client.sample do |status| 
	 		if status.is_a?(Twitter::Tweet) and count < tweet_limit
	  			@statuses.push((status.text).to_s)
	  			count += 1
	  			#puts count
	  			#puts status.text.to_s
	  		else
	  			break
	  		end
	  	end

	  	#puts "loop finished"

  end


end
