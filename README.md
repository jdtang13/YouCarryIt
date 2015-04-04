# YouCarryIt

## How to build and first time setup

#### Install Ruby (Windows)

Download the installer at http://rubyinstaller.org/.

#### Install Ruby (OS X)

It's already installed! You don't need to do anything at all! Wow!

#### Install Ruby on Rails

Open up the command line. You will need it for the rest of these steps. (Please immerse yourself in it.)

In the command line, if you do not have an existing copy of rails, run:

    gem install rails
    
Otherwise, run:

    gem update rails

#### Clone the repository

    cd /Documents/.../wherever-you-want
    git clone https://github.com/jdtang13/YouCarryIt.git
    cd YouCarryIt

#### Run the rails application setup

Install add-ons (note: run this every time someone edits the Gemfile)

    bundle install

Setup the database (note: run this every time someone adds a new migration .rb file)

    rake db:migrate

Run the web server    

    rails server

The application will run at http://localhost:3000. [Click here to access the server.](http://localhost:3000)

#### Appendix: What do I do if I want to clean out the database?

    rake db:reset
    rake db:migrate
