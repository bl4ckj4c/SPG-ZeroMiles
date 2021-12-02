TEMPLATE FOR RETROSPECTIVE (Team P01)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs done: 5 vs 5
- Total points committed vs done: 39 vs 39
- Nr of hours planned vs spent (as a team): 111h 15m vs 113h 15m

**Remember**  a story is done ONLY if it fits the Definition of Done:

- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

### Detailed statistics

| Story | # Tasks | Points | Hours est. | Hours actual |
| ----- | ------- | ------ | ---------- | ------------ |
| _#0_  | 18      | -      | 87h        | 105h         |
| 4     | 12      | 8      | 21h 30m    | 21h 30m      |
| 5     | 2       | 5      | 6h         | 5h 15m       |
| 6     | 1       | 13     | 5h         | 4h           |
| 7     | 1       | 8      | 2h         | 2h           |
| 8     | 2       | 5      | 1h 45m     | 3h 10m       |

- Hours per task (average, standard deviation):
  - Average: 2h 24m
  - Standard deviation: 1h 33m
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent from previous table
  - 113h 15m / 113h 15m = 1 -> 100%
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated: 17h
  - Total hours spent: 4h 30m
  - Nr of automated unit test cases: 9
  - Coverage (if available): 6.8%
  
- E2E testing:
  - Total hours estimated: 4h
  - Total hours spent: 30m
  
- Code review 
  - Total hours estimated: 4h
  - Total hours spent: 2h 30m
  
- Technical Debt management:
  - Total hours estimated: 10h
  
  - Total hours spent: 6h 30m
  
  - Hours estimated for remediation by SonarQube: 10h
  
  - Hours estimated for remediation by SonarQube only for the selected and planned issues: 5h
  
  - Hours spent on remediation: 4h 30m
  
  - Debt ratio (as reported by SonarQube under "Measures-Maintainability"): 1.1%
  
  - Rating for each quality characteristic reported in SonarQube under "Measures"
  
    | Measures        | Rating |
    | --------------- | ------ |
    | Reliability     | C      |
    | Security        | A      |
    | Security Review | E      |
    | Maintainability | A      |
  


## ASSESSMENT

- What caused your errors in estimation (if any)?

> There was a misunderstanding between come members of the group, so we spend hours to fix problem stemmed from that.
>
> Another problem is about the login, because in the front-end part related of this we underestimated the work and so we had to use a lot of hours to fix issues.
>
> The task _SPG-99_ was underestimated because even a small change when the code is so big means to propagate every modifications to all the components and to a lot of other lines of code.
>
> The unit test for front-end were estimated but then we realized that we are modifying too much the UI, so is basically impossible to follow that with automated tests
>
> The learning test task was also underestimated, because we started the sprint thinking about continue using Python for tests, but then we decided to swithc to Jest and Chai so we needed more hours for that.

- What lessons did you learn (both positive and negative) in this sprint?

> We have to define a deadline for each task because in this sprint we ended up fixing some important issues just before the demo.
>
> We should not work all of use on the last days because Firebase has a limit of 50K queries per day, so if every member of the team is working last days we finished our possibility to query the database.

- Which improvement goals set in the previous retrospective were you able to achieve? 

> *Manage better the technical debt, because in this sprint we didn't  allocate any hours to manage it, but we ended up in working to pay the  debt over some involuntarily TD introduced. We plan to add hours for the next sprint, in order to estimate some time for this task*
>
> In this sprint we better managed the technical debt, because we allocated hours in the sprint planning and we spent hours for fixing issues from previous sprint.

- Which ones you were not able to achieve? Why?

> *We should increase the amount of automated tests, especially for the front-end.*
>
> We did not increment the number of automated test cases because we change the framework used for testing and so we had to implement them from scratch.

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

> Focus more on the tasks deadlines and avoid working lots of hours just the few days before the demo.
>
> Read more carefully the requirements of each story, in order to avoid misunderstanding that led us to waste of time.

- One thing you are proud of as a Team!!

> When we are desperate we go all-in in order to deliver a fully functional product.
