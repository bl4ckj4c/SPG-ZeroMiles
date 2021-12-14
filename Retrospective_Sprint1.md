TEMPLATE FOR RETROSPECTIVE (Team P01)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs done: 3 committed vs 3 done
- Total points committed vs done:  29 committed vs 29 done
- Nr of hours planned vs spent (as a team): 112 planned vs 104.5

**Remember**  a story is done ONLY if it fits the Definition of Done:

- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

### Detailed statistics

| Story | # Tasks | Points | Hours est. | Hours actual |
| ----- | ------- | ------ | ---------- | ------------ |
| _#0_  | 17      | -      | 46         | 45.5         |
| 1     | 8       | 13     | 21         | 18.5         |
| 2     | 9       | 8      | 23         | 13           |
| 3     | 8       | 8      | 22         | 27.5         |

- Hours per task:

  - average: 3h 7m
  - standard deviation: 3h 7m

- Total task estimation error ratio (sum of total hours estimation / sum of total hours spent from previous table):
  - 104.5/112 = 0.933 -> 93.3%

  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated: **21h**
  - Total hours spent: **4h**
  - Nr of automated unit test cases: **5** (only for back-end)
  - Coverage (if available): **11.2%**. Actually the back-end test were done using python in order to test the RESTful APIs exposed by the server (which is written in node.js), so the coverage is computed on the test file in Python instead of the server.js file: the actual coverage of the serve is much higher than the value reported in SonarCloud.
  
- E2E testing:
  - Total hours estimated: **4h**
  - Total hours spent: **0h**
  
- Code review 
  - Total hours estimated: **4h**
  - Total hours spent: **4h 30m**
  
- Technical Debt management:
  - Total hours estimated: **0h**
  
  - Total hours spent: **4h**
  
  - Hours estimated for remediation by SonarQube: **8h 20m**
  
  - Hours estimated for remediation by SonarQube only for the selected and planned issues: **4h**
  
  - Hours spent on remediation: **0h**
  
  - debt ratio (as reported by SonarQube under "Measures-Maintainability"): **0.9%**
  
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability ): 
  
    | Measure         | Rating |
    | --------------- | ------ |
    | Reliability     | C      |
    | Security        | A      |
    | Security Review | E      |
    | Maintainability | A      |
  
    
  


## ASSESSMENT

- What caused your errors in estimation (if any)?

  >We thought that learning Firebase would have been a simple task, but in reality it required more hours. Another issue was on the interface of the browse products interface in which estimated 4 hours but we needed a lot more (1 day and 1 hour) because we start creating the interface thinking about a desktop device, but the we realized that this interface was not scaling well on small screens, so we needed to rebuilt this part of the application.

- What lessons did you learn (both positive and negative) in this sprint?
  
  >Before starting implementing an interface we should decide better what we want to implement and create first a prototype to avoid the problem that we faced during this sprint. Starting with just he desktop interface in mind lead us to a complete rewrite of the browse products interface to adapt it also to mobile devices.
  >
  >Tests for the back-end were written by just one person and this resulted in a too specialized role, so if this person will not be able to work on tests the whole team will be without a tester. For the next sprint we have to divide better this tasks about testing.
  >
  >For the front-end test we have checked the correct behavior only by hand, because we estimated time for the automated testing, but at the end we need that time to finish other tasks that we under estimated.
  >
  >All the team member should update the documentation when they modify something, otherwise other members cannot use that useful file to work.
  >
  >The communication between front-end and back-end was really good, so this is a positive thing that we want to keep for the next sprints. We improved this aspect compared to the old project (Office Queue Management).
  
- Which improvement goals set in the previous retrospective were you able to achieve? 

  >We set no goals because this is the first sprint and this document is the first retrospective.

- Which ones you were not able to achieve? Why?

  >No one, this is the fist retrospective.

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

> Manage better the technical debt, because in this sprint we didn't allocate any hours to manage it, but we ended up in working to pay the debt over some involuntarily TD introduced. We plan to add hours for the next sprint, in order to estimate some time for this task.
>
> We should increase the amount of automated tests, especially for the front-end.

- One thing you are proud of as a Team!!

  > Despite all the problems we faced during the sprint, we managed to adapt to that and solve issues in order to get the job done.
