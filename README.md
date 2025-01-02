# population-statistics
School project: Web page displaying municipal population statistics.<br/>
Developed with **Node, Express, Prisma, EJS** techniques and **SQLite-database**. Styled with **Material Design Lite**-library.<br/>
Purely a server side application thanks to EJS. 

## Functionality:
* All municipalities in the data are printed in a table, each municipality on its own line
* The table's column headers are: name of the municipality, total population, female population and male population.
* Population numbers are formattedin accordance with Finnish practice - space as the thousands separator
* Displayed municipalities can be filtered by a search word:
  * Filtering is based on the beginning of the municipality name (filtering is done on the server end)
* At the bottom of the page, statistical information is summarized based on the information displayed in the table:
  * The number of municipalities shown on the table
  * The average population of the municipalities
  * Percentage of women in the entire population
* The table data can be sorted based on each of the table columns in descending or ascending order.
  * Sorting is done by clicking the column header
* An arrow icon is shown on the table column headers indicating the sorting order
