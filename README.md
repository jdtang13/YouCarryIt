# YouCarryIt

Hackathon link: TBA

Facebook group: https://www.facebook.com/groups/1087007924773790/1093054324169150/

Google doc: https://docs.google.com/document/d/11fCVZsOVHcyp2VarMWTSK5Lj54vBf29a8RCTZxgLQMc/edit

## How to build and first time setup

#### Install Ruby 2.1

If you're on Windows, download the installer at http://rubyinstaller.org/. IT IS VERY IMPORTANT that you install 2.1 ruby, otherwise it won't work on Windows.

Install the Ruby on Rails DevKit if you're on Windows.

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

Run the web server    

    rails server

The application will run at http://localhost:3000. [Click here to access the server.](http://localhost:3000)

#### Appendix: What do I do if I want to clean out the database?

    rake db:reset
    rake db:migrate

#### Appendix: What if I don't want to use the command line x))))?

Apply yourself.
