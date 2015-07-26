#Project Title: _HowToGo_
**Group name**: Pleiades

**Group members**: Huang Weiqi Victor and Chua Hou

###Table of contents
1. Overview
2. Links
3. User Stories
4. Features

##Overview
Our project aims to revolutionize the direction giving process by
providing an online web app that allows event planners to quickly
create customized maps and directions for guests to easily find
their way.
Our targeted level of achievement is Project Gemini.

####Ideology
When people are navigating, especially in an indoors area, be it an office building, chalet or a shopping mall, all they need is a single route, with landmarks on the way to guide them. The interface forces the user to make succinct maps,such that the maps can be easily understood.

In addition, large maps like Google Maps can only provide directions to a general location. For example, to ABC Road but Google Map does not display the location of any shop around there, and this is where HowToGo comes in. It directs people to <b>specific</b> locations.(Provided that they can get to the general location, like a MRT Station)

####Ignition Links
* Our [Application](http://pleiadesorbital.herokuapp.com)
* Milestone 2 video:[VideoHere](https://youtu.be/kokcFMfpR8c)
* Our ignition slide:[SlideHere](http://puu.sh/i7TQv/c23bc5939d.png)
* Ignition Video:[VideoHere](https://www.youtube.com/watch?v=QKuLLNVGvow)

##User Stories
Also located in our GitHub Issues: [Pleiades Issues](https://github.com/XtrKiL/Pleiades/issues)

####Implemented User Stories(Features that are done)
######Select Scale of Map
As an event planner, I want to select the scale of the map I'm creating.
> QuikMaps do not have a built in scale so event planners are able to freely create a map of any scale.

######No Additional Downloads
As a user, I want to be able to receive information without downloading anything else.
> Being a web app, users do not need to download any apps to use the application.

######Fast Loading
As a user, I want the page to load fast so I can access them easily when walking around.
> Currently, the page is implemented with minimal content needing to be loaded, only consisting of Bootstrap, JQuery and minimal images.

######Link Shortening
As an event planner, I want to be able to shorten my links easily to distribute them to people.
> The app currently uses Bitly as the link shortening.

######Offline Access
As a user, I want to be able to download the information easily for access offline.
> The view page of the app allows for map download

####User stories to be resolved
######Give directions clearly
As an event planner, I want to give directions to visitors in a clear way easily. *Big/General User story, will be broken down into solvable pieces*

######Approximate where I am on the QuikMap
As a map user, I want to be able to locate myself without the use of GPS.

######Good Mobile Interface
As a user, I want to be able to view the information on my phone with a suitable layout. *Big/General User story, will be broken down into solvable pieces*

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

####Planned Features
######Core Features
* [ ] QuikMap Creation
    > QuikMaps contain a roughly drawn map and direction info that can be easily shared

* [x] Link-based sharing - no login, links will direct to specific pages
* [ ] Viewable on desktop and mobile (Mobile interface will be made suitable for mobile)
* [ ] Triangulation to allow users to find where they are relative to the map

######Secondary features (most likely implemented)
* [x] Downloadable QuikMaps for offline usage
* [x] A searchable database of QuikMaps
  > Users can search to see if another QuikMap to the same destination has been created previously.

* [ ] Google Location API integration, linking the QuikMap to a certain location
    > Eg. If the destination is a shop in ABC Mall, we can link the google map location to ABC mall. So users can use GMaps to go to ABC Mall, and then use QuikMap to navigate to the shop

* [ ] Facebook, Twitter and Google integration, for the sharing of the created QuikMaps
* [x] Link shortening using bit.ly or alternatives

######Tertiary features (to be KIVed)
* [ ] Account creation, mainly for those who creates many QuikMaps and wants to keep track of them
* [ ] A way to make QuikMaps on the go, on the phones
    > Pretty hard to draw a map on a phone. Need to think of an alternative method.
