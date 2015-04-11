# YouCarryIt

Hackathon link: TBA

Facebook group: https://www.facebook.com/groups/1087007924773790/1093054324169150/

Google doc: https://docs.google.com/document/d/11fCVZsOVHcyp2VarMWTSK5Lj54vBf29a8RCTZxgLQMc/edit

Facebook: https://developers.facebook.com/apps/1625178294385266/

Twitter: https://apps.twitter.com/app/8178765

## How to build and first time setup

#### Install Ruby 2.1

If you're on Windows, download the Ruby 2.1 installer. IT IS VERY IMPORTANT that you install Ruby 2.1, otherwise it won't work on Windows. Here are quick links to Ruby 2.1 [32-bit](http://dl.bintray.com/oneclick/rubyinstaller/rubyinstaller-2.1.5.exe) and [64-bit](http://dl.bintray.com/oneclick/rubyinstaller/rubyinstaller-2.1.5-x64.exe).

Install the [Ruby on Rails DevKit](http://rubyinstaller.org/add-ons/devkit/) if you're on Windows.

Use this [network workaround](https://gist.github.com/luislavena/f064211759ee0f806c88) to fix DevKit bugs.

If you're on OS X, it's already installed! You don't need to do anything at all! Wow!

#### Install Ruby on Rails

Open up the command line. You will need it for the rest of these steps. **(Please immerse yourself in it.)**

In the command line, if you do not have an existing copy of rails, run:

    gem install rails
    
Otherwise, run:

    gem update rails

#### Retrieving the codebase

Change into the directory into which you want to dump the code

    cd <your directory here>
    
Clone the project
    
    git clone https://github.com/jdtang13/YouCarryIt.git

Get into the project    

    cd YouCarryIt

From now on, you can access the project via

    cd <your directory here>/YouCarryIt

#### Run the rails application setup

Install add-ons (note: run this every time someone edits the Gemfile)

    bundle install

Setup the database (note: run this every time someone adds a new migration .rb file)

    rake db:migrate

Precompile assets like javascript and CSS

    rake assets:precompile

Run the web server    

    rails server

The application will run at http://localhost:3000. [Click here to access the server.](http://localhost:3000)

#### Appendix: What do I do if I want to clean out the database?

    rake db:reset
    rake db:migrate

#### Appendix: What if I don't want to use the command line x))))?

Apply yourself.
