#Project Title: _HowToGo_
**Group name**: Pleiades

**Group members**: Huang Weiqi Victor and Chua Hou

###Table of contents
1. Overview
2. Links
3. User Stories
4. Features
5. Proposed Level of Achievement

##Overview
Our project aims to revolutionize the direction giving process by
providing an online web app that allows event planners to quickly
create customized maps and directions for guests to easily find
their way.
Our targeted level of achievement is Project Gemini.

####Ideology
When people are navigating, especially in an indoors area, be it an office building, chalet or a shopping mall, all they need is a single route, with landmarks on the way to guide them. The interface forces the user to make succinct maps,such that the maps can be easily understood.

In addition, large maps like Google Maps can only provide directions to a general location. For example, to ABC Road but Google Map does not display the location of any shop around there, and this is where HowToGo comes in. It directs people to <b>specific</b> locations.(Provided that they can get to the general location, like a MRT Station)

##Links
* Our [Application](http://pleiadesorbital.herokuapp.com)
* Milestone 2 video: [Link](https://youtu.be/kokcFMfpR8c)
* Ignition slide: [Link](http://puu.sh/i7TQv/c23bc5939d.png)
* Ignition Video: [Link](https://www.youtube.com/watch?v=QKuLLNVGvow)

##User Stories
Also located in our GitHub Issues: [Pleiades Issues](https://github.com/XtrKiL/Pleiades/issues)

####Implemented User Stories (Features that are done)
######Select Scale of Map
As an event planner, I want to select the scale of the map I'm creating.
> QuikMaps do not have a built in scale so event planners are able to freely create a map of any scale.

######No Additional Downloads
As a user, I want to be able to receive information without downloading anything else.
> Being a web app, users do not need to download any apps to use the application.

######Fast Loading
As a user, I want the page to load fast so I can access them easily when walking around.
> Currently, the web app is implemented with minimal content needing to be loaded, only consisting of Bootstrap, JQuery and minimal images. For the maps, all the QuikMaps (and their elements, namely the lines and the landmarks) are stored mathematically, therefore making downloads minimal.

######Link Shortening
As an event planner, I want to be able to shorten my links easily to distribute them to people.
> The app currently uses Bitly as the link shortening.

######Approximate where I am on the QuikMap
As a map user, I want to be able to locate myself without the use of GPS.
> On the View page of the page,  the "Where Am I?" button approximates where you are on the map! It asks the users to list down the landmarks they can see around them to approximate where they are

######Offline Access
As a user, I want to be able to download the information easily for access offline.
> The view page of the app allows for map download

######Pages that fit to my device screen size
As a user, I want the webpage elements to suit my screen, instead of needing to zoom in and out or scroll excessively to use the page.
> Bootstrap grid system and JQuery tricks are used to scale elements responsively. Some elements are replaced completely with elements that more suited for phones / small screens.

######QuikMaps that display on phones
More often than not, maps nowadays are viewed on phone. I want all the QuikMap features that exist on a browser to exist, and work properly, on a mobile screen.
> QuikMaps scale (using math) such that the elements are of a comfortable size for most screen sizes. IE. Even if it is a mobile screen, the landmarks/words does not get too small, so that you can still read it.

######Quickly share the QuikMaps
As a user/event creator. I want to share the QuikMaps to social media easily, so that my friends can know where my event is at.
> Sharing to twitter, facebook and google plus is possible at the quikmap view page!

######Search existing QuikMaps
As an event creator, I want to check if there are existing maps that are to the same event/location, so that I don't do extra work.
> The QuikMap database can be searched by end location, and/or by tags, under the search page

####User stories for future work

######Give directions that do not include unnecessary information
As an event planner, I want to give directions that don't include additional confusing information that makes my maps hard to read.

######Give directions that show clearly where to go
As an event planner, I want to give directions that show directly the route the user has to take without needing to read a complete map to figure out

######Give directions that users can easily use no matter where they start from
As an event planner, I want to give directions that will allow users to start from wherever they currently are instead of finding their way to a fixed starting point

######Account Creation
As an user/event planner who uses HowToGo frequently, I want to have an account that helps me track all the maps I favourited or made.

######Create QuikMaps on a Mobile phone
As an user, in times of need I want to create QuikMaps without needing a mouse and cursor, and instead use a method more suited for phones.

##Features
Technical features, some of them are weird to phrase as user stories
####Application Goals
* Able to create any QuikMap in under 5 minutes by reducing map complexity
* Able to be viewed easily on mobile for on-the-go viewing

######Milestone One
As of now, there are no major features implemented. Only the skeleton of our website has been set up.

######Milestone Two
The creation application has been implemented with the following features:
* QuikMap Creation
        * Drawing of paths/routes
        * Placement and editing of landmarks
        * Deleting items (hitbox)
        * Editing title
        * Undo and Redo
* Online sharing
        * Saving QuikMap in Heroku Postgres database

######Milestone Three
Alongside improving those in Milestone Two, the following features have been implemented:
* Link-based Sharing
* Responsive Page
* Triangulation for location approximation
* Downloadable QuikMaps
* Searchable database
* Link Shortening, especially for services with word count
* Social-Media Sharing

####Planned Features
A Checkbox with a cross inside refers to a completed feature.
######Core Features
* [x] QuikMap Creation
    > QuikMaps contain a roughly drawn map and direction info that can be easily shared

* [x] Link-based sharing
                > no login, links will direct to specific pages

* [x] Viewable on desktop and mobile (Mobile interface will be made suitable for mobile)
                > Responsive for desktop and mobile. Currently no create page for phone still

* [x] Triangulation to allow users to find where they are relative to the map
                > Where am I button on the view page approximates where the user is

######Secondary features (most likely implemented)
* [x] Downloadable QuikMaps for offline usage
* [x] A searchable database of QuikMaps
  > Users can search to see if another QuikMap to the same destination has been created previously.

* [ ] Google Location API integration, linking the QuikMap to a certain location
    > Eg. If the destination is a shop in ABC Mall, we can link the google map location to ABC mall. So users can use GMaps to go to ABC Mall, and then use QuikMap to navigate to the shop

* [x] Facebook, Twitter and Google integration, for the sharing of the created QuikMaps
* [x] Link shortening using bit.ly or alternatives

######Tertiary features (to be KIVed)
* [ ] Account creation, mainly for those who creates many QuikMaps and wants to keep track of them
* [ ] A way to make QuikMaps on the go, on the phones
    > Pretty hard to draw a map on a phone. Need to think of an alternative method.

##Proposed Level of Achievement
Our team proposes that we should be granted the Project Gemini (Intermediate)
level of achievement. It can be seen from the log that we have worked
consistently throughout the past few months on our Orbital project, and have had
many meetings to work together on the project. We have also met together to
complete the peer evaluations.

For Mission Controls, both of us have physically attended the Mission Controls
and applied what we learnt from Bootstrap, which is the base of all our CSS
and JS formatting, JQuery which we used to all our Javascript app programming,
Google (which we did not apply since it was not a technical Mission Control),
and Web Security, which we will soon apply to sanitize our inputs and prevent
attacks on our web app.

Our app is a web application with creation and retrieval of maps from a
database. We have not implemented deletion yet, but we believe that the local
app programming of map creation and viewing is equivalent in difficulty to that.

We also implemented multiple extensions, which is part of the Gemini requirements.
Our app is also based on Ruby on Rails instead of Google App Engine, allowing us
greater flexibility with the Rails MVC and using Javascript / HTML. We also have
social media integration in sharing our maps, and applied the above Mission
Control technologies in our project. Through our use of Bootstrap, our website
displays well and responsively in different screen sizes as well as mobile
devices.

An additional feature we added which is suggested for Apollo is our use of Git
version control from the very start of the project.

Regarding usability testing, due to time constraints, we have only been able to
conduct limited informal tests with friends who happened to be nearby when we
were working on our project.

Despite this, we believe that what we have done above should be enough to be
granted Project Gemini, and we hope that you think the same and will give us a
minimum of 3 stars (you know you want to give us 4).
