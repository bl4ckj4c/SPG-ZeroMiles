TEMPLATE FOR RETROSPECTIVE (Team P01)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs done: 4 vs 4
- Total points committed vs done: 34 vs 34
- Nr of hours planned vs spent (as a team): 111h vs 114h 55m

**Remember**  a story is done ONLY if it fits the Definition of Done:

- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
| ------ | ------- | ------ | ---------- | ------------ |
| _#0_   | 31      | -      | 63h        | 59h 40m      |
| SPG-9  | 13      | 8      | 26h 30m    | 33h 45m      |
| SPG-10 | 5       | 13     | 11h 30m    | 9h 45m       |
| SPG-11 | 2       | 5      | 5h         | 3h           |
| SPG-12 | 2       | 8      | 7h         | 8h 45m       |

- Hours per task: 

  - average: 2h 10m
  - standard deviation: 1h 47m

- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent from previous table

  - 111h / 114h 55m = 0.966 -> 96.6%

  
## QUALITY MEASURES 

- Unit Testing
  - Total hours estimated: 5h
  - Total hours spent: 5h
  - Nr of automated unit test cases: 28
  - Coverage (if available): 42.8%
  
- E2E testing
  - Total hours estimated: 0h
  - Total hours spent: 0h
  
- Code review
  - Total hours estimated: 4h
  - Total hours spent: 4h
  
- Technical Debt management
  - Total hours estimated: 33h
  
  - Total hours spent: 31h
  
  - Hours estimated for remediation by SonarQube: 4d 7h
  
  - Hours estimated for remediation by SonarQube only for the selected and planned issues: 4h
  
  - Hours spent on remediation: 2h
  
  - Debt ratio (as reported by SonarQube under "Measures-Maintainability"): 1.2%
  
  - Rating for each quality characteristic reported in SonarQube under "Measures"
  
    | Measure         | Rating |
    | --------------- | ------ |
    | Reliability     | A      |
    | Security        | A      |
    | Security Review | A      |
    | Maintainability | A      |
  


## ASSESSMENT

- What caused your errors in estimation (if any)?
> The most difficult tasks were the ones related to the time management in backend, for which we underestimated the hour needed to implement new functionalities and to modify the old ones.
>
> Another problem was related to the fixing of some pages in the frontend, because they were making too much requests towards the backend, so their behavior was not optimal. This fixes required some more time that expected.

- What lessons did you learn (both positive and negative) in this sprint?
> When engineering a component is important to design it in the best way possibile in order to avoid code smells and duplications, so it will keep a high mainteinanbility.
>
> The communication between frontend and backend is necessary to maintain a high quality software and to reduce as much as possible the misunderstanding, which means reduce the waste of time in imlementation.
>
> If there is a doubt in the story, it's better to ask the product owner in order to converge a solution for the right implementation instead of doing all the stuff  and then realize that the work done is wrong or, even worst, useless.

- Which improvement goals set in the previous retrospective were you able to achieve? 
> *Focus more on the tasks deadlines and avoid working lots of hours just the few days before the demo.*
>
> In this sprint we managed to do that, so the deadline assigned to tasks were respected and we finished most of the work few days in advance with respect to the demo.
>
> *Read more carefully the requirements of each story, in order to avoid misunderstanding that led us to waste of time.*
>
> In this sprint we focused more on requirements and related tasks, so we divide very well the work to be done avoiding big tasks that last sprint led us to a waste of time.
>
> Another goals that we achieved is related to SonarCloud, where we have improved a lot the quality scores. This goals was not set in the previous retrospective document, but it was discuss by voice with the professor.

- Which ones you were not able to achieve? Why?
> No one, we achieved all retrospective goals.

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

> The main goal is to achieve the 80% of test, both frontend and backend in order to get all measure with A score in SonarCloud.
>
> Second goal is to improve some documentation in order to better understand what our project is doing and which APIs are exposed and so on and so forth.
>
> Third goal is to create a multistage Docker in order to strip down the image size.

- One thing you are proud of as a Team!!
> We thought that the time machine was a very difficult task, but in the end we achieved it in the best possible way: the discovery of time made us feeling like Einstein. This means that we underestimated our capabilities, but we are able to achieve great result, also in difficult situations.
