class WelcomeController < ApplicationController

  require 'twitter'

  MAX_TWEETS = 25

  $first = ""
  $second = ""
  $third = ""

  def makeClient
		client = Twitter::Streaming::Client.new do |config|
	    config.consumer_key       = 'QxcbFqox8Zc7ehMUbNFShHZzc'
	    config.consumer_secret    = 'dOgfPTDm1p8Gn3vKRWiGhjMhawlr9TNeZPpdqNIwx2kHEqoEYQ'
	    config.access_token        = '2362889286-Rse58rWvw75mbrb9otB92g2eV340TcuWXDHKPpJ'
	    config.access_token_secret  = 'A8WZ4M56VW1D9b58EgbduXm4QOU0FK7yLiOki3WX1xEza'
	    #config.auth_method        = :oauth
	  end  
	  return client
  end

  def sendVals
  	$first = params[:first]
  	$second = params[:second]
  	$third = params[:third]

  	updateSocial # run the first calc as soon as the 3 params are done
  end

  def updateSocial

	  client = makeClient

	  @tweet_limit = MAX_TWEETS
	  count = 0

	  indico_enabled = 1

	  if (indico_enabled)
	  	require 'indico'
	  	Indico.api_key = 'a20e64f1e4fd1dd002ec661f62caa444'
	   end

	  @statuses = []
	  @sentiments = []

	  topics = [$first, $second, $third]

	  puts "topics are: " + topics.join(",")

	  client.sample do |status| 
	 	#client.filter(track: topics.join(",")) do |status| 
	 		if status.is_a?(Twitter::Tweet) and count < @tweet_limit

	 			if status.text.to_s == ""
	 				continue
	 			end

	 			text = (status.text).to_s
	  			@statuses.push(text)

	  			if (indico_enabled)
	  				@sentiments.push(Indico.sentiment(text))
	  			else
	  				@sentiments.push(rand)
	  			end

	  			count += 1
	  			
	  			puts count
	  			puts status.text.to_s
	  		else
	  			break
	  		end
	  	end

	  	@tweet_limit = count

	  respond_to do |format|
	    format.js
	  end

  end

  def index

	  # client = makeClient

	  # @tweet_limit = MAX_TWEETS
	  # count = 0

	  # require 'indico'
	  # Indico.api_key = 'a20e64f1e4fd1dd002ec661f62caa444'

	  # @statuses = []
	  # @sentiments = []

	 	# client.sample do |status| 
	 	# 	if status.is_a?(Twitter::Tweet) and count < @tweet_limit

	 	# 		if status.text.to_s == ""
	 	# 			continue
	 	# 		end

	 	# 		text = (status.text).to_s
	  # 			@statuses.push(text)
	  # 			@sentiments.push(Indico.sentiment(text))
	  # 			count += 1
	  # 			#puts count
	  # 			#puts status.text.to_s
	  # 		else
	  # 			break
	  # 		end
	  # 	end

	  # 	@tweet_limit = count

	  # 	#puts "loop finished"

  end


end
