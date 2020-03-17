
# Bullet Journal

## Requirements
___________

1. User Login, Password (DB Storage {secured})
2. A few templates for commonly used items 
   (habit tracker, monthly spread, daily spread, calendar(API))
3. Index
4. Video describing how Bullet Journaling works (https://www.youtube.com/watch?v=fm15cmYU0IM)



## Additional Feature Requirements
______________

1. Image storage and usage (upload?)
2. Bullet-esque stylings
3. Ability to handwrite
4. Share website (referral)


## APIs
______

1. Text Recognition
2. FullCalendar (calendar)
3. Authentication (Passport JS)
4. Moment.js

## Team Responsibilities
____

 - Dane: Routing/SQL
 - Dennis: UI/UX Designer -> Handlebars/Templating
 - Brittany: Front End Development
 - Kenneth: User Authentication/Security 



## User Story
___

AS a person who has no executive functioning<br>
AS a person who has the artistic ability of a peanut<br>
I want to suceed at life USING a bullet journal<br>
AND make it look nice<br>
WHEN it is easily accessible<br>

## Flow
___

### I am prompted to login (user table containing usernames and passwords) 
1. CREATE method for new user 
   - CHECK IF USER EXISTS statement AND has password
2. When I login, I am brought to an overview/big picture
   which contains an index and ~~user-configurable dashboard~~ Monthly/Daily Spread (contains tasks)
    - USER has one INDEX 
    - USER HAS MANY POSTS, MONTHLY SPREADS, DAILY SPREADS, TASKS
    - CHECK to see if user has a current daily spread (prompt for one if not)
3. I can click on pages in the index and go to a place
   - Each POST/INDEX OBJECT has a rendered page/api route?
4. I can update the status of tasks (add, whiteout/strikethrough, update)
5. I can "quick create" something and assign it an index position
6. Move tasks


## UI Mockup
https://xd.adobe.com/view/8707e389-02ff-474e-77cb-9ee294cdc72c-f136/
