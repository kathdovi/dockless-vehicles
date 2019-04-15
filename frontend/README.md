# Frontend Challenge

### Challenge

Your task is to create a webpage that displays information about the Dockless Scooters in Austin. This data comes from our Open Data Portal. For documentation, visit: https://data.austintexas.gov/Transportation-and-Mobility/Dockless-Vehicle-Trips/7d8e-dm7r

Here's an example user story that may help guide what you develop:

> As a division manager for parking enforcement, I would like to be able to see statistics on dockless usage for a given date range (ex: SXSW Festival, March 8-17, 2019). 
>
> I would like to see counts of these stats:
> - Total # of Trips
> - Total # of Miles
> - Total # of Unique Units Identified
> 
> In my role, I would like this feature so that I can share ad-hoc reporting metrics with department executives and Council staff.
>
> _Bonus points if I can filter by mode (bike, scooter, all)._

## My Solution

![](https://github.com/kathdovi/dockless-vehicles/blob/master/frontend/react/pic1.png)
![](https://github.com/kathdovi/dockless-vehicles/blob/master/frontend/react/pic2.png)
For this project, I processed data about the dockless vehicles in Austin during SXSW. I then displayed a few forms of visualization for these data. I wanted the user to be able to see the differences in individual days during SXSW, so I presented a line graph for the number of trips, number of unique vehicles, and the number of miles per day. Totals for these statistics are also presented at the top of the website.

### Technologies Used
- React
- Chart.js
- Chartkick
- Bootstrap/React Bootstrap

### What I Learned

I learned about using SoQL queries in query strings when calling the API to get only the relevant data necessary as well as enough data. The original API endpoint returned only 1,000 results per call, so I also had to make the limit much larger to get all of the data between the start and end date of SXSW. I also learned how to work with Chartkick more, improved my understanding of state in react, and learned how to work better with some Javascript built-ins such as sets.

### Improvements I'd Like To Add
- Modularize the code further: Break the code down into components 
- Allow user input for the start and end date
- Clean up the UI further (there is a bug that does not resize the columns after you resize your window smaller).
